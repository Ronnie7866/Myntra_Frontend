import Header from "../components/header/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import FetchItems from "../components/FetchItems.jsx";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <>
      <Header />
      <FetchItems />
      {fetchStatus.currentlyFetching ? (
        <Spinner />
      ) : (
        <Outlet /> // This will render the route's children, like CreateProductForm
      )}
      <Footer />
      {/* Add ToastContainer here for global toasts */}
      <ToastContainer />
    </>
  );
}

export default App;
