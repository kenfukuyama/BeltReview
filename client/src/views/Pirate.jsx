
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';

const Pirate = () => {
    const [pirate, setPirate] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/pirates/' + id)
            .then(res => {
                console.log(res.data);
                setPirate(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);



    const toggleThings  = (e, i) => {
        let tempThings = [...pirate.things]
        
        tempThings[i] = !tempThings[i]
        setPirate({ ...pirate, things : tempThings});

        axios.put('http://localhost:8000/api/pirates/' + pirate._id, {
            name : pirate.name, 
            imgURL : pirate.imgURL, 
            phrase : pirate.phrase, 
            numChests : pirate.numChests, 
            position : pirate.position,
            things : tempThings
        })

    }


    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                        {pirate && 
                        <div className="fade-in card bg-transparent mt-3" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY: "scroll", height: "93vh" }}>
                            <h2 className="card-title">
                                {pirate.name}
                            </h2>
                            <div className="card-body">
                                <img className="card-img-top my-4" src={pirate.imgURL} alt="Pirate" style={{ width: "100px" }} />
                                <h5 className="card-subtitle">"{pirate.phrase}"</h5>
                                <p className="mt-3">Position : {pirate.position}</p>
                                <p className="">Treasures : {pirate.numChests}</p>

                                <div className="mb-3">
                                    <div className="mb-2">Peg Leg : {pirate.things[0] ? "Yes" : "No"}</div>
                                    <div>
                                        {pirate.things[0] ?
                                        <button className="btn btn-outline-danger" onClick={e => toggleThings(e, 0)}>No</button>
                                        :
                                        <button className="btn btn-outline-success" onClick={e => toggleThings(e, 0)}>Yes</button>
                                        }
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-2">Eye Patch : {pirate.things[1] ? "Yes" : "No"}</div>
                                    <div>
                                        {pirate.things[1] ?
                                        <button className="btn btn-outline-danger" onClick={e => toggleThings(e, 1)}>No</button>
                                        :
                                        <button className="btn btn-outline-success" onClick={e => toggleThings(e, 1)}>Yes</button>
                                        }
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-2">Hook Hand: {pirate.things[2] ? "Yes" : "No"}</div>
                                    <div>
                                        {pirate.things[2] ?
                                        <button className="btn btn-outline-danger" onClick={e => toggleThings(e, 2)}>No</button>
                                        :
                                        <button className="btn btn-outline-success" onClick={e => toggleThings(e, 2)}>Yes</button>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pirate