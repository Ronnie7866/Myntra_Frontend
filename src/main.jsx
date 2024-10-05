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
import ProductForm from "./components/auth/admin/products/ProductForm.jsx";
import CategoryForm from "./components/auth/admin/products/CategoryForm.jsx";
import InventoryForm from "./components/auth/admin/products/InventoryForm.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminDashboard from "./components/auth/admin/adminDashboard/AdminDashboard.jsx";
import ImageUploadForm from "./components/auth/admin/products/ImageUploadForm.jsx";
import ProductPage from "./components/product/ProductPage.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SizeColorForm from "./components/product/SizeColorForm.jsx";
import ProfileForm from "./components/profile/ProfileForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/bag", element: <Bag /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <LoginForm /> },

      //Admin-specific routes protected by role
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute requireRole="ADMIN">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/product-form",
        element: (
          <PrivateRoute requireRole={"ADMIN"}>
            <ProductForm />
          </PrivateRoute>
        ),
      },

      {
        path: "/category-form",
        element: (
          <PrivateRoute requireRole={"ADMIN"}>
            <CategoryForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/inventory-form",
        element: (
          <PrivateRoute requireRole={"ADMIN"}>
            <InventoryForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/upload-image/:id",
        element: (
          <PrivateRoute requireRole={"ADMIN"}>
            <ImageUploadForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/size-color-form/:id",
        element: <SizeColorForm />,
      },
      {
        path: "/profile-form",
        element: <ProfileForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
