import React from "react";
import "../../styles/home.css";
import { Banner } from "../component/banner";
import { Cards } from "../component/cards";
import { Carrousel } from "../component/carrousel";

export const Home = () => {

	return (
		<>
			<Banner />
			<Cards />
			<Carrousel />
		</>
	);
};
