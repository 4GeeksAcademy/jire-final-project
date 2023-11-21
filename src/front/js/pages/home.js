import React from "react";
import "../../styles/home.css";
import { Banner } from "../component/banner";
import { Cards } from "../component/cards";
import { Carrousel } from "../component/carrousel";
import { Categorias } from "../component/categorias";

export const Home = () => {

	return (
		<>
			<Banner />
			<Cards />
			<Carrousel />
			<Categorias />
		</>
	);
};
