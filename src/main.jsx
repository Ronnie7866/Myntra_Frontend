import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bag from "./pages/Bag.jsx";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";
import Signup from "./components/auth/signup/Signup.jsx";
import LoginForm from "./components/auth/login/LoginForm.jsx";
import ProductForm from "./components/products/ProductForm.jsx";
import CategoryForm from "./components/products/CategoryForm.jsx";
import InventoryForm from "./components/products/InventoryForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/bag", element: <Bag /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/product-form", element: <ProductForm /> },
      { path: "/category-form", element: <CategoryForm /> },
      { path: "/inventory-form", element: <InventoryForm /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
