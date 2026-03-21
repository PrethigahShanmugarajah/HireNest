// Client / src / pages / client / Home / Components / Hero.jsx
import { useRef } from "react";
import Button from "../../../../components/Button";
import { useAppContext } from "../../../../context/AppContext";
import {
  SiAirbnb,
  SiApple,
  SiDropbox,
  SiFacebook,
  SiGoogle,
  SiNetflix,
  SiNvidia,
  SiSlack,
  SiSpotify,
  SiTesla,
} from "react-icons/si";
import { MapPin, Search } from "lucide-react";
import { InputField } from "../../../../components/FormField/InputField";

const companies = [
  { icon: <SiAirbnb />, name: "Airbnb" },
  { icon: <SiApple />, name: "Apple" },
  { icon: <SiDropbox />, name: "Dropbox" },
  { icon: <SiFacebook />, name: "Facebook" },
  { icon: <SiGoogle />, name: "Google" },
  { icon: <SiNetflix />, name: "Netflix" },
  { icon: <SiNvidia />, name: "Nvidia" },
  { icon: <SiSlack />, name: "Slack" },
  { icon: <SiSpotify />, name: "Spotify" },
  { icon: <SiTesla />, name: "Tesla" },
];

const Hero = () => {
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const { setSearchFilter, setIsSearched } = useAppContext();

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    // console.log({
    //   title: titleRef.current.value,
    //   location: locationRef.current.value,
    // });
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-linear-to-r from-blue-800 to-blue-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>

        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>

        <div className="flex items-center justify-between bg-white rounded text-black max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center">
            <Search className="h-4 sm:h-5 text-gray-500" />

            <InputField
              type="text"
              placeholder="Search for jobs"
              size="xs"
              unstyled
              inputRef={titleRef}
              inputClassName="p-2"
            />
          </div>

          <div className="border-l border-black h-8 px-1"></div>

          <div className="flex items-center">
            <MapPin className="h-4 sm:h-5 text-rose-500" />

            <InputField
              type="text"
              placeholder="Location"
              size="xs"
              unstyled
              inputRef={locationRef}
              inputClassName="p-2"
            />
          </div>

          <Button onClick={onSearch} className="m-1">
            Search
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 shadow-md mx-2 mt-5 p-6 rounded-md">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <h4 className="font-medium text-3xl">Trusted by</h4>

          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-marquee gap-12">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xl text-gray-800 whitespace-nowrap"
                >
                  {company.icon}
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
