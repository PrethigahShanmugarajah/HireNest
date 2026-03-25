import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Logo } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between mb-2 border-t border-gray-300 pt-5">
      <img width={160} src={Logo} alt="Logo" className="pr-4" />

      <p className="flex-1 border-l border-gray-200 pl-4 text-sm text-gray-500 max-sm:hidden ">
        Copyright {new Date().getFullYear()} &copy; HireNest. All Right
        Reserved.
      </p>

      <div className="flex gap-2.5 mr-1">
        <a
          href="#"
          className="size-8 flex items-center justify-center bg-blue-600 rounded-full text-white hover:scale-105 transition"
        >
          <FaFacebookF className="size-4" />
        </a>

        <a
          href="#"
          className="size-8 flex items-center justify-center bg-blue-400 rounded-full text-white hover:scale-105 transition"
        >
          <FaTwitter className="size-4" />
        </a>

        <a
          href="#"
          className="size-8 flex items-center justify-center bg-linear-to-tr from-pink-500 to-yellow-400 rounded-full text-white hover:scale-105 transition"
        >
          <FaInstagram className="size-4" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
