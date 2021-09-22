import { setupApiCliente } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Metrics() {
  return (
    <>
      <div>Métricas</div>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiCliente = setupApiCliente(ctx);
    const response = await apiCliente.get("/me");

    return {
      props: {},
    };
  },
  { permissions: ["metrics.list"], roles: ["administrator"] }
);
