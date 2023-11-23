import React from "react";
import { Link } from "react-router-dom";
import logoUrl from "./../../img/logo-jire.png";

export const Navbar = () => {
	return (
		<div className="container my-2">
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-logo">
						<a href="/"><img className="img-logo" src={logoUrl} /></a>
					</div> 
					<div>
						<div className="navbar-buttons">
							<button class="btn btn-outline-dark btn-lg nav-button" type="submit">
								<span><i className="fas fa-user-plus me-2"></i></span>
								Sign Up
							</button>
							<button class="btn btn-outline-dark btn-lg ms-2 nav-button" type="submit">
								<span><i class="fas fa-sign-in-alt me-2"></i></span>
								Login
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};
