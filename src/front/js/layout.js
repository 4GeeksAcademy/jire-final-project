import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Solicitudes } from "./pages/solicitudes.js";
import { Ofertas } from "./pages/ofertas.js"

import AddSolicitud from "./pages/AddSolicitud.jsx"
import {Profile} from "./pages/profile.js"
import injectContext from "./store/appContext";
import Login from "./pages/Login.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Signup from "./pages/Signup.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Signup />} path="/register" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Solicitudes/>} path="/solicitudes"/>
                        <Route element={<AddSolicitud/>} path="/addsolicitud"/>
                        <Route element={<Ofertas/>} path="/ofertas"/>
                        <Route element={<Profile/>} path="/profile"/>
                        <Route element={<Login/>} path="/login"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
