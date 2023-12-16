import React, { useEffect, useState, useContext } from "react";
import JireLogo from '../../img/handyman.png'
import { Context } from "../store/appContext"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../../styles/home.css'
import { Loader } from "../component/loader.jsx";

export const OfferDeatail = () => {
    const {store, actions} = useContext(Context)
    const userid = useParams()
    const id = useParams()
    const {offerDetail, profile} = store
    const [loading, setLoading] = useState(true)

    const load = () =>{
        setTimeout(() =>{
            setLoading(false)
        }, 1000)
    }

    useEffect(() =>{
        actions.getOfferProfile(userid.userid, id.id)
        actions.profile()
        load()
    }, [])


    const handleEmail = async() =>{
        const email = {
            subject: `Oferta de Jire solicitada por ${profile[0]?.name} ${profile[0]?.lastname}`,
            to : offerDetail[0]?.email,
            email : profile[0]?.email,
            phone: profile[1]?.phone,
            offer_title : offerDetail[3]?.title
        }
        let response = await actions.offerEmail(email)
        if (response == 200) {
            Swal.fire({
              title: "Perfecto!",
              text: "Se envio un mail de contacto con tu informacion de contacto al ofertante",
              icon: "success"
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Intentalo mas tarde"
          })
          }
    }

    return (
        <>
            {loading? <Loader/> : 
                 <div className="container">
                 <div className="row justify-content-center">
                     <div className="col-12 col-md-8">
                     <div className="card mb-3">
                     <div className="detalle">
                     <img src={offerDetail[3]?.images == null? JireLogo: offerDetail[3]?.images } className="card-img-top" alt="..." />
                     </div>
                     <div className="card-body">
                         <h5 className="card-title">{offerDetail[3]?.title}</h5>
                         <p className="card-text">{offerDetail[3]?.description}</p>
                         <p className="card-text">{offerDetail[3]?.address}, {offerDetail[3]?.city}, {offerDetail[3]?.state}, {offerDetail[3]?.country}</p>
                         <h5 className="card-title">Datos del profesional</h5>
                         <p className="card-text"><i class="fa-solid fa-user mx-2"></i>{offerDetail[0]?.name} {offerDetail[0]?.lastname} </p>
                         <p className="card-text"><i class="fa-solid fa-briefcase mx-2"></i>{offerDetail[2]?.ocupation}</p>
                         <p className="card-text"><i class="fa-solid fa-list-check mx-2"></i>{offerDetail[2]?.skills}, {offerDetail[2]?.skills_level} </p>
                         <p className="card-text"><i class="fa-solid fa-language mx-2"></i>{offerDetail[2]?.languages}</p>
                         <p className="card-text"><i class="fa-solid fa-envelope mx-2"></i>{offerDetail[0]?.email}</p>
                         <p className="card-text"><i class="fa-solid fa-phone mx-2"></i>{offerDetail[1]?.phone}</p>
                         <div className="d-flex ">
                         <Link to={`/public-profile/${userid.userid}/${id.id}`}>
                         <button className="btn btn-primary">Ver Perfil del Profesional</button>
                         </Link>
     
                         <button className="btn btn-primary mx-2" onClick={handleEmail}>Aplicar</button>
                         </div>
                     </div>
                 </div>
                     </div>
                 </div>
                 </div>
            }
        </>
    )
}
