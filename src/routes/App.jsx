import Header from "../components/header/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import FetchItems from "../components/FetchItems.jsx";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

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
    </>
  );
}

export default App;
