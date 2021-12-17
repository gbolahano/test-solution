import { useEffect, useState } from "react";

import { axios } from "../../utlis/axios";

import { Spinner } from "../../components";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [profession, setProfession] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    const getBestProfession = async () => {
      const { data } = await axios.get("/admin/best-profession");
      console.log(data[0]);
      setProfession(data[0]);
      setLoading(false);
    };

    getBestProfession();
  }, []);

  return (
    <div className=" mt-10 px-10 flex flex-col space-y-5">
      <div className="text-2xl">
        Dashboard: <span className="text-sm">Best Profession</span>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner variant="primary" size="lg" />{" "}
        </div>
      ) : (
        <div className="flex space-x-4">
          <div className="p-5 shadow-md rounded-s">
            <div className="mb-3">Profession: {profession.profession}</div>
            <div className="mb-3">Total Amount: {profession.total_money}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
