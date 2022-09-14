


import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import EventsFilter from '../components/EventsFilter'



const Vinyls = () => {
    const navigate = useNavigate();
    const vinylsRef = useRef(null);
    const [vinyls, setVinyls] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/vinyls')
            .then(res => {
                console.log(res.data);
                vinylsRef.current = res.data;
                setVinyls(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                        <div className="fade-in card bg-transparent" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY: "scroll", height: "93vh" }}>
                            
                            
                            <h3>The Vinyl CountDown</h3>
                            <button className="btn btn-outline-primary w-100 my-3" onClick={() => navigate('/albums/new')}>
                                Add a New Record
                            </button>
                            <div className="d-flex justify-content-center">
                                <EventsFilter />
                            </div>

                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Album Title</th>
                                            <th>Artist </th>
                                            <th>Owned </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>                                  
                                            {vinyls && vinyls.map((vinyl, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{vinyl.title}</td>
                                                        <td>{vinyl.artist}</td>
                                                        <td>{vinyl.owned === "true" ? "Yes": "No"}</td>
                                                    </tr>
                                                )

                                            })}
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Vinyls