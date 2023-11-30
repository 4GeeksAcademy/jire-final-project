import React from "react";
import { Link } from "react-router-dom";
import logoUrl from "../../img/jrie_logo.jpg";

export const Navbar = () => {
	return (
		<div className="container mt-2">
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-logo">
						<a href="/"><img className="img-logo" src={logoUrl} /></a>
					</div>
					<div>
						<div className="navbar-buttons">
							<button className="btn btn-outline-dark btn-lg nav-button" type="submit">
								<span><i className="fas fa-user-plus me-2"></i></span>
								Sign Up
							</button>
							<button className="btn btn-outline-dark btn-lg ms-2 nav-button" type="submit">
								<span><i className="fas fa-sign-in-alt me-2"></i></span>
								Login
							</button>
						</div>

					</div>
				</div>
			</nav>
		</div>
	);
};
