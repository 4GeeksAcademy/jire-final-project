import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context)
    const {profile} = store

    useEffect(() => {
         actions.profile()
     }, [])

    return (
        <>
            {store.token == null ? <Navigate to="/login" /> : <></>}
            <div className="container my-3">
                <h1 className="text-center">Perfil Personal</h1>
                <div className="contianer mt-4">
                    <h2>{profile[0]?.name}  {profile[0]?.lastname}</h2>
                    <p className="fs-4">Email: {profile[0]?.email}</p>
                    <p className="fs-4">Rol: {profile[0]?.rol}</p>
                </div>
                <div className="contianer mt-4">
                    {profile[1] == "No personal info"? <>
                        <h4 className="text-danger">No personal info added</h4>
                        <Link to="/editprofile"><button className="btn btn-primary">Complete profile</button></Link>
                    </>:
                    <>
                        <h2>Personal Info:</h2>
                        <img className="img-thumbnail" src={profile[1]?.avatar}></img>
                        <p className="fs-4">Nickname: {profile[1]?.nickname}</p>
                        <p className="fs-4">Personal description: <span className="fs-5">{profile[1]?.description}</span></p>
                        <p className="fs-4">Address: {profile[1]?.address}</p>
                        <p className="fs-4">City: {profile[1]?.city}</p>
                        <p className="fs-4">State: {profile[1]?.state}</p>
                        <p className="fs-4">Country: {profile[1]?.country}</p>
                        <p className="fs-4">Phone: {profile[1]?.phone}</p>

                    {profile[2] == "No professional info"? <><h4 className="text-danger">No professional info added</h4>
                    <Link to="/editprofile"><button className="btn btn-primary">Complete profile</button></Link></> : <>
                    <h2 className="mt-4">Professional Info:</h2>
                    <p className="fs-4">Ocupation: {profile[2]?.ocupation}</p>
                    <p className="fs-4">Years of experience: {profile[2]?.experience}</p>
                    <p className="fs-4">Certificate: {profile[2]?.certificate}</p>
                    <p className="fs-4">Institution: {profile[2]?.institution}</p>
                    <p className="fs-4">Languages: {profile[2]?.languages}</p>
                    <p className="fs-4">Languages Level: {profile[2]?.language_level}</p>
                    <p className="fs-4">Skills: {profile[2]?.skills} </p>
                    <p className="fs-4">Skills Level: {profile[2]?.skills_level}</p>
                    <Link to="/editprofile"><button className="btn btn-primary">Edit profile</button></Link>
                    </>
                    }
                    </>}
                </div>
            </div>
        </>
    )
}