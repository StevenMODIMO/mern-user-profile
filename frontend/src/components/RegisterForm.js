import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(firstname, lastname, email, password);
  };
  return (
    <div>
      <div className="register-form">
        <h2 className="register-h2">Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="first-name">
            <label htmlFor="firstName">FirstName:</label>
            <input
              type="text"
              id="firstName"
              placeholder="john"
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="last-name">
            <label htmlFor="lastName">LastName:</label>
            <input
              type="text"
              id="lastName"
              placeholder="doe"
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="email">
            <label htmlFor="email">User Email:</label>
            <input
              type="text"
              id="email"
              placeholder="johndoe@example.com"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={loading} className="register">
            Register
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <div className="login-link">
        Already have an account ? <Link to="/login">Login Instead</Link>
      </div>
      </div>
    </div>
  );
}
