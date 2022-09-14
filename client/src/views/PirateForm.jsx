import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const PirateForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    // const [created, setCreated] = useState(false);
    // const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});

    // # array for years
        const positionChoices = [
            "Captain",
            "First Mate",
            "Quater Master", 
            "Boatswain", 
            "Powder Monkey"
        ]

    useEffect(() => {
    // eslint-disable-next-line
    }, [])

    const [pirate, setPirate] = useState({
        name : "", 
        imgURL : "", 
        phrase : "", 
        numChests : "", 
        position : "",
        things : [true, true, true]
    }); 


    const createPirate = (e) => {
        e.preventDefault();

        if ( pirate.position === "Captain") {
            axios.get('http://localhost:8000/api/pirates/get/checkCaptain')
            .then( res => {
                if (res.data) {
                    setErrorsObj({position : "Only one captain is allowed"});
                    return;
                }
                else {
                    axios.post('http://localhost:8000/api/pirates/', {
                        name: pirate.name,
                        imgURL: pirate.imgURL,
                        phrase: pirate.phrase,
                        numChests: pirate.numChests,
                        position: pirate.position,
                        things: pirate.things

                    })
                        .then(res => {
                            console.log(res);
                            setErrorsObj({});
                            // * navigate to current creted one
                            navigate(`/pirates/${res.data._id}`);

                        })
                        .catch(err => {
                            console.log(err);
                            const errResponse = err.response.data.errors;
                            const errObj = {};
                            for (const key in errResponse) {
                                errObj[key] = [errResponse[key].message];
                            }
                            setErrorsObj(errObj);
                        });
                }
            })

        } else {
            axios.post('http://localhost:8000/api/pirates/', {
            name : pirate.name, 
            imgURL : pirate.imgURL, 
            phrase : pirate.phrase, 
            numChests : pirate.numChests, 
            position : pirate.position,
            things : pirate.things

        })
            .then(res => {
                console.log(res);
                setErrorsObj({});
                // * navigate to current creted one
                navigate(`/pirates/${res.data._id}`);

            })
            .catch(err => {
                console.log(err);
                const errResponse = err.response.data.errors;
                const errObj = {};
                for (const key in errResponse) {
                    errObj[key] = [errResponse[key].message];
                }
                setErrorsObj(errObj);
            });
        }

        
    }

    const handleChange = (e) => {
        if (!e.target.value) {
            setErrorsObj({...errorsObj, [e.target.name] : "This field is required"});
        }
        setPirate({...pirate, [e.target.name] : e.target.value});
    }

    const  handleThings = (e, i) => {
        // deep copy
        let tempThings = [...pirate.things]
        
        tempThings[i] = !tempThings[i]
        console.log(tempThings);
        setPirate({ ...pirate, things : tempThings});
    }
    // const handleCheck = (e) => {
    //     setPirate({...pirate, owned : !pirate.owned});
    // }

    // const refreshComponent = () => {
    //     setPirate({
    //         title : "", 
    //         imgURL : "", 
    //         phrase : "", 
    //         owned : false, 
    //         genres : []
    //     });
    //     setCreated(false);
    // };


    return (
        <div>
            <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-7 col-lg-8 col-xl-7">
                    <div className="card bg-transparent text-white" style={{overflowY : "overflow", maxHeight: "93vh"}}>
                        <h4 className="card-header p-4">About Your Pirate</h4>
                        <button className="btn btn-success" onClick={(e) => {navigate("/pirates")}}>Crew Board</button>
                        <div className="card-body">
                            <form onSubmit={createPirate}>
                                <div className="mb-2">
                                    <label className="form-label">Pirate Name</label><br />
                                    <input
                                        type="text"
                                        placeholder='pirate name'
                                        name="name"
                                        value={pirate.name}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.name ? "border-danger" : "" }`} />
                                        
                                    { errorsObj.name ? 
                                            <span className="form-text text-danger">
                                            {errorsObj.name}
                                            </span> 
                                        : <></> }
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">imgURL</label><br />
                                    <input
                                        type = "text"
                                        placeholder='provide image url for pirate'
                                        name="imgURL"
                                        value={pirate.imgURL}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.imgURL ? "border-danger" : "" }`} />
                                    { errorsObj.imgURL ? <span className="form-text text-danger">{errorsObj.imgURL}</span> : <></> }
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Number of Treasure Chests</label><br />
                                    <input
                                        type = "number"
                                        placeholder='num of chests'
                                        name="numChests"
                                        value={pirate.numChests}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.numChests ? "border-danger" : "" }`} />
                                    { errorsObj.numChests ? <span className="form-text text-danger">{errorsObj.numChests}</span> : <></> }
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Pirate Catch Phrase</label><br />
                                    <textarea
                                        placeholder='phrase'
                                        name="phrase"
                                        value={pirate.phrase}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.phrase ? "border-danger" : "" }`} />
                                    { errorsObj.phrase ? <span className="form-text text-danger">{errorsObj.phrase}</span> : <></> }
                                </div>

                                <div className="mb-2">
                                    <label className="form-label text-white">Crew Position</label><br />
                                    <select 
                                        name="position" 
                                        className={`form-control ${errorsObj.phrase ? "border-danger" : "" }`} 
                                        onChange={handleChange} defaultValue = {pirate.position}>
                                            <option value="">Choose the Position</option>
                                            { positionChoices.map((position, i) => {
                                            return <option key={i} value={position}>{position}</option>
                                            })}
                                    </select>
                                    { errorsObj.position ? <span className="form-text text-danger">{errorsObj.position}</span> : <></> }
                                </div>

                                {/* <div className="mb-2">
                                    <label className="form-label">owned</label><br /> */}
                                    {/* <input
                                        type="checkbox"
                                        name="owned"
                                        checked = {pirate.owned}
                                        onChange={handleCheck}
                                        className='form-control'/> */} 
                                    {/* <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        checked = {pirate.owned}
                                        onChange={handleCheck}
                                        />
                                {/* </div> */}

                                            <div className="mb-3">
                                                <label className="form-label text-white">Peg Leg</label><br />
                                                <input
                                                    type="checkbox"
                                                    name="leg"
                                                    checked = {pirate.things[0]}
                                                    onChange={(e) => handleThings(e, 0)}
                                                    className="form-check-input" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">Eye Patch</label><br />
                                                <input
                                                    type="checkbox"
                                                    name="eye"
                                                    checked = {pirate.things[1]}
                                                    onChange={(e) => handleThings(e, 1)}
                                                    className="form-check-input" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">Hook Hand</label><br />
                                                <input
                                                    type="checkbox"
                                                    name="hook"
                                                    checked = {pirate.things[2]}
                                                    onChange={(e) => handleThings(e, 2)}
                                                    className="form-check-input" />
                                            </div>

                                <input type="submit" className="btn btn-outline-primary" />
                                
                            </form>

                        </div>
                    </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default PirateForm;