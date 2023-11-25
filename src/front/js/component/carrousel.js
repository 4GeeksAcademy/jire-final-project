import React from "react";
import '../../styles/carrousel.css'
import carrousel1 from '../../img/carrousel-1.png'
import carrousel2 from '../../img/carrousel-2.png'
import carrousel3 from '../../img/carrousel-3.png'


export const Carrousel = () => {
    return (
        <>
            <div id="carouselExample" className="carousel slide my-3">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={carrousel1} className="d-block carrousel-img w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrousel2} className="d-block w-100 " alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrousel3} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}