import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const ResetPassword = () => {
  const {store, actions} = useContext(Context);
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    setUser({
      ...user, 
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    actions.resetPassword(user)
    console.log(user)

  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo Electrónico:
          <input type="email" value={user.email} name='email' onChange={handleChange} />
        </label>
        <br />
        <label>
          Nueva Contraseña:
          <input type="password" value={user.password} name='password' onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;
