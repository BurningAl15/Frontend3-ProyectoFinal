import { useState, useEffect } from "react";

const initialState = {
  name: "",
  email: "",
};

const Form = ({ theme }) => {
  //Aqui deberan implementar el form completo con sus validaciones
  const [user, setUser] = useState(initialState);
  const [savedUser, setSavedUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000); // Adjust the duration as needed (2000 milliseconds = 2 seconds)

    return () => clearTimeout(timer);
  }, [savedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedUser({ ...user });
    setShow(true);
    setUser(initialState);
  };

  const validateField = (fieldName, value) => {
    let error = "";
    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (fieldName) {
      case "name":
        if (!nameRegex.test(value)) {
          error = "Please enter a full name (first and last)";
        }
        break;
      case "email":
        if (!emailRegex.test(value)) {
          error = "Please enter an email";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [fieldName]: error });
    console.log(`${JSON.stringify({ ...errors, [fieldName]: error })}`);
  };

  const hasError = () => {
    const hasEmptyFields = Object.values(user).some((userValue) => userValue === "");
    const hasErrors = Object.values(errors).some((error) => error !== "");
  
    return hasEmptyFields || hasErrors;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={theme === "light" ? "dark-mode" : ""}
      >
        <div className="form-container">
          <div className="form-section">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>

          <div className="form-section">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={hasError()}
          style={!hasError() ? { cursor: "pointer" } : {}}
        >
          Send
        </button>

        {show && (
          <span className="message">
            Gracias {savedUser.name}, te contactaremos cuando antes vía mail
          </span>
        )}
      </form>
    </>
  );
};

export default Form;
