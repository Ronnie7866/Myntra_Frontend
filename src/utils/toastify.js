import { toast } from "react-toastify";

const commonConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  // Success toast
  export const showSuccessToast = (message) => {
    toast.success(message, commonConfig);
  };
  export const showErrorToast = (message) => {
    toast.error(message, commonConfig);
  };
  export const showInfoToast = (message) => {
    toast.info(message, commonConfig);
  };
  export const showWarningToast = (message) => {
    toast.warning(message, commonConfig);
  };
  export const showCustomToast = (message, options = {}) => {
    toast(message, { ...commonConfig, ...options });
  };