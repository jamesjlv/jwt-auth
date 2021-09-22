import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext, signOut } from "../contexts/AuthContext";
import { setupApiCliente } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response?.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard {user?.email}</h1>{" "}
      <button onClick={signOut}>SignOut</button>
      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiCliente = setupApiCliente(ctx);

  const response = await apiCliente.get("/me");

  return {
    props: {},
  };
});