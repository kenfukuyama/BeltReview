import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';





const VinylForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    const {loggedinInfo} = useContext(LoggedinContext);
    const [created, setCreated] = useState(false);
    // const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 
    // eslint-disable-next-line
    }, [])
    

    const getToday = () => {
        let MyDate = new Date();
        let MyDateString;
        MyDateString = + MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) +  '-' + ('0' + MyDate.getDate()).slice(-2);
        return MyDateString;
    }

    const [vinyl, setVinyl] = useState({
        title : "", 
        artist : "",
        description : "", 
        owned : false, 
        genres : []
    }); 


    const createVinyl = (e) => {
        e.prvinylDefault();

        let vinylStartTimeDate = new Date();
        vinylStartTimeDate.setHours(vinyl.startTime.substring(0, 2), vinyl.startTime.substring(3, 5));
        let vinylEndTimeDate = new Date();
        vinylEndTimeDate.setHours(vinyl.endTime.substring(0, 2), vinyl.endTime.substring(3, 5));

        axios.post('http://localhost:8000/api/vinyls/', {
            name : vinyl.name,
            description: vinyl.description,
            vinylDate: vinyl.vinylDate,
            startTime: vinylStartTimeDate,
            endTime: vinylEndTimeDate,
            place: vinyl.place,
            userId : vinyl.userId

        })
            .then(res => {
                console.log(res);
                setCreated(true);
                // setErrors([]);
                setErrorsObj({});
                // navigate("/myvinyls");

            })
            .catch(err => {
                console.log(err);
                const errResponse = err.response.data.errors;
                // const errArr = [];
                const errObj = {};
                // for (const key of Object.keys(errResponse)) {
                //     let obj = {};
                //     obj[key] = errResponse[key].message;
                //     errArr.push(obj);
                //     // Another way
                //     // errArr.push({[key] : errResponse[key].message});
                // }
                // setErrors(errArr);

                for (const key in errResponse) {
                    // if (!errObj[key]) {
                    errObj[key] = [errResponse[key].message];
                    // } else {
                    //     errObj[key].push(errResponse[key].message);
                    // }
                }
                setErrorsObj(errObj);


            });
    }

    const handleChange = (e) => {
        if ([e.target.name] === 'startTime' || [e.target.name] === 'endTime') {
            console.log("it's start time or EndTime")
            console.log(e.target.value.substring(0, 2) + " hour")
            console.log(e.target.value.substring(3, 5) + " minutes")


        }

        setVinyl({...vinyl, [e.target.name] : e.target.value});
    }


    const refreshComponent = () => {
        setVinyl({
            name: "",
            vinylDate: getToday(),
            description: "",
            startTime: "18:00",
            endTime: "19:00",
            place: "",
            userId : loggedinInfo.loggedinId
        });
        setCreated(false);
    };


    return (
        <div>
            <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-7 col-lg-8 col-xl-7">
                    <div className="card bg-transparent text-white" style={{overflowY : "overflow", maxHeight: "93vh"}}>
                        <h4 className="card-header p-4">About Your Vinyl</h4>
                        <div className="card-body">
                            <form onSubmit={createVinyl}>
                                {/* {errors && errors.map((error, i) => {
                                    return <p className="text-danger" key={i}>{error}</p>
                                })} */}
                                <div className="mb-2">
                                    <label className="form-label">Name</label><br />
                                    <input
                                        type="text"
                                        placeholder='Vinyl name'
                                        name="name"
                                        value={vinyl.name}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.name ? "border-danger" : "" }`} />
                                        
                                    { errorsObj.name ? 
                                            <span className="form-text text-danger">
                                            {errorsObj.name}
                                            </span> 
                                        : <></> }
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Description</label><br />
                                    <textarea
                                        placeholder='Description'
                                        name="description"
                                        value={vinyl.description}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.description ? "border-danger" : "" }`} />
                                    { errorsObj.description ? <span className="form-text text-danger">{errorsObj.description}</span> : <></> }
                                </div>
                                <div className="mb-2 center">
                                    <label className="form-label">Vinyl Date</label><br />
                                    <input
                                        type="date"
                                        name="vinylDate"
                                        value={vinyl.vinylDate}
                                        onChange={handleChange}
                                        required
                                        className={`form-control ${errorsObj.vinylDate ? "border-danger" : "" }`} />
                                    { errorsObj.vinylDate ? <span className="form-text text-danger">{errorsObj.vinylDate}</span> : <></> }
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Start Time</label><br />
                                    <input type="time"
                                        id="startTime" 
                                        name="startTime" 
                                        value={vinyl.startTime}
                                        onChange={handleChange}
                                        required
                                        className={`form-control ${errorsObj.startTime ? "border-danger" : "" }`} />
                                        { errorsObj.startTime ? <span className="form-text text-danger">{errorsObj.startTime}</span> : <></> }
                                </div>


                                <div className="mb-2">
                                    <label className="form-label">End Time</label><br />
                                    <input type="time"
                                        id="endTime" 
                                        name="endTime" 
                                        value={vinyl.endTime}
                                        onChange={handleChange}
                                        required
                                        className={`form-control ${errorsObj.endTime ? "border-danger" : "" }`} />
                                        { errorsObj.endTime ? <span className="form-text text-danger">{errorsObj.endTime}</span> : <></> }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Location</label><br />
                                    <input
                                        type="text"
                                        placeholder='Location'
                                        name="place"
                                        value={vinyl.place}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.place ? "border-danger" : "" }`} />
                                        { errorsObj.place ? <span className="form-text text-danger">{errorsObj.place}</span> : <></> }
                                </div>

                                {created ? (<div className="div"><p>✓ Vinyl Posted</p> <button className="btn btn-outline-info" onClick={refreshComponent}>Create Another Vinyl</button></div> ): <input type="submit" className="btn btn-outline-primary" />}
                                
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

export default VinylForm;