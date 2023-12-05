import React, {useContext} from "react";
import { Context } from "../store/appContext";

export const UserInfo = () => {
    const {store, actions} = useContext(Context)
    return (
        <>
            <div className="d-flex justify-content-between">
                <p className="mt-2">
                    Nombre y Apellido*
                </p>
                <div className="d-flex">
                    <input type="text" className="form-control mx-1" placeholder="Nombre"></input>
                    <input type="text" className="form-control" placeholder="Apellido"></input>
                </div>
            </div>
        </>
    )
}