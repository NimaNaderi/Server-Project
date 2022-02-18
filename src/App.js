import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout/Layout";
import RoutesContainer from "./Components/RoutesContainer";
import DarkMode from "./DarkMode";

//! 4 Ta Amaliat Anjam Mishe Roye API (Request) 4 Model Ke Bishtar Estefade Mishan ke Behesh Migan CRUD Operation
//* CREATE -- READ -- UPDATE -- DELETE !
function App() {
  return (
    <div className="App">
      <ToastContainer transition={Zoom} pauseOnFocusLoss={false} />
      <Layout>
        <RoutesContainer />
      </Layout>
      <DarkMode />
    </div>
  );
}

export default App;
