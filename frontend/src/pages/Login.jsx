import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <h2>Welcome back</h2>

      <input placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Login →</button>

      <p>
        <Link to="/forgot" className="link">Forgot Password?</Link>
      </p>

      <p>
        Don’t have an account?{" "}
        <Link to="/signup" className="link">Sign up</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
