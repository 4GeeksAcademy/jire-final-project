import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import JireLogo from '../../img/handyman.png'
import { useParams } from 'react-router-dom'
import '../../styles/home.css'
import Swal from 'sweetalert2'
import { Loader } from '../component/loader.jsx'

const DetailSolicitud = () => {
  const { store, actions } = useContext(Context)
  const userid = useParams()
  const id = useParams()
  const { solicitudProfile, profile } = store
  const [loading, setLoading] = useState(false)


  const load = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    actions.getSolicitudProfile(userid.userid, id.id)
    actions.profile()
    load()
  }, [])

  const handleEmail = async () => {
    const email = {
      subject: `Solicitud de Jire aplicada por ${profile[0]?.name} ${profile[0]?.lastname}`,
      to: solicitudProfile[0]?.email,
      email: profile[0]?.email,
      phone: profile[1]?.phone,
      offer_title: solicitudProfile[2]?.title
    }
    let response = await actions.offerEmail(email)
    if (response == 200) {
      Swal.fire({
        title: "Perfecto!",
        text: "Se envio un mail de contacto con tu informacion de contacto al solicitante",
        icon: "success"
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Intentalo mas tarde"
      })
    }
  }

  return (
    <>
      {loading ? <Loader /> :
        <div className='container'>
          <div className='row justify-content-center'>
            <div className="col-12 col-md-8">
              <div className="card mb-3">
                <div className="detalle">
                  <img src={solicitudProfile[2]?.images == null ? JireLogo : solicitudProfile[2]?.images} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Solicitud de trabajo: {solicitudProfile[2]?.title}</h5>
                  <p className="card-text">{solicitudProfile[2]?.description}</p>
                  <p className="card-text">Categoria: {solicitudProfile[2]?.category}</p>
                  <p className="card-text">Tipo de Servicio: {solicitudProfile[2]?.service}</p>
                  <p className="card-text">{solicitudProfile[2]?.address}, {solicitudProfile[2]?.city}, {solicitudProfile[2]?.state}, {solicitudProfile[2]?.country} </p>
                  <h5 className='card-title'>Datos del solicitante</h5>
                  <p className="card-text"><i className="fa-solid fa-user mx-2"></i>{solicitudProfile[0]?.name} {solicitudProfile[0]?.lastname}</p>
                  <p className="card-text"><i className="fa-solid fa-envelope mx-2"></i>{solicitudProfile[0]?.email}</p>
                  <p className="card-text"><i className="fa-solid fa-phone mx-2"></i>{solicitudProfile[1]?.phone}</p>
                  <p className="card-text"><i className="fa-solid fa-briefcase mx-2"></i>{solicitudProfile[1]?.description}</p>
                  <p className="card-text"><i className="fa-solid fa-location-dot mx-2"></i>{solicitudProfile[1]?.address}, {solicitudProfile[1]?.city}, {solicitudProfile[1]?.state}, {solicitudProfile[1]?.country} </p>
                  <button className='btn btn-primary' onClick={handleEmail}>Quiero aplicar a esta solicitud</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </>


  )
}

export default DetailSolicitud