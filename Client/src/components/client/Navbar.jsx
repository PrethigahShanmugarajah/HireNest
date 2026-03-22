// Client / src / components / client / Navbar.jsx
import { Logo } from "../../assets/assets";
import Button from "../Button";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { formatText } from "../../utils/helpers";

const Navbar = () => {
  const { navigate, setShowRecruiterLogin } = useAppContext();

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          src={Logo}
          alt="Logo"
          className="w-36 cursor-pointer"
        />

        <div className="flex gap-4 max-sm:text-xs">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to={"/applications"}>Applied Jobs</Link>
              <p>|</p>

              <p className="max-sm:hidden">
                Hi, {formatText(user.firstName + " " + user.lastName)}
              </p>

              <UserButton />
            </div>
          ) : (
            <div className="flex gap-4 max-sm:text-xs">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowRecruiterLogin(true);
                }}
                variant={"text"}
              >
                Recruiter Login
              </Button>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  openSignIn();
                }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
