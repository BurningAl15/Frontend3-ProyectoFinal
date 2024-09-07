import React, { useState } from "react";


const initialState = {
  name: "",
  email: ""
}

const Form = () => {
  //Aqui deberan implementar el form completo con sus validaciones
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value })

    validateField(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  const validateField = (fieldName, value) => {
    let error = '';
    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

    switch (fieldName) {
      case 'name':
        if (!nameRegex.test(value)) {
          error = 'Please enter a full name (first and last)';
        }
        break;
      case 'email':
        if (value === '' && user.email.trim().length > 3) {
          error = 'Please enter an email';
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [fieldName]: error });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='section'>
          <label htmlFor="name">Full Name:</label>
          <input type="text" name='name' id="name" value={user.name} onChange={handleChange} />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>

        <div className='section'>
          <label htmlFor="email">Email:</label>
          <input type="text" name='email' id="email" value={user.email} onChange={handleChange} />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form;
