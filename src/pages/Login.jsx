import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

import Styles from "./Form.module.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if(response.ok) {
          alert("Login successful");
        }else {
          alert(data.error);
        }
    } catch (error) {
      console.error('Error:', error);
      alert('failed to login');
    }
  };


  return (
    <div className={Styles.wrapper}>
      <form className={Styles.form} onSubmit={handleLogin}>
        <p id={Styles.heading}>Login</p>
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
        <div className={Styles.btn}>
          <button className={Styles.button1} type="submit">Login</button>
          <button className={Styles.button2} type="submit" onClick={() => window.location.href = '/register'}>Sign Up</button>
        </div>

        <button className={Styles.button3} type="submit" onClick={() => window.location.href = '/reset-password'}>
          Forgot Password
        </button>
      </form>
    </div>
  );
}

export default Login;
