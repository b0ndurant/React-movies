import React from 'react';

const FormSearch = ({ submitForm, value }) => {
    return (
        <form onSubmit={submitForm} >
            <div className="form-row align-items-center">

                <div className="col-auto">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><i className="fas fa-search"></i></div>
                        </div>
                        <input type="text" className="form-control" name="movieName" defaultValue={value} placeholder="Votre titre de film" />
                    </div>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-2">Chercher</button>
                </div>
            </div>
        </form>
    );
}

export default FormSearch;