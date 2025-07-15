import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";

export default function Auth() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Login Page</h1>
      <p>Please enter your credentials to log in.</p>
    </div>
  );
}
