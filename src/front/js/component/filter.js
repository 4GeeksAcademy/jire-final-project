import React, {useContext} from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo-jire.png"
import { Link } from "react-router-dom";

const Filter = (props) => {
    const { store, actions } = useContext(Context)

    return (
        <>
            <div className='container my-4'>
                <div className='col'>
                    <div className='row d-flex'>
                        {props.filters.map((item) => {
                            return (
                                <div className="card mx-3 my-3" key={item.id} style={{ width: '18rem' }}>
                                    <img src={item.images == null ? logo : item.images} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">{item.city}, {item.country}</p>
                                        <Link to={`/offerdetail/${item.user_id}/${item.id}`}>
                                            <button className='btn btn-primary'>Ver Mas</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter;