import React from "react";
import "../../styles/home.css";
import jrie_logo from "../../img/handyman.png"


export const Banner = () => {

	return (
		<>
		<div className="container-fluid">
			<div className="container py-5 d-flex">
				<div className="mt-3">
				<h1 className="py-2">Trabajos freelance al alcanze de tu mano</h1>
				<p className="py-2 fs-2">Ofrece lo que sabes hacer</p>
				<p className="py-2 fs-2">Crea ofertas de trabajo particulares</p>
				<p className="py-2 fs-2">Oportunidades laborales reales en tu zona o en remoto!</p>
				</div>
				<div className="mx-auto">
					<img src={jrie_logo} className="img-fluid"></img>
				</div>
			</div>
		</div>
		</>
	);
};
