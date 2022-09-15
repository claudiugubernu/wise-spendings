import "./main.scss";
import Header from "./components/Header/Header";
import View from "./components/View/View";

import { useAppContext } from "./context/AppContext";

function App() {
  const { theme } = useAppContext();

  return (
    <div className="App" id={theme}>
      <Header />
      <View />
    </div>
  );
}

export default App;
