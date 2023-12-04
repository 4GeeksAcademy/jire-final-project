import React from "react";
import logoUrl from "./../../img/logo-jire.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="container-fluid nav-container sticky-top mb-2">
			<div className="container">
				<nav className="navbar navbar-inverse nav-1">
					<div className="container-fluid">
						<div className="navbar-logo">
							<Link to="/"><img className="img-logo" src={logoUrl} /></Link>
						</div>
						<div>
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
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};
