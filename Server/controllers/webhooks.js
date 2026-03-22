// Server / controllers / webhooks.js
import User from "../models/User.js";
import { Webhook } from "svix";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.status(201).json({
          success: true,
          message: "User created successfully!",
        });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).json({
          success: true,
          message: "User updated successfully!",
        });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.status(200).json({
          success: true,
          message: "User deleted successfully!",
        });
        break;
      }

      default:
        return res.status(400).json({
          success: false,
          message: `Unhandled webhook event type: ${type}`,
        });
    }
  } catch (error) {
    console.error("Clerk Webhook Error:", error.message);

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while processing the Clerk webhook.",
      error: `Clerk Webhook Error: ${error?.stack || error?.message || error}`,
    });
  }
};
