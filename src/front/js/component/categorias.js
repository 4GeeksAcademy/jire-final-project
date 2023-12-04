import React, { useState } from "react";
import "../../styles/categorias.css";


export const Categorias = () => {
    const [categorias, setCategoria ] = useState([
        { texto: "Mantenimiento", link:"#", imagen: "fa-tools" },
        { texto: "Limpieza", link:"#", imagen: "fa-broom" },
        { texto: "Construcción", link:"#", imagen: "fa-broom" },
        { texto: "Jardineria", link:"#", imagen: "fa-tree" },
        { texto: "Mudanzas", link:"#", imagen: "fa-box-open" },
        { texto: "Tecnología", link:"#", imagen: "fa-laptop" },
        { texto: "Asesoría de negocios", link:"#", imagen: "fa-chart-bar"},
        { texto: "Salud", link:"#", imagen: "fa-leaf" },
        { texto: "Eventos", link:"#", imagen: "fa-birthday-cake" },
        { texto: "Traducciones", link:"#", imagen: "fa-solid fa-language " },
        { texto: "Aprende idiomas", link:"#", imagen: "fa-solid fa-book" },
        { texto: "Personal Trainning", link:"#", imagen: "fa-solid fa-dumbbell" },  
    ]);

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    {categorias.map((categoria, index)=> (<div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 text-nowrap">
                        <a href={categoria.link} className="card text-center btn btn-outline-dark" >
                            <div className="card-body">
                                <i className={"fas  fa-2x mb-2 "+ categoria.imagen}> </i>
                                <h5 className="card-title text-nowrap"> {categoria.texto}</h5>
                            </div>
                        </a>
                    </div>))}
                    
                </div>
            </div>
        </>
    )
}