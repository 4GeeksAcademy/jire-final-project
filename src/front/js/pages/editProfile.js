import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const EditProfile = () => {
    const { store, actions } = useContext(Context)
    const { profile } = store
    

    useEffect(() => {
        actions.profile()
    }, [])


    return (
        <>
            <div className="container">
                <h4 className="mt-3">Edit User Information</h4>
                <div className="d-flex justify-content-between container">
                    <p className="mt-2 fs-5">
                        Nombre y Apellido*
                    </p>
                    <div className="d-flex">
                        <form className="d-flex">
                        <input type="text" className="form-control mx-1" placeholder="Nombre" value={profile[0]?.name} ></input>
                        <input type="text" className="form-control" placeholder="Apellido" value={profile[0]?.lastname}></input>
                        <button className="btn btn-primary mx-1" >Listo</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-3 container">
                <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Edit Personal information
                </button>
                <div className="collapse" id="collapseExample">
                    <div className="card card-body">
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
                                Foto de perfil
                            </p>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    className="form-control"
                                    name="images"
                                />
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
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
                    Edit Professional information
                </button>
                <div className="collapse" id="collapseExample2">
                    <div className="card card-body">
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
                    </div>
                </div>
            </div>
        </>
    )
}