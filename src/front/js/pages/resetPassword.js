import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/resetPassword.css'

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
      <h1 className='h1-resetPassword'>Restablecer Contraseña</h1>
      <form className='resetPassword-form' onSubmit={handleSubmit}>
        <div className='form-group mt-4'>
          <input type="email" className='form-control' placeholder='Email' value={user.email} name='email' onChange={handleChange} />
        </div>
        <div className='form-group mt-4'>
          <input type="password" className='form-control' placeholder='New Password' value={user.password} name='password' onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-4 button-resetPassword">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;
