import React, { useState } from "react";
import "../../styles/categorias.css";
import { Link } from "react-router-dom";

export const Categorias = () => {
    const [categorias, setCategoria ] = useState([
        { texto: "Mantenimiento", link:"/categorias/mantenimiento", imagen: "fa-tools" },
        { texto: "Limpieza", link:"/categorias/limpieza", imagen: "fa-broom" },
        { texto: "Construcción", link:"/categorias/construccion", imagen: "fa-broom" },
        { texto: "Jardineria", link:"/categorias/jardineria", imagen: "fa-tree" },
        { texto: "Mudanzas", link:"/categorias/mudanzas", imagen: "fa-box-open" },
        { texto: "Tecnología", link:"/categorias/tecnologias", imagen: "fa-laptop" },
        { texto: "Asesoría de negocios", link:"/categorias/negocios", imagen: "fa-chart-bar"},
        { texto: "Salud", link:"/categorias/salud", imagen: "fa-leaf" },
        { texto: "Eventos", link:"/categorias/eventos", imagen: "fa-birthday-cake" },
        { texto: "Traducciones", link:"/categorias/traducciones", imagen: "fa-solid fa-language " },
        { texto: "Aprende idiomas", link:"/categorias/idiomas", imagen: "fa-solid fa-book" },
        { texto: "Personal Trainning", link:"/categorias/personal_training", imagen: "fa-solid fa-dumbbell" },  
    ]);

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    {categorias.map((categoria, index)=> (<div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 text-nowrap">
                         <Link to={categoria.link} className="card text-center btn btn-outline-dark" >
                            <div className="card-body">
                                <i className={"fas  fa-2x mb-2 "+ categoria.imagen}> </i>
                                <h5 className="card-title text-nowrap"> {categoria.texto}</h5>
                            </div>
                        </Link>
                    </div>))}
                    
                </div>
            </div>
        </>
    )
}