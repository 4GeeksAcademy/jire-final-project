import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";
import '../../styles/profile.css'
import '../../styles/home.css'
import { Loader } from "../component/loader.jsx";

export const Profile = () => {
    const { store, actions } = useContext(Context)
    const {profile} = store
    const [loading, setLoading] = useState(true)

    const load = () =>{
        setTimeout(() =>{
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
         actions.profile()
         load()
     }, [])

     console.log(profile[2]?.occupation)

    return (
        <>
        {loading? <Loader/>:
        <>
        {store.token == null ? <Navigate to="/login" /> : <></>}
        <div className="container profile-container my-3">
        
            <h1 className="text-center">Perfil Personal</h1>
            <div className="profile-section mt-4">
                <div className="profile-header">
                    <div className="avatar-info">
                        {profile[1] == "No personal info"? <>
                            <h4 className="text-danger">No personal info added</h4>
                            <Link to="/editprofile"><button className="btn btn-primary">Complete profile</button></Link>
                        </>:
                        <>
                            <div className="avatar">
                                <img className="profile-avatar" src={profile[1]?.avatar} alt="Profile Avatar" />
                            </div>
                            <div className="info">
                                <div className="name-nickname">
                                    <h2>{profile[0]?.name} {profile[0]?.lastname}</h2>
                                    <p className="fs-4 nickname">@{profile[1]?.nickname}</p>
                                </div>
                                <div className="description-address">
                                    <div className="description">
                                        <p className="fs-5"><i class="fa-solid fa-address-card"></i> <span className="fs-5">{profile[1]?.description}</span></p>
                                    </div>
                                    <div className="address">
                                        <p className="fs-6"><i class="fa-solid fa-location-dot mx-2"></i>{profile[1]?.address},  {profile[1]?.city}, {profile[1]?.state}, {profile[1]?.country}</p>
                                        <div className="language-info">
                                            <p className="fs-6 language"><i class="fa-solid fa-language"></i> {profile[2]?.languages} </p>
                                            <p className="fs-6" ><i class="fa-solid fa-chart-simple"></i> {profile[2]?.language_level}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="email-rol">
                                    <h2>Información de contacto</h2>
                                    <p className="fs-6"><i class="fa-solid fa-envelope"></i> {profile[0]?.email}</p>
                                    <p className="fs-6"><i class="fa-solid fa-phone"></i> {profile[1]?.phone}</p>
                                    {/* <p className="fs-4"><strong>Rol: </strong>{profile[0]?.rol}</p> */}
                                </div>
                            </div>
                        </>
                        }
                    </div>
                </div>
                <div className="profile-info mt-4">
                    {profile[2] === "No professional info" ? 
                        <>
                            <h4 className="text-danger">No professional info added</h4>
                            <Link to="/editprofile"><button className="btn btn-primary">Complete profile</button></Link>
                        </>
                        :
                        <>
                            <div className="professional-info">
                                <h2 className="text-center">Professional Info:</h2>
                                <div className="info-professional">
                                    <div className="occupation-years">
                                        <p className="fs-6 occupation"><i class="fa-solid fa-briefcase"></i> <strong>Occupation: </strong>{profile[2]?.ocupation} </p>
                                        <p className="fs-6"><i class="fa-solid fa-calendar"></i> Years of experience: {profile[2]?.experience}</p>
                                    </div>
                                    <div className="certificate-institution">
                                        <p className="fs-6 certificate"><i class="fa-solid fa-certificate"></i> <strong> Certificate: </strong>{profile[2]?.certificate}</p>
                                        <p className="fs-6"><i class="fa-solid fa-building-columns"></i> <strong>Institution: </strong>{profile[2]?.institution}</p>
                                    </div>
                                    <div className="skills">
                                        <p className="fs-6 skill"><i class="fa-solid fa-brain"></i> <strong>Skills: </strong>{profile[2]?.skills} </p>
                                        <p className="fs-6"><i class="fa-solid fa-chart-simple"></i> <strong>Skills Level: </strong>{profile[2]?.skills_level}</p>
                                    </div>
                                </div>
                            </div>
                                
                            <div className="profile-button">
                                <Link to="/editprofile"><button className="btn btn-primary">Edit profile</button></Link>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>

    </>
        }
    </>
    )
}