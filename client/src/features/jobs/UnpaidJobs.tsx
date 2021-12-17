import { useEffect, useState } from "react";

import { axios } from "../../utlis/axios";

import { Spinner, Button } from "../../components";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    const getUserJobs = async () => {
      const { data } = await axios.get("/jobs/unpaid");
      // console.log(data);
      setJobs(data);
      setLoading(false);
    };
    const getProfile = async () => {
      const { data } = await axios.get("/profile");
      setProfile(data.currentUser);
    };
    getProfile();
    getUserJobs();
  }, []);

  const handleClick = async (jobId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/jobs/${jobId}/pay`);
      // console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderJobs = (jobs) => {
    return jobs.map((job) => {
      return (
        <div key={job.id} className="p-5 shadow-md rounded-s">
          <div className="mb-3">Description: {job.description}</div>
          <div className="mb-3">
            Price:
            <span className="ml-2">{job.price}</span>
          </div>
          <div>
            Paid:
            <span className="bg-red-500 ml-2 p-1 text-white text-sm px-2 rounded-md">
              unpaid
            </span>
          </div>
          <Button
            onClick={() => handleClick(job.id)}
            isLoading={isLoading}
            variant="primary"
            size="sm"
            className="mt-3"
          >
            Make Payment
          </Button>
        </div>
      );
    });
  };

  return (
    <div className=" mt-10 px-10 flex flex-col space-y-5">
      <div className="text-2xl">
        Dashboard: <span className="text-sm">unpaid jobs</span>
      </div>
      <div className="text-2xl">
        Account Balance: <span className="text-sm">{profile.balance}</span>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner variant="primary" size="lg" />{" "}
        </div>
      ) : (
        <div className="flex space-x-4">{renderJobs(jobs)}</div>
      )}
    </div>
  );
};

export default Home;
