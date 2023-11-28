import React, {useContext, useEffect} from "react"
import { Context } from "../store/appContext"

export const Solicitudes = () =>{
    const {store, actions} = useContext(Context)
    
    useEffect(() =>{
        actions.getSolicitudes()
    }, [])

    return(
        <>
        
        </>
    )
}