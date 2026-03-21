// Client / src / pages / client / Home / View / Home.jsx
import AppDownload from "../Components/AppDownload";
import Hero from "../Components/Hero";
import JobListing from "../Components/JobListing";

const Home = () => {
  return (
    <div>
      <Hero />
      <JobListing />
      <AppDownload />
    </div>
  );
};

export default Home;
