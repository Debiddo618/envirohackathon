import { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpForm.module.css";
import { Link } from "react-router-dom";

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    farm: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    email: "",
    password: "",
    passwordConf: "",
  });
  const [message, setMessage] = useState("");
  const updateMessage = (msg) => {
    setMessage(msg);
  };
  const {
    firstName,
    lastName,
    username,
    farm,
    city,
    state,
    country,
    zipcode,
    email,
    password,
    passwordConf,
  } = formData;

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signup(formData);
      navigate("/crops");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      username &&
      password &&
      password === passwordConf &&
      firstName &&
      lastName &&
      farm &&
      city &&
      state &&
      country &&
      zipcode &&
      email
    );
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.text1}>Step 1:</div>
        <div className={styles.text2}>Create Your Account</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.groups}>
            <div className={styles.group}>
              <div className={`${styles.formInput} ${styles.formInput1}`}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
              <div className={`${styles.formInput} ${styles.formInput1}`}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.group}>
              <div className={`${styles.formInput} ${styles.formInput1}`}>
                <label htmlFor="farm">Farm Address</label>
                <input
                  type="text"
                  id="farm"
                  name="farm"
                  value={farm}
                  onChange={handleChange}
                />
              </div>
              <div className={`${styles.formInput} ${styles.formInput1}`}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.formInput} style={{ width: "129px" }}>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formInput} style={{ width: "115px" }}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={country}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formInput} style={{ width: "97px" }}>
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={zipcode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.formInput}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.formInput}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="passwordConf">Re-Enter Password</label>
              <input
                type="password"
                name="passwordConf"
                id="passwordConf"
                value={passwordConf}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <button styles={styles.button1}>
              <Link to="/" className={styles.link1}>
                Back
              </Link>
            </button>
            <button type="submit" disabled={isFormInvalid()}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
