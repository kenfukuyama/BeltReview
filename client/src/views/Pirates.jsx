


import axios from 'axios'
import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import EventsFilter from '../components/EventsFilter'
import {LoggedinContext} from '../context/LoggedinContext';


const Pirates = () => {
    const {loggedinInfo} = useContext(LoggedinContext);
    const navigate = useNavigate();
    const piratesRef = useRef(null);
    const [filter, setFilter] = useState("");
    const [pirates, setPirates] = useState([]);

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }
        axios.get('http://localhost:8000/api/pirates')
            .then(res => {
                console.log(res.data);
                piratesRef.current = JSON.parse(JSON.stringify(res.data));
                setPirates(res.data);
            })
            .catch(err => console.error(err));
    }, [loggedinInfo.loggedin, navigate]);


    useEffect(() => {
        if (filter === "SortByName") {
            let tempArr = JSON.parse(JSON.stringify(piratesRef.current));
            tempArr.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
            setPirates(tempArr);
        }

        if (filter === "Reset") {
            setPirates(piratesRef.current);
        }


    }, [filter]);

    const deletePirate = (e, id) => {
        console.log(id);
        axios.delete('http://localhost:8000/api/pirates/' + id);
        let tempPirates = pirates.filter(pirate => pirate._id !== id);
        setPirates(tempPirates);
        piratesRef.current = tempPirates;
    }

    


    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                        <div className="fade-in card bg-transparent" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY: "scroll", height: "93vh" }}>
                            
                            
                            <h3>Pirate Crew</h3>
                            <button className="btn btn-outline-primary w-100 my-3" onClick={() => navigate('/pirates/new')}>
                                Add a New Pirate
                            </button>
                            <div className="d-flex justify-content-center">
                                <EventsFilter setFilter={setFilter}/>
                            </div>

                            {pirates && pirates.map((pirate, i) => {
                                return (
                                    <div className="row" key={i}>
                                        <div className="card">
                                            <h3 className="card-title">
                                                {pirate.name}
                                            </h3>
                                            <div className="card-body">
                                                <img className="card-img-top my-2" src={pirate.imgURL} alt="Pirate" style={{width : "100px"}}/>
                                                <div className="card-subtitle">"{pirate.phrase}"</div>
                                                <div className="d-flex justify-content-around">
                                                    <button className="btn btn-outline-info" onClick={(e) => navigate(`/pirates/${pirate._id}`)}>View {pirate.name}</button>
                                                    <button className="btn btn-outline-danger" onClick={(e) => deletePirate(e, pirate._id)}>Walk the Plank</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Pirates