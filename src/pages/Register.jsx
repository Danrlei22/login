import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import { useState } from "react";

import Styles from "./Form.module.css";
import { FaArrowLeft } from "react-icons/fa6";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);

        setTimeout(() => {
          setUsername("");
          setEmail("");
          setPassword("");
          window.location.href = "/login";
        }, 2000);

      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to register user");
    }
  };

  return (
    <div className={Styles.wrapper}>
      <button
        className={Styles.leftArrow}
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
      </button>
      <form className={Styles.form} onSubmit={handleRegister}>
        <p id={Styles.heading}>Register</p>

        <div className={Styles.field}>
          <IoPersonSharp />
          <input
            autoComplete="off"
            type="text"
            placeholder="Username"
            className={Styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={Styles.field}>
          <MdEmail />
          <input
            type="email"
            placeholder="Email"
            className={Styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={Styles.field}>
          <RiLockPasswordFill />
          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            className={Styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={Styles.error}>{error}</p>}
        <div className={Styles.btn}>
          <button className={Styles.button1} type="submit">
            Register
          </button>
        </div>
        {sucess && <p className={Styles.success}>{sucess}</p>}
      </form>
    </div>
  );
}

export default Register;
