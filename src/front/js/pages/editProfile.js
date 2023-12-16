import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../component/loader.jsx";

export const EditProfile = () => {
    const { store, actions } = useContext(Context)
    const { profile } = store
    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    const load = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        if (store.profile.length <= 0) {
            actions.profile()
        }
        getProfile()
        load()
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

    //onChange para la info basica del usuario
    const handleChange = (e) => {
        setInfo([
            {
                ...info[0],
                [e.target.name]: e.target.value
            },
            { ...info[1] },
            { ...info[2] }
        ])
    }
    //onSubmit para la info basica del usuario
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
            { ...info[0] },
            {
                ...info[1],
                [e.target.name]: e.target.value
            },
            { ...info[2] }
        ])
    }
    const handleAvatar = (e) => {
        setInfo([
            { ...info[0] },
            {
                ...info[1],
                [e.target.name]: e.target.files[0]
            },
            { ...info[2] }
        ])
    }
    const handleSubmitPers = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nickname", info[1]?.nickname)
        formData.append("avatar", info[1]?.avatar)
        formData.append("phone", info[1]?.phone)
        formData.append("address", info[1]?.address)
        formData.append("country", info[1]?.country)
        formData.append("state", info[1]?.state)
        formData.append("city", info[1]?.city)
        formData.append("description", info[1]?.description)

        if (profile[1] == "No personal info") {
            let response = await actions.postPersonalInfo(formData)
            if (response == 201) {
                navigate('/profile')
            }
        } else {
            let result = await actions.editPersonalInfo(formData)
            if (result == 200) {
                navigate('/profile')
            }
        }
    }

    //onChange para info professional

    const handleProf = (e) => {
        setInfo([
            { ...info[0] },
            { ...info[1] },
            {
                ...info[2],
                [e.target.name]: e.target.value
            }
        ])
    }

    const handleSubmitProf = async (e) => {
        e.preventDefault()
        if (profile[2] == "No professional info") {
            let response = await actions.postProfessionalInfo(info[2])
            if (response == 201) {
                navigate('/profile')
            }
        } else {
            let result = await actions.editProfessionalInfo(info[2])
            if (result == 200) {
                navigate('/profile')
            }
        }
    }


    return (
        <>
            {loading ? <Loader /> :
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
                                <form onSubmit={handleSubmitPers}>
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
                                                onChange={handleAvatar}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            Address
                                        </p>
                                        <div className="mt-2">
                                            <input type="text" className="form-control mx-1" placeholder="Address" name="address" onChange={handlePers} value={info[1]?.address}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            Phone
                                        </p>
                                        <div className="mt-2">
                                            <input type="text" className="form-control mx-1" placeholder="Phone" name="phone" onChange={handlePers} value={info[1]?.phone}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            City, State and Country
                                        </p>
                                        <div className="mt-2 mx-1 d-flex">
                                            <input type="text" className="form-control mx-1" placeholder="City" name="city" onChange={handlePers} value={info[1]?.city}></input>
                                            <input type="text" className="form-control mx-1" placeholder="State" name="state" onChange={handlePers} value={info[1]?.state}></input>
                                            <input type="text" className="form-control" placeholder="Country" name="country" onChange={handlePers} value={info[1]?.country}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            Personal Description*
                                        </p>
                                        <div className="mt-2">
                                            <textarea className="form-control mx-1" name="description" onChange={handlePers} value={info[1]?.description}></textarea>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary mx-1 my-2" type="submit" >Listo</button>
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
                                <form onSubmit={handleSubmitProf}>
                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            Ocupation
                                        </p>
                                        <div className="mt-2 d-flex mx-1">
                                            <input type="text" className="form-control mx-1" placeholder="Ocupation" name="ocupation" onChange={handleProf} value={info[2]?.ocupation}></input>
                                            <input type="text" className="form-control mx-1" placeholder="Experience" name="experience" onChange={handleProf} value={info[2]?.experience}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            Skills
                                        </p>
                                        <div className="mt-2 d-flex mx-1">
                                            <input type="text" className="form-control mx-1" placeholder="Skills" name="skills" onChange={handleProf} value={info[2]?.skills}></input>
                                            <input type="text" className="form-control mx-1" placeholder="Skills level" name="skills_level" onChange={handleProf} value={info[2]?.skills_level}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            Certificates
                                        </p>
                                        <div className="mt-2 d-flex mx-1">
                                            <input type="text" className="form-control mx-1" placeholder="Certificate" name="certificate" onChange={handleProf} value={info[2]?.certificate}></input>
                                            <input type="text" className="form-control mx-1" placeholder="Institution" name="institution" onChange={handleProf} value={info[2]?.institution}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between container">
                                        <p className="mt-2">
                                            Languages
                                        </p>
                                        <div className="mt-2 d-flex mx-1">
                                            <input type="text" className="form-control mx-1" placeholder="Languages" name="languages" onChange={handleProf} value={info[2]?.languages}></input>
                                            <input type="text" className="form-control mx-1" placeholder="Language Level" name="language_level" onChange={handleProf} value={info[2]?.language_level}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary mx-1 my-2" type="submit" >Listo</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
}