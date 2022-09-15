import { currencyFormatter } from "../../utils/utils";
import { useAppContext } from "../../context/AppContext";

const View = () => {
  const { currency } = useAppContext();
  return (
    <main className="site-width h-100">
      {currencyFormatter(currency).format(400)}
    </main>
  );
};

export default View;
