import React, { useRef, useState } from "react";
import styles from "./Form.module.scss";
import useWindowResize from "../../hooks/useWindowResize";
import BackDropFilter from "../../components/BackDropFilter";
import { createPortal } from "react-dom";
import useToggleState from "../../hooks/useToggleState";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = (props) => {
  const navigate = useNavigate();

  const redirectToShop = () => {
    navigate("/Shop");
  };

  // Storing the current windowSize to update UI based on it
  const windowWidth = useWindowResize();

  // Managing State for modal visibility
  const modalRef = useRef();
  const [isModalVisible, toggleModalVisible] = useToggleState(false);
  useClickOutside(modalRef, toggleModalVisible, isModalVisible);

  // State for form data and errors
  const [formState, setFormState] = useState({
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
    },
    errors: {
      firstName: "",
      lastName: "",
      email: "",
    },
    isSubmitting: false, // Flag to track if form is submitting
  });

  // Validation function for each field
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) {
          return "First Name is required";
        }
        return "";
      case "lastName":
        if (!value.trim()) {
          return "Last Name is required";
        }
        return "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          return "Email is required";
        } else if (!emailRegex.test(value)) {
          return "Invalid email format";
        }
        return "";
      default:
        return "";
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate each field
    const updatedErrors = {};
    for (const fieldName in formState.formData) {
      const value = formState.formData[fieldName];
      updatedErrors[fieldName] = validateField(fieldName, value);
    }

    // Set errors in state
    setFormState((prevFormState) => ({
      ...prevFormState,
      errors: { ...updatedErrors },
    }));

    // Check if there are any validation errors
    if (Object.values(updatedErrors).some((error) => error !== "")) {
      return;
    }
    // Set isSubmitting flag to true when form is submitted(only when the form is valid)
    setFormState((prevFormState) => ({
      ...prevFormState,
      isSubmitting: true,
    }));
    try {
      // Send form data to the backend endpoint
      const response = await axios.post(
        "https://e-commerce-api-j092.onrender.com/api/contact/submit",
        formState.formData
      );

      // Handle successful form submission

      // Reset the form to its initial empty state + modal popup
      resetForm();

      // Handle error condition
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorCode = error.response.status;
      const errorMessage = error.response.message;
      alert(`Error ${errorCode}: ${errorMessage}`);
    } finally {
      // Set isSubmitting flag back to false after submission
      setFormState((prevFormState) => ({
        ...prevFormState,
        isSubmitting: false,
      }));
    }
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      formData: { ...prevFormState.formData, [name]: value },
    }));
    // Validate the field as the user types
    const error = validateField(name, value);
    setFormState((prevFormState) => ({
      ...prevFormState,
      errors: { ...prevFormState.errors, [name]: error },
    }));
  };

  // Function to reset the form to its initial empty state
  const resetForm = () => {
    setFormState({
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
      },
    });
    toggleModalVisible(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={` ${styles.form} ${props.className}`}
    >
      <label htmlFor={styles.firstName} hidden="hidden">
        First Name
      </label>
      <div>
        <input
          type="text"
          name="firstName"
          id={styles.firstName}
          placeholder="First Name"
          value={formState.formData.firstName}
          onChange={handleInputChange}
          style={{
            borderBottomColor: formState.errors.firstName ? "#cc0000" : "",
          }}
        />
        <span className={styles.errors}>{formState.errors.firstName}</span>
      </div>

      <label htmlFor={styles.lastName} hidden="hidden">
        Last Name
      </label>
      <div style={{ overflowX: "hidden" }}>
        <input
          type="text"
          name="lastName"
          id={styles.lastName}
          placeholder="Last Name"
          value={formState.formData.lastName}
          onChange={handleInputChange}
          style={{
            borderBottomColor: formState.errors.lastName ? "#cc0000" : "",
          }}
        />
        <span className={styles.errors}>{formState.errors.lastName}</span>
      </div>
      <label htmlFor={styles.email} hidden="hidden">
        Email
      </label>
      <div>
        <input
          type="text"
          name="email"
          id={styles.email}
          placeholder="Email"
          value={formState.formData.email}
          onChange={handleInputChange}
          style={{ borderBottomColor: formState.errors.email ? "#cc0000" : "" }}
        />
        <span className={styles.errors}>{formState.errors.email}</span>
      </div>

      <label htmlFor={styles.subject} hidden="hidden">
        Message
      </label>
      <textarea
        name="subject"
        id={styles.subject}
        cols="30"
        rows={windowWidth > 768 ? "10" : "6"}
        placeholder="Write your message.."
        value={formState.formData.subject}
        onChange={handleInputChange}
      ></textarea>

      <button
        type="submit"
        className={styles.submitBtn}
        value="submit"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? (
          <div className={styles.spinner}></div>
        ) : (
          "Send Message"
        )}
      </button>
      {isModalVisible &&
        createPortal(
          <>
            <div
              className={styles["successfully-sent-email-modal"]}
              ref={modalRef}
            >
              <h1>
                Thank you for your message, we will get back to you as soon as
                possible.
              </h1>
              <p>Meanwhile you might want to further explore our products.</p>
              <button onClick={redirectToShop}>Back To Our Shop</button>
            </div>
            <BackDropFilter />
          </>,
          document.getElementById("root")
        )}
    </form>
  );
};

export default Form;
