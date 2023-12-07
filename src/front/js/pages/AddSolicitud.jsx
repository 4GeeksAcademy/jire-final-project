import React, {useState, useContext} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const AddSolicitud = () => {

    const navigate = useNavigate()
    const {actions, store} = useContext(Context)
    const [solicitud, setSolicitud] = useState({
        title:"",
        description:"",
        address:"",
        country:"",
        state:"",
        city:"",
        category:"",
        service:"",
        images:""
    })

    const handleChange = (event)=>{
        setSolicitud({
            ...solicitud,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event)=>{
        // event.preventDefault()

        // let result = await actions.addSolicitud(formData)
        // console.log(result)



        // if (result == 400) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Information not valid"
        //     })
        // }
        // if (result == 200) {
        //     navigate("/solicitudes")
        // }
    }

    const handleImage = (event)=>{
        if (event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/jpeg") {
            setSolicitud({...solicitud, images:event.target.files[0]})
        } else {
            console.log("Format not compatible")
        }
    }

    return (
        <>
            <div className="container w-75">
                <h1>Que servicio necesita?</h1>
                <form className="border" onSubmit={handleSubmit}>
                    <div className="form-group  mt-3 mx-3">
                        <label>Titulo</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={solicitud.title}
                            onChange={handleChange}
                            required
                            />
                    </div>
                    <div className="form-group  mt-3 mx-3">
                        <label>Descripcion</label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="description"
                            value={solicitud.description}
                            onChange={handleChange}
                            required
                            />
                    </div>
                    <div className="form-group  mt-3 mx-3">
                        <label>Direccion</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={solicitud.address}
                            onChange={handleChange}
                            required
                            />
                    </div>
                    <div className="row">
                        <div className="form-group col-sm mt-3 ms-3 w-30">
                            <label>Pais</label>
                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={solicitud.country}
                                onChange={handleChange}
                                required
                                />
                        </div>
                        <div className="form-group col-sm mt-3 w-30">
                            <label>Estado</label>
                            <input
                                type="text"
                                className="form-control"
                                name="state"
                                value={solicitud.state}
                                onChange={handleChange}
                                required
                                />
                        </div>
                        <div className="form-group col-sm mt-3 me-3 w-30">
                            <label>Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={solicitud.city}
                                onChange={handleChange}
                                required
                                />
                        </div>
                    </div>
                    <div className="form-group  mt-3 mx-3">
                        <label>Categoria</label>
                        <input
                            type="text"
                            className="form-control"
                            name="category"
                            value={solicitud.category}
                            onChange={handleChange}
                            required
                            />
                    </div>
                    <div className="form-group mt-3 mx-3">
                        <label>Tipo de servicio</label>
                        <select 
                            className="form-select"
                            value={solicitud.service}
                            name="service"
                            onChange={handleChange}>
                                <option >Seleccione una opcion</option>
                                <option value="remote">Remote</option>
                                <option value="in_place">In place</option>
                        </select>

                    </div>
                    <div className="form-group m-3">
                        <label>Adjunte una imagen que ayude a clarificar su proyecto</label>
                        <input 
                            type="file"
                            className="form-control"
                            name="images"
                            onChange={handleImage}
                        />
                    </div>
                    <div className="form-group m-3">
                        <button onSubmit={handleSubmit} className="btn btn-primary">Crear Solicitud</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AddSolicitud