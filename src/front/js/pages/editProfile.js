import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
    const { store, actions } = useContext(Context)
    const { profile } = store
    const [info, setInfo] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (store.profile.length <= 0) {
            actions.profile()
        }
        getProfile()
    }, [store.profile])

    //guardando informacion en un estado para poder manipularlo
    const getProfile = () => {
        const prof = profile
        let info_prof = []
        info_prof.push(prof[0])
        if (prof[1] != "No personal info") {
            info_prof.push(prof[1])
        }
        if (prof[2] != "No professional info") {
            info_prof.push(prof[2])
        }
        setInfo([
            ...info_prof
        ])
    }

//onChange para la info basia del usuario
    const handleChange = (e) => {
        setInfo([
            {
                ...info[0],
                [e.target.name]: e.target.value
            }
        ])
    }
//onSubmit para la info basia del usuario
    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await actions.editProfile(info[0])
        if (response == 200) {
            navigate('/profile')
        }

    }

//onChange para la info personal del usuario
const handlePers = (e) => {
    setInfo([
        {
            ...info[1],
            [e.target.name]: e.target.value
        }
    ])
}


    return (
        <>
            <div className="container">
                <h4 className="mt-3">Edit User Information</h4>
                <div className="d-flex justify-content-between container">
                    <p className="mt-2 fs-5">
                        Nombre y Apellido*
                    </p>
                    <div className="d-flex">
                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input type="text" className="form-control mx-1" placeholder="Nombre" onChange={handleChange} name="name" value={info[0]?.name} ></input>
                            <input type="text" className="form-control" placeholder="Apellido" onChange={handleChange} name="lastname" value={info[0]?.lastname}></input>
                            <button className="btn btn-primary mx-1" type="submit" >Listo</button>
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
                        <form>
                            <div className="d-flex justify-content-between container">
                                <p className="mt-2">
                                    Nickname*
                                </p>
                                <div className="mt-2">
                                    <input type="text" className="form-control mx-1" placeholder="Nickname" onChange={handlePers} name="nickname" value={info[1]?.nickname}></input>
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
                                        name="avatar"
                                        
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between container">
                                <p className="mt-2">
                                    Address
                                </p>
                                <div className="mt-2">
                                    <input type="text" className="form-control mx-1" placeholder="Address" value={info[1]?.address}></input>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between container">
                                <p className="mt-2">
                                    City, State and Country
                                </p>
                                <div className="mt-2 mx-1 d-flex">
                                    <input type="text" className="form-control mx-1" placeholder="City" value={info[1]?.city}></input>
                                    <input type="text" className="form-control mx-1" placeholder="State" value={info[1]?.state}></input>
                                    <input type="text" className="form-control" placeholder="Country" value={info[1]?.country}></input>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between container">
                                <p className="mt-2">
                                    Personal Description*
                                </p>
                                <div className="mt-2">
                                    <textarea className="form-control mx-1" value={info[1]?.description}></textarea>
                                </div>
                            </div>
                        </form>
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
                                <input type="text" className="form-control mx-1" placeholder="Ocupation" value={info[2]?.ocupation}></input>
                                <input type="text" className="form-control mx-1" placeholder="Experience" value={info[2]?.experience}></input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between container">
                            <p className="mt-2">
                                Skills
                            </p>
                            <div className="mt-2 d-flex mx-1">
                                <input type="text" className="form-control mx-1" placeholder="Skills" value={info[2]?.skills}></input>
                                <input type="text" className="form-control mx-1" placeholder="Skills level" value={info[2]?.skills_level}></input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between container">
                            <p className="mt-2">
                                Certificates
                            </p>
                            <div className="mt-2 d-flex mx-1">
                                <input type="text" className="form-control mx-1" placeholder="Certificate" value={info[2]?.certificate}></input>
                                <input type="text" className="form-control mx-1" placeholder="Institution" value={info[2]?.institution}></input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between container">
                            <p className="mt-2">
                                Languages
                            </p>
                            <div className="mt-2 d-flex mx-1">
                                <input type="text" className="form-control mx-1" placeholder="Languages" value={info[2]?.languages}></input>
                                <input type="text" className="form-control mx-1" placeholder="Language Level" value={info[2]?.languages_level}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}