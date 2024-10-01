import Header from "../components/header/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import FetchItems from "../components/FetchItems.jsx";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import {setAuthenticatedUser} from "../store/slices/authSlice.js";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/api.js";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setAuthenticatedUser({ token, user }));
    }
  }, [dispatch]);

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
