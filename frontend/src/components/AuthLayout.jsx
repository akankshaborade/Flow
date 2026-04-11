import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="container">
      {/* LEFT */}
      <div className="left-panel">
        <h2>Flow</h2>

        <div>
          <h1>Capturing Moments,<br />Creating Memories</h1>
        </div>

        <Link to="/" className="link">← Back to website</Link>
      </div>

      {/* RIGHT */}
      <div className="right-panel">
        <div className="card">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
