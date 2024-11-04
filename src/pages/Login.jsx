import Styles from "./Login.module.css";

function Login() {
  return (
    <div className={Styles.wrapper}>
        <form className={Styles.form}>
      <p id={Styles.heading}>Login</p>
      <div className={Styles.field}>
        <input
          autoComplete="off"
          type="text"
          placeholder="Username"
          className={Styles.inputField}
        />
      </div>
      <div className={Styles.field}>
        <input
          autoComplete="off"
          type="password"
          placeholder="Password"
          className={Styles.inputField}
        />
      </div>
      <div className={Styles.btn}>
        <button className={Styles.button1}>Login</button>
        <button className={Styles.button2}>Sign Up</button>
      </div>

      <button className={Styles.button3}>
        <p>Forgot Password</p>
      </button>
    </form>
    </div>
  );
}

export default Login;
