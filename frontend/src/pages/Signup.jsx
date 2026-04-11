import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Signup = () => {
  return (
    <AuthLayout>
      <h2>Create an account</h2>

      <input placeholder="First Name" />
      <input placeholder="Last Name" />
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Create Account →</button>

      <p>
        Already have an account?{" "}
        <Link to="/login" className="link">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
