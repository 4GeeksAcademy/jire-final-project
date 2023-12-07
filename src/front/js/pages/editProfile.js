import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const EditProfile = () => {
    const {store, actions} = useContext(Context)
    const {profile} = store

    useEffect(()=>{
        actions.profile()
    }, [store.profile])


    return (
    <>
    <form>
    <div className="d-flex justify-content-between container">
                <p className="mt-2">
                    Nombre y Apellido*
                </p>
                <div className="d-flex">
                    <input type="text" className="form-control mx-1" placeholder="Nombre" value={profile[0]?.name}></input>
                    <input type="text" className="form-control" placeholder="Apellido" value={profile[0]?.lastname}></input>
                </div>
            </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                Nickname*
            </p>
            <div className="mt-2">
            <input type="text" className="form-control mx-1" placeholder="Nickname" value={profile[1]?.nickname}></input>
            </div>
        </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                Address
            </p>
            <div className="mt-2">
            <input type="text" className="form-control mx-1" placeholder="Address" value={profile[1]?.address}></input>
            </div>
        </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                City, State and Country
            </p>
            <div className="mt-2 mx-1 d-flex">
            <input type="text" className="form-control mx-1" placeholder="City" value={profile[1]?.city}></input>
            <input type="text" className="form-control mx-1" placeholder="State" value={profile[1]?.state}></input>
            <input type="text" className="form-control" placeholder="Country" value={profile[1]?.country}></input>
            </div>
        </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                Personal Description*
            </p>
            <div className="mt-2">
            <textarea className="form-control mx-1" value={profile[1]?.description}></textarea>
            </div>
        </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                Ocupation
            </p>
            <div className="mt-2 d-flex mx-1">
            <input type="text" className="form-control mx-1" placeholder="Ocupation" value={profile[2]?.ocupation}></input>
            <input type="text" className="form-control mx-1" placeholder="Experience" value={profile[2]?.experience}></input>
            </div>
        </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                Skills
            </p>
            <div className="mt-2 d-flex mx-1">
            <input type="text" className="form-control mx-1" placeholder="Skills" value={profile[2]?.skills}></input>
            <input type="text" className="form-control mx-1" placeholder="Skills level" value={profile[2]?.skills_level}></input>
            </div>
        </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                Certificates
            </p>
            <div className="mt-2 d-flex mx-1">
            <input type="text" className="form-control mx-1" placeholder="Certificate" value={profile[2]?.certificate}></input>
            <input type="text" className="form-control mx-1" placeholder="Institution" value={profile[2]?.institution}></input>
            </div>
        </div>
        <div className="d-flex justify-content-between container">
            <p className="mt-2">
                Languages
            </p>
            <div className="mt-2 d-flex mx-1">
            <input type="text" className="form-control mx-1" placeholder="Languages" value={profile[2]?.languages}></input>
            <input type="text" className="form-control mx-1" placeholder="Language Level" value={profile[2]?.languages_level}></input>
            </div>
        </div>
    </form>
    </>
    )
}