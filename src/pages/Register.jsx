import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import { useState } from "react";

import Styles from "./Form.module.css";

function Register() {
const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if(response.ok) {
          alert(data.message);
        }else {
          alert(data.error);
        }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to Register user');
    }
  };


  return (
    <div className={Styles.wrapper}>
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
          />
        </div>
        <div className={Styles.btn}>
          <button className={Styles.button2} type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
