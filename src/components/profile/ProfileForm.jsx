import { useEffect, useState } from "react";
import styles from "./ProfileForm.module.css";
import axiosInstance from "../../utils/api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProfileForm = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user")); // Fallback to localStorage
  const userId = user?.id;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    gender: "",
    defaultPhoneNumber: user?.defaultPhoneNumber || "",
  });

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`/api/users/${userId}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      const response = await axiosInstance.put(
        `/api/users/${user.id}`,
        formData
      );
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return userId ? (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <h2>Profile Form</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className={styles.inputField}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className={styles.inputField}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={styles.inputField}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className={styles.inputField}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        type="tel"
        name="defaultPhoneNumber"
        placeholder="Phone Number"
        value={formData.defaultPhoneNumber}
        onChange={handleChange}
        className={styles.inputField}
        required
      />
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  ) : (
    <center>Loading...</center>
  );
};

export default ProfileForm;
