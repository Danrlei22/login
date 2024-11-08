import { RiLockPasswordFill } from "react-icons/ri";
import Styles from "./Form.module.css";
import { useState } from "react";
import { MdEmail } from "react-icons/md";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (response.ok) {
        setMessage("Password changed successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage("Error changing password");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className={Styles.wrapper}>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <p id={Styles.heading}>Forgot Password</p>
        <div className={Styles.field}>
          <MdEmail />
          <input
            autoComplete="off"
            type="email"
            placeholder="Your email"
            className={Styles.inputField}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={Styles.field}>
          <RiLockPasswordFill />
          <input
            autoComplete="off"
            type="password"
            placeholder="New password"
            className={Styles.inputField}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className={Styles.field}>
          <RiLockPasswordFill />
          <input
            autoComplete="off"
            type="password"
            placeholder="Confirm new password"
            className={Styles.inputField}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {message && <p className={Styles.message}>{message}</p>}

        <button className={Styles.button1} type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
