import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context)


    const [userInfo, setUserInfo] = useState()
    const [personalInfo, setPersonalInfo] = useState()
    const [professionalInfo, setProfessionalInfo] = useState()



    useEffect(() => {
        actions.profile(store.token)
        setUserInfo(store.profile[0])
        setPersonalInfo(store.profile[1])
        setProfessionalInfo(store.profile[2])
    }, [store.profile])


    return (
        <>
            {store.token == null ? <Navigate to="/login" /> : <></>}
            <div className="container my-3">
                <h1 className="text-center">Perfil Personal</h1>
                <div className="contianer mt-4">
                    <h2>{userInfo?.name}  {userInfo?.lastname}</h2>
                    <p className="fs-4">Email: {userInfo?.email}</p>
                    <p className="fs-4">Rol: {userInfo?.rol}</p>
                </div>
                <div className="contianer mt-4">
                    {personalInfo == "No personal info"? <>
                        <h4 className="text-danger">No personal or professional info added</h4>
                        <Link to="/editprofile"><button className="btn btn-primary">Complete profile</button></Link>
                    </>:
                    <>
                        <h2>Personal Info:</h2>
                        <p className="fs-4">Nickname: {personalInfo?.nickname}</p>
                        <p className="fs-4">Personal description: <span className="fs-5">{personalInfo?.description}</span></p>
                        <p className="fs-4">Address: {personalInfo?.address}</p>
                        <p className="fs-4">City: {personalInfo?.city}</p>
                        <p className="fs-4">State: {personalInfo?.state}</p>
                        <p className="fs-4">Country: {personalInfo?.country}</p>
                        <p className="fs-4">Phone: {personalInfo?.phone}</p>


                        <h2 className="mt-4">Professional Info:</h2>
                        <p className="fs-4">Ocupation: {professionalInfo?.ocupation}</p>
                        <p className="fs-4">Years of experience: {professionalInfo?.experience}</p>
                        <p className="fs-4">Certificate: {professionalInfo?.certificate}</p>
                        <p className="fs-4">Institution: {professionalInfo?.institution}</p>
                        <p className="fs-4">Languages: {professionalInfo?.languages}</p>
                        <p className="fs-4">Languages Level: {professionalInfo?.languages_level}</p>
                        <p className="fs-4">Skills: {professionalInfo?.skills} </p>
                        <p className="fs-4">Skills Level: {professionalInfo?.skills_level}</p>
                        <Link to="/editprofile"><button className="btn btn-primary">Edit profile</button></Link>
                    </>}
                </div>
            </div>
        </>
    )
}