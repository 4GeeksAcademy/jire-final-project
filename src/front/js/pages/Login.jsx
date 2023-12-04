import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false); 

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseStatus = await actions.login(user);

      if (responseStatus === 200) {
        // Inicio de sesión exitoso, redirige a la página deseada
        navigate("/");
        localStorage.setItem("user", user.email)
      }
      // } else {
      //   // Manejar el caso de inicio de sesión fallido
      //   console.error("Inicio de sesión fallido");
      // }
    } catch (error) {
      console.error("Error al procesar la solicitud de inicio de sesión", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Bienvenido</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mt-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Recuérdame
            </label>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login