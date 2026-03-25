import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useAppContext } from "../../context/AppContext";
import { Eye, EyeOff, Lock, Mail, Upload, User, X } from "lucide-react";
import { InputField } from "../FormField/InputField";
import { FileInputField } from "../FormField/FileInputField";
import { loginCompany, registerCompany } from "../../services/mutations";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formRef = useRef(null);

  const { navigate, setShowRecruiterLogin, setCompanyToken, setCompanyData } =
    useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmited) {
      if (!formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match.");
        return;
      }

      return setIsTextDataSubmited(true);
    }

    try {
      setLoading(true);

      if (state === "Login") {
        const data = await loginCompany({
          email,
          password,
        });

        if (data?.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard/manage-jobs");
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);

        const data = await registerCompany(formData);

        if (data?.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard/manage-jobs");
        }
      }
    } catch {
      //
    } finally {
      setLoading(false);
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
        ref={formRef}
        onSubmit={onSubmitHandler}
        className="relative w-full max-w-lg bg-white p-10 rounded-xl text-black"
      >
        <h1 className="text-center text-2xl text-black font-medium">
          Recruiter {state}
        </h1>

        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            />

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
            />

            <InputField
              label="Password"
              labelPosition="top"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              size="s"
              value={password}
              onChange={setPassword}
              required
              iconLeft={<Lock className="w-4 h-4" />}
              iconRight={
                showPassword ? (
                  <EyeOff
                    className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
            />

            <InputField
              label="Confirm Password"
              labelPosition="top"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              size="s"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
              iconLeft={<Lock className="w-4 h-4" />}
              iconRight={
                showConfirmPassword ? (
                  <EyeOff
                    className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <Eye
                    className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )
              }
            />
          </div>
        ) : (
          <>
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
              />
            </div>

            <div className="mt-4">
              <InputField
                label="Password"
                labelPosition="top"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                size="s"
                value={password}
                onChange={setPassword}
                required
                iconLeft={<Lock className="w-4 h-4" />}
                iconRight={
                  showPassword ? (
                    <EyeOff
                      c
                      className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
              />
            </div>
          </>
        )}

        {state !== "Login" && (
          <div className="mt-5 grid grid-cols-[72px_1fr] items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
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

            <p>Upload Company Logo</p>
          </div>
        )}

        {state === "Login" && (
          <p className="text-sm text-purple-600 my-4 cursor-pointer">
            Forgot Password
          </p>
        )}

        <Button type="submit" className="mt-4 w-full" variant={"primary"}>
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader size={18} color="#FFFFFF" />
            </div>
          ) : state === "Login" ? (
            "Login"
          ) : (
            "Create an Account"
          )}
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
