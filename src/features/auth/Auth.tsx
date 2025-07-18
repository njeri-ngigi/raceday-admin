import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLoginMutation } from "../../services/api";

export default function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: "", email: "" });
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated, setToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData).unwrap();
      setToken(res.accessToken);
    } catch (err) {
      console.error("Failed to login user", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>RACE DAY ADMIN</h2>
        <form onSubmit={handleLogin} className="loginForm">
          <div className="errorContainer">
            {/* TODO find a way to circumvent this ts error */}
            {error?.data?.message && (
              <p className="error">Error: {error?.data?.message}</p>
            )}
          </div>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            title="Email"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            title="Password"
            required
          />
          <button type="submit" disabled={isLoading}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
