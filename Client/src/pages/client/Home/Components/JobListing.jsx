// Client / src / pages / client / Home / Components / JobListing.jsx
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { X } from "lucide-react";
import Button from "../../../../components/Button";
import { MultiCheckboxField } from "../../../../components/FormField/CheckboxField";
import { JobCategories, JobLocations } from "../../../../data/jobData";
import JobCard from "../../../../components/client/JobCard";
import Pagination from "../../../../components/Pagination";

const JobListing = () => {
  const {
    searchFilter,
    setSearchFilter,
    isSearched,
    jobs,
    currentPage,
    setCurrentPage,
    getPaginatedData,
  } = useAppContext();

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job),
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [
    jobs,
    selectedCategories,
    selectedLocations,
    searchFilter,
    setCurrentPage,
  ]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const { totalPages, paginatedData } = getPaginatedData(
    filteredJobs,
    currentPage,
    itemsPerPage,
  );

  return (
    <div className="conatiner 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* -------- Sidebar -------- */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* ---- Search Filter from Hero Component ---- */}
        {((isSearched && searchFilter.title !== "") ||
          searchFilter.location !== "") && (
          <>
            <h3 className="font-bold text-lg mb-4">Current Search</h3>

            <div className="mb-4 text-black">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-purple-300 border border-purple-50 px-4 py-1.5 rounded cursor-pointer">
                  {searchFilter.title}
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                  />
                </span>
              )}

              {searchFilter.location && (
                <span className="ml-2 inline-flex items-center gap-2.5 bg-pink-300 border border-pink-50 px-4 py-1.5 rounded cursor-pointer">
                  {searchFilter.location}
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                  />
                </span>
              )}
            </div>
          </>
        )}

        <Button
          onClick={(e) => {
            e.preventDefault();
            setShowFilter((prev) => !prev);
          }}
          className="lg:hidden"
          variant={"text"}
        >
          {showFilter ? "Close" : "Filters"}
        </Button>

        {/* ---- Filter ---- */}
        <div className="flex gap-3">
          {/* ---- Category Filter ---- */}
          <div className={showFilter ? "" : "max-lg:hidden"}>
            <h4 className="font-bold text-sm py-4">Search by Categories</h4>

            <MultiCheckboxField
              name="categories"
              size="xs"
              options={JobCategories.map((category) => ({
                label: category,
                value: category,
              }))}
              value={selectedCategories}
              onChange={(nextValue) => setSelectedCategories(nextValue)}
              direction="col"
              className="text-gray-500"
            />
          </div>

          {/* ---- Location Filter ---- */}
          <div className={showFilter ? "" : "max-lg:hidden"}>
            <h4 className="font-bold text-sm py-4">Search by Location</h4>

            <MultiCheckboxField
              name="locations"
              size="xs"
              options={JobLocations.map((location) => ({
                label: location,
                value: location,
              }))}
              value={selectedLocations}
              onChange={(nextValue) => setSelectedLocations(nextValue)}
              direction="col"
              className="text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* -------- Job Listings -------- */}
      <section className="w-full lg:w-3/4 text-black max-lg:px-4">
        <h3 className="font-bold text-3xl py-2" id="job-list">
          Latest Job Openings
        </h3>

        <p className="mb-8 text-gray-600">
          Explore the newest job opportunities across Sri Lanka in IT, design,
          management, and more. Find the perfect role that matches your skills,
          experience, and career goals. Stay ahead and apply today to take the
          next step in your professional journey!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginatedData.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
          itemsPerPageOptions={[6, 9, 12]}
        />
      </section>
    </div>
  );
};

export default JobListing;
