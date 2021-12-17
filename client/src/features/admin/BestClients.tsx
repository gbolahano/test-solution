import { useEffect, useState } from "react";

import { axios } from "../../utlis/axios";

import { Spinner } from "../../components";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getBestClients = async () => {
      const { data } = await axios.get("/admin/best-clients");
      console.log(data);
      setClients(data);
      setLoading(false);
    };

    getBestClients();
  }, []);

  const renderClients = (clients) => {
    return clients.map((client) => {
      return (
        <div key={client.id} className="p-5 shadow-md rounded-s">
          <div className="mb-3">Firstname: {client.firstName}</div>
          <div className="mb-3">Lastname: {client.lastName}</div>
          <div>
            Padi:
            <span className="ml-2">
              {client.paid}
            </span>
          </div>
        </div>
      );
    });
  };
  return (
    <div className=" mt-10 px-10 flex flex-col space-y-5">
      <div className="text-2xl">
        Dashboard: <span className="text-sm">Best Clients</span>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner variant="primary" size="lg" />{" "}
        </div>
      ) : (
        <div className="flex space-x-4">{renderClients(clients)}</div>
      )}
    </div>
  );
};

export default Home;
