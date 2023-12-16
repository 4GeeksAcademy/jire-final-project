import React, {useContext} from "react";
import logoUrl from "./../../img/logo-jire.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {

	const {store, actions} = useContext(Context)

	const handleLogout = () =>{
		actions.logout()
	}

	return (
		<div className="container-fluid nav-container sticky-top mb-2">
			<div className="container">
				<nav className="navbar navbar-inverse nav-1">
					<div className="container-fluid">
						<div className="navbar-logo">
							<Link to="/"><img className="img-logo" src={logoUrl} /></Link>
						</div>
						<div>
							{store.token == null? (<>
								<div className="navbar-buttons">
								<Link to='/register'><button className="btn btn-outline-dark btn-lg nav-button" type="submit">
									<span><i className="fas fa-user-plus me-2"></i></span>
									Sign Up
								</button></Link>
								<Link to='/login'>
									<button className="btn btn-outline-dark btn-lg ms-2 nav-button" type="submit">
										<span><i className="fas fa-sign-in-alt me-2"></i></span>
										Login
									</button>
								</Link>
							</div>
							</>) : <>
							<button className="btn btn-outline-dark btn-lg ms-2 nav-button" onClick={handleLogout} type="submit">
										<span><i className="fa-solid fa-right-from-bracket"></i></span>
										Logout
									</button>
							<Link to="profile">
							<button className="btn btn-outline-dark btn-lg ms-2 nav-button">
							<i className="fa-solid fa-user"></i>
								Perfil
							</button>
							</Link>
							</>}
							
						</div>

					</div>
				</nav>
			</div>
		</div>
	);
};
