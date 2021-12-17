import { useEffect, useState } from "react";

import { axios } from "../../utlis/axios";

import { Spinner } from "../../components";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getUserContracts = async () => {
      const { data } = await axios.get("/contracts");
      // console.log(data);
      setContracts(data);
      setLoading(false);
    };

    getUserContracts();
  }, []);

  const renderContracts = (contracts) => {
    return contracts.map((contract) => {
      return (
        <div key={contracts.id} className="p-5 shadow-md rounded-s">
          <div className="mb-3">Terms: {contract.terms}</div>
          <div>
            status:{" "}
            <span className="bg-blue-500 p-1 text-white text-sm px-2 rounded-md">
              {contract.status}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className=" mt-10 px-10 flex flex-col space-y-5">
      <div className="text-2xl">
        Dashboard: <span className="text-sm">contracts</span>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner variant="primary" size="lg" />{" "}
        </div>
      ) : (
        <div className="flex space-x-4">{renderContracts(contracts)}</div>
      )}
    </div>
  );
};

export default Home;
