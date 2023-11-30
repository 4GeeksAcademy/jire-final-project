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
							<button style={{ width: 160 }} class="btn btn-outline-dark btn-lg" type="submit">
								<span><i className="fas fa-user-plus me-2"></i></span>
								Sign Up
							</button>
							<button style={{ width: 160 }} class="btn btn-outline-dark btn-lg ms-2" type="submit">
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
