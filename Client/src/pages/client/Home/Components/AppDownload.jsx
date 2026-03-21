// Client / src / pages / client / Home / Components / AppDownload.jsx
import { App_Main_Image } from "../../../../assets/assets";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Button from "../../../../components/Button";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative bg-linear-to-r from-sky-50 to-blue-50 p-12 sm:p-24 lg:p-32 rounded-lg">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 max-w-md">
            Download Mobile App For Better Experience
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <Button
              className="hover:bg-black!"
              variant="secondary"
              iconLeft={<FaGooglePlay className="w-8 h-8" />}
            >
              <div className="flex flex-col">
                <span className="text-xs">GET IT ON</span>
                <span className="text-sm font-semibold">Google Play</span>
              </div>
            </Button>

            <Button
              className="hover:bg-black!"
              variant="secondary"
              iconLeft={<FaApple className="w-8 h-8" />}
            >
              <div className="flex flex-col leading-tight">
                <span className="text-xs ">Download on</span>
                <span className="text-sm font-semibold">App Store</span>
              </div>
            </Button>
          </div>
        </div>

        <img
          src={App_Main_Image}
          alt="App_Main_Image"
          className="absolute w-70 right-0 bottom-0 mr-32 max-lg:hidden"
        />
      </div>
    </div>
  );
};

export default AppDownload;
