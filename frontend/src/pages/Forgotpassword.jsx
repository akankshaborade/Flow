import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <h2>Reset Password</h2>

      <input placeholder="Enter your email" />

      <button>Send Reset Link →</button>

      <p>
        <Link to="/login" className="link">← Back to Login</Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
