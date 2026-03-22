// Client / src / components / recruiter / RecruiterLogin.jsx
import { useEffect, useState } from "react";
import Button from "../Button";
import { useAppContext } from "../../context/AppContext";
import { Lock, Mail, Upload, User, X } from "lucide-react";
import { InputField } from "../FormField/InputField";
import { FileInputField } from "../FormField/FileInputField";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const { setShowRecruiterLogin } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state == "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-black"
      >
        <h1 className="text-center text-2xl text-black font-medium">
          Recruiter {state}
        </h1>

        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer border border-gray-300">
                  {image ? (
                    <img
                      className="w-16 h-16 rounded-full"
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-500" />
                  )}
                </div>

                <FileInputField
                  name="image"
                  accept="image/*"
                  size="s"
                  trigger={false}
                  className="hidden"
                  value={image}
                  onChange={(files) => setImage(files?.[0] || null)}
                />
              </label>

              <p>
                Upload Company <br />
                Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="mt-5">
                <InputField
                  label="Company Name"
                  labelPosition="top"
                  name="companyName"
                  type="text"
                  placeholder="Company Name"
                  size="s"
                  value={name}
                  onChange={setName}
                  required
                  iconLeft={<User className="w-4 h-4" />}
                  inputClassName="placeholder-gray-300"
                  labelClassName="text-sm"
                />
              </div>
            )}

            <div className="mt-3">
              <InputField
                label="Email"
                labelPosition="top"
                name="email"
                type="email"
                placeholder="Email"
                size="s"
                value={email}
                onChange={setEmail}
                required
                iconLeft={<Mail className="w-4 h-4" />}
                inputClassName="placeholder-gray-300"
                labelClassName="text-sm"
              />
            </div>

            <div className="mt-5">
              <InputField
                label="Password"
                labelPosition="top"
                name="password"
                type="password"
                placeholder="Password"
                size="s"
                value={password}
                onChange={setPassword}
                required
                iconLeft={<Lock className="w-4 h-4" />}
                inputClassName="placeholder-gray-300"
                labelClassName="text-sm"
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-purple-600 my-4 cursor-pointer">
            Forgot Password
          </p>
        )}

        <Button type="submit" className="mt-4 w-full" variant={"primary"}>
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
              ? "Create an Account"
              : "Next"}
        </Button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <X
          className="absolute top-5 right-5 w-5 h-5 cursor-pointer text-black hover:text-gray-700"
          onClick={(e) => {
            e.preventDefault();
            setShowRecruiterLogin(false);
          }}
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
