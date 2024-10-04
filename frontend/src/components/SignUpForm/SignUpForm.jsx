import { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpForm.module.css";

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConf: "",
  });
  const [message, setMessage] = useState([""]);
  const updateMessage = (msg) => {
    setMessage(msg);
  };
  const { firstName, lastName, username, password, passwordConf } = formData;

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signup(formData);
      navigate("/users/signin");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoImage}></div>
        <div className={styles.formContainer}>
          <form
            className={`border container-m p-5 h-75 text-light w-50 ${styles.form}`}
            onSubmit={handleSubmit}
          >
            <h1>Sign Up</h1>
            <div className={styles.signup}>
              <p>Have an account already?</p>
              <a
                href=""
                className="text-light"
                onClick={() => navigate("/users/signin")}
              >
                Login here
              </a>
            </div>
            <div className="row mb-2">
              <div className="col">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="passwordConf"
                className="form-control"
                id="passwordConf"
                value={passwordConf}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={isFormInvalid()}
              className={`btn w-100 my-3 form-control ${styles.button}`}
            >
              Sign Up
            </button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
