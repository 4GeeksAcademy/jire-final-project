import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useParams } from "react-router-dom";
import '../../styles/home.css'
import '../../styles/profile.css'
import { Loader } from "../component/loader.jsx";

export const PublicProfile = () => {
    const { store, actions } = useContext(Context)
    const { offerDetail } = store
    const userid = useParams()
    const id = useParams()
    const [loading, setLoading] = useState(true)

    const load = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        actions.getOfferProfile(userid.userid, id.id)
        load()
    }, [])

    return (
        <>
            {loading ? <Loader /> :
                       <>
                       <div className="container profile-container my-3">
                           <h1 className="text-center">Perfil Personal</h1>
                           <div className="profile-section mt-4">
                               <div className="profile-header">
                                   <div className="avatar-info">
                                           <div className="avatar">
                                               <img className="profile-avatar" src={offerDetail[1]?.avatar} alt="Profile Avatar" />
                                           </div>
                                           <div className="info">
                                               <div className="name-nickname">
                                                   <h2>{offerDetail[0]?.name} {offerDetail[0]?.lastname}</h2>
                                                   <p className="fs-4 nickname">@{offerDetail[1]?.nickname}</p>
                                               </div>
                                               <div className="description-address">
                                                   <div className="description">
                                                       <p className="fs-5"><i class="fa-solid fa-address-card"></i> <span className="fs-5">{offerDetail[1]?.description}</span></p>
                                                   </div>
                                                   <div className="address">
                                                       <p className="fs-6"><i class="fa-solid fa-location-dot mx-2"></i>{offerDetail[1]?.address},  {offerDetail[1]?.city}, {offerDetail[1]?.state}, {offerDetail[1]?.country}</p>
                                                       <div className="language-info">
                                                           <p className="fs-6 language"><i class="fa-solid fa-language"></i> {offerDetail[2]?.languages} </p>
                                                           <p className="fs-6" ><i class="fa-solid fa-chart-simple"></i> {offerDetail[2]?.language_level}</p>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="contact-info">
                                               <div className="email-rol">
                                                   <h2>Información de contacto</h2>
                                                   <p className="fs-6"><i class="fa-solid fa-envelope"></i> {offerDetail[0]?.email}</p>
                                                   <p className="fs-6"><i class="fa-solid fa-phone"></i> {offerDetail[1]?.phone}</p>
                                                   {/* <p className="fs-4"><strong>Rol: </strong>{profile[0]?.rol}</p> */}
                                               </div>
                                           </div>
                                   </div>
                               </div>
                               <div className="profile-info mt-4">
                                       <>
                                           <div className="professional-info">
                                               <h2 className="text-center">Professional Info:</h2>
                                               <div className="info-professional">
                                                   <div className="occupation-years">
                                                       <p className="fs-6 occupation"><i class="fa-solid fa-briefcase"></i> <strong>Occupation: </strong>{offerDetail[2]?.ocupation} </p>
                                                       <p className="fs-6"><i class="fa-solid fa-calendar"></i> <strong>Years of experience: </strong>{offerDetail[2]?.experience}</p>
                                                   </div>
                                                   <div className="certificate-institution">
                                                       <p className="fs-6 certificate"><i class="fa-solid fa-certificate"></i> <strong> Certificate: </strong>{offerDetail[2]?.certificate}</p>
                                                       <p className="fs-6"><i class="fa-solid fa-building-columns"></i> <strong>Institution: </strong>{offerDetail[2]?.institution}</p>
                                                   </div>
                                                   <div className="skills">
                                                       <p className="fs-6 skill"><i class="fa-solid fa-brain"></i> <strong>Skills: </strong>{offerDetail[2]?.skills} </p>
                                                       <p className="fs-6"><i class="fa-solid fa-chart-simple"></i> <strong>Skills Level: </strong>{offerDetail[2]?.skills_level}</p>
                                                   </div>
                                               </div>
                                           </div>
                                       </>
                               </div>
                           </div>
                       </div>
               
                   </>
            }
        </>
    )
}