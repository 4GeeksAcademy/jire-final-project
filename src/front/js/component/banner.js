import React from "react";
import "../../styles/home.css";
import bannerUrl from "../../img/banner-img.jpg"


export const Banner = () => {

	return (
		<>
		<div className="container-fluid">
			<div className="container py-5 d-flex">
				<div>
				<h1 className="pt-4">Jire</h1>
				<h1 className="py-2">Trabajos freelance al alcanze de tu mano</h1>
				<h4 className="py-2">Ofrece lo que sabes hacer o crea alertas de empleo particulares</h4>
				<h4 className="py-2">Oportunidades laborales reales en tu zona o en remoto!</h4>
				</div>
				<div className="mx-auto">
					<img src={bannerUrl} className="img-fluid"></img>
				</div>
			</div>
		</div>
		</>
	);
};
