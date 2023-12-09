import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ResetPassword from "./resetPassword";
import '../../styles/login.css'

const Login = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
        // Inicio de sesión exitoso
        navigate("/");
        localStorage.setItem("user", user.email);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud de inicio de sesión", error);
    }
  };

  const handleForgotPassword = () => {
    // Aquí puedes llamar a la acción de resetPassword
    actions.resetPassword(user.email).then((status) => {
      if (status === 200) {
        // Restablecimiento de contraseña exitoso
        console.log("Solicitud de restablecimiento de contraseña exitosa");
        navigate("/login")
      } else {
        // Manejar el caso en que el restablecimiento de contraseña no sea exitoso
        console.error("Solicitud de restablecimiento de contraseña fallida");
      }
    });
  };

  return (
    <>
      <div className="container">
        <h1>Bienvenido</h1>
        <form className="login-form" onSubmit={handleSubmit}>
        {store.error != null ? <div className="alert alert-danger" role="alert">
          {store.error}
        </div> : <></>}
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
            <div class="checkbox-container">
              <label className="remember-me" for="remember">
                Recuérdame
              </label>
              <Link to="/forgot-password">Recuperar Contraseña</Link>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary mt-4 button-login">
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
