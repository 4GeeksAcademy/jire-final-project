import React from "react";
import carrousel1 from '../../img/carrousel-1.jpg'
import carrousel2 from '../../img/carrousel-2.jpg'
import carrousel3 from '../../img/carrousel-3.jpg'
import carrousel4 from '../../img/carrousel-4.jpg'
import carrousel5 from '../../img/carrousel-5.jpg'


export const Carrousel = () => {
    return (
        <>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={carrousel1} className="d-block w-100 img-fluid" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrousel2} className="d-block w-100 img-fluid" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrousel3} className="d-block w-100 img-fluid" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrousel4} className="d-block w-100 img-fluid" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrousel5} className="d-block w-100 img-fluid" alt="..." />
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