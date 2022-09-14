import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';





const VinylForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    // const [created, setCreated] = useState(false);
    // const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});

    useEffect(() => {
    // eslint-disable-next-line
    }, [])

    const [vinyl, setVinyl] = useState({
        title : "", 
        artist : "", 
        description : "", 
        owned : false, 
        genres : ["", "", ""]
    }); 


    const createVinyl = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/vinyls/', {
            title : vinyl.title,
            artist :  vinyl.artist,
            description : vinyl.description,
            owned : vinyl.owned,
            genres : vinyl.genres

        })
            .then(res => {
                console.log(res);
                setErrorsObj({});
                navigate("/albums");

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

    const handleChange = (e) => {
        setVinyl({...vinyl, [e.target.name] : e.target.value});
    }

    const  handleGenre = (e, i) => {
        // deep copy
        let tempGenres = JSON.parse(JSON.stringify(vinyl.genres)); 
        tempGenres[i] = e.target.value;
        setVinyl({ ...vinyl, genres : tempGenres});
    }
    const handleCheck = (e) => {
        setVinyl({...vinyl, owned : !vinyl.owned});
    }

    // const refreshComponent = () => {
    //     setVinyl({
    //         title : "", 
    //         artist : "", 
    //         description : "", 
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
                        <h4 className="card-header p-4">About Your Vinyl</h4>
                        <div className="card-body">
                            <form onSubmit={createVinyl}>
                                <div className="mb-2">
                                    <label className="form-label">Album Title</label><br />
                                    <input
                                        type="text"
                                        placeholder='Vinyl name'
                                        name="title"
                                        value={vinyl.title}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.title ? "border-danger" : "" }`} />
                                        
                                    { errorsObj.title ? 
                                            <span className="form-text text-danger">
                                            {errorsObj.title}
                                            </span> 
                                        : <></> }
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">artist</label><br />
                                    <input
                                        type = "text"
                                        placeholder='artist'
                                        name="artist"
                                        value={vinyl.artist}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.artist ? "border-danger" : "" }`} />
                                    { errorsObj.artist ? <span className="form-text text-danger">{errorsObj.artist}</span> : <></> }
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">owned</label><br />
                                    {/* <input
                                        type="checkbox"
                                        name="owned"
                                        checked = {vinyl.owned}
                                        onChange={handleCheck}
                                        className='form-control'/> */}
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        checked = {vinyl.owned}
                                        onChange={handleCheck}
                                        />
                                </div>


                                {/* <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Default checkbox
                                        </label>
                                </div> */}

                                
                                <div className="mb-2">
                                    <label className="form-label">description</label><br />
                                    <textarea
                                        placeholder='description'
                                        name="description"
                                        value={vinyl.description}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.description ? "border-danger" : "" }`} />
                                    { errorsObj.description ? <span className="form-text text-danger">{errorsObj.description}</span> : <></> }
                                </div>

                                <div className="d-flex gap-3 justify-content-center">
                                            <div className="mb-3">
                                                <label className="form-label text-white">genre 1</label><br />
                                                <input
                                                    type="text"
                                                    value={vinyl.genres[0]}
                                                    onChange={(e) => (handleGenre(e, 0))}
                                                    className="form-control mb-1" />
                                                <div className="d-flex justify-content-center">
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">genre 2</label><br />
                                                <input
                                                    type="text"
                                                    value={vinyl.genres[1]}
                                                    onChange={(e) => (handleGenre(e, 1))}
                                                    className="form-control mb-1" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">genre 3</label><br />
                                                <input
                                                    type="text"
                                                    value={vinyl.genres[2]}
                                                    onChange={(e) => (handleGenre(e, 2))}
                                                    className="form-control mb-1" />
                                            </div>

                                        </div>
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

export default VinylForm;