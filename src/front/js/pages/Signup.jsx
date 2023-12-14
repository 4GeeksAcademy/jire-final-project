import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import '../../styles/signup.css'


const Signup = () => {

    const navigate = useNavigate()
    const { actions, store } = useContext(Context)
    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        console.log(user)
        event.preventDefault()
        let result = await actions.signup(user)
        console.log(result)
        if(result == 400) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email and password not valid'
            })
        } 
        if(result==200) {
            navigate("/login")
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="h1-signup">Registrate</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Apellido"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="form-group mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-signup">
                        <p>
                            Al registrarte, aceptas nuestras condiciones de uso y politicas de privacidad
                        </p>
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 signup-button">Signup</button>
                    <div className="text2-signup">
                        <p>
                            ¿Ya tienes una cuenta?
                        </p>
                        <Link to="/login">Inicia sesión</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup