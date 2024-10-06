import { useState } from "react";
import { signin } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "./SignInForm.module.css";

const SignInForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const { username, password } = formData;

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signin(formData);
      props.setUser(user);
      navigate("/dashboard");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.text1}>Sign In</div>
        <form onSubmit={handleSubmit}>
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
          <div className={styles.buttons}>
            <button type="submit">
              Login
            </button>
          </div>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default SignInForm;
