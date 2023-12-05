import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PersonalInfo } from "../component/personalInfo";
import { ProfessionalInfo } from "../component/professionalInfo";
import { UserInfo } from "../component/userInfo";

export const Profile = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.profile(store.token)
    }, [])
    return (
        <>
        <div className="container my-3">
            <h1>Completa tu perfil</h1>
            <div className="my-3">
            <UserInfo/>
            </div>
            <div className="my-3">
            <PersonalInfo/>
            </div>
            <div className="d-flex  my-3">
            <ProfessionalInfo/>
            </div>
 
        </div>
        </>
    )
}