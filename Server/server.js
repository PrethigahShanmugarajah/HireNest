// Server / server.js
import "./config/instrument.js";
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import companyRouter from "./routes/companyRouter.js";
import jobRouter from "./routes/jobRouter.js";

/* -------- INITIALIZE EXPRESS -------- */
const app = express();

/* -------- CONNECT TO DATABASE -------- */
await connectDB();
await connectCloudinary();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working!"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRouter);
app.use("/api/jobs", jobRouter);

/* -------- PORT -------- */
const port = process.env.PORT || 4000;

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
