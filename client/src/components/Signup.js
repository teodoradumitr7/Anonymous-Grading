import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) data.type = 0;
    else data.type = 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8090/register";
      await axios.post(url, data);
      navigate("/login");
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div id="register">
      <h1>Sign Up</h1>
      <form id="form-container" onSubmit={handleSubmit}>
        <label htmlFor="name">Nume</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={data.name}
          required
        />
        <label htmlFor="surname">Prenume</label>
        <input
          type="text"
          name="surname"
          id="surname"
          onChange={handleChange}
          value={data.surname}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={data.username}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={data.password}
          required
        />
        <label htmlFor="checked">Cont profesor:</label>
        <input
          id="tipstudent"
          type="checkbox"
          name="esteProfesor"
          checked={isChecked}
          onChange={handleOnChange}
        ></input>
        {error && <div className="errorSquare">{error}</div>}
        <div id="buttons">
          <button type="submit">Sign up</button>
          <Link to="/">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
