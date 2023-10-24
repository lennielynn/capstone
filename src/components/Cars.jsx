import { useState } from "react";
import { apiKey } from '../secrets';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Cars = () => {
    const [formData, setFormData] = useState('');
    const [carDetails, setCarDetails] = useState({
       year: '',
       make: '',
       model: '',
       class: '',
       cylinders: ''
    });

    //get form input data
    const getInputData = (formData) => {
        const [ make, model] = formData.split(' ');
        getApiData( make, model);
    }

    //get api data
    const getApiData = async ( make, model) => {
        const res = await fetch('https://api.api-ninjas.com/v1/cars?model='+ model, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey }
        });

        if(res.ok) {
            const data = await res.json();
            console.log(data[0].cylinders)
            setCarDetails({
                year: data[0].year,
                make: data[0].make,
                model: data[0].model,
                class: data[0].class,
                cylinders: data[0].cylinders
            });
        } else {window.alert('Bad Requet')}
    }


    const setCarPhoto = () => {
        if (carDetails.model === 'challenger'){
            const link = "/Cars/CH6.jpeg"
            return ( link )
        } else if (carDetails.model === 'supra') {
            const link = "/Cars/supra.jpg"
            return ( link )
        } else if (carDetails.model === 'mustang') {
            const link = "/Cars/mustang.jpeg"
            return ( link )
    }}

    //display data/car form
    return (
         <div id="car-search-pg">
            <div className="car-search">
                <h1>CAR SEARCH</h1>
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    getInputData(formData);
                    }}> 
                    <label htmlFor="car-input">INPUT CAR</label><br/><br/>
                    <input 
                        id="car-input"
                        onChange={(e) => setFormData(e.target.value)} 
                        className="car-input" type="text" 
                        placeholder="i.e. Toyota 4Runner" 
                    /><br/><br/>
                    <input id="submit-button" type="submit" value="SEARCH" />
                </form>
            </div>
            <div id="car-display">
                <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" src={`${setCarPhoto()}`}/>
                <Card.Body>
                <Card.Title>{`${carDetails.make} ${carDetails.model}`}</Card.Title>
                    <Card.Text></Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{`Year: ${carDetails.year}`}</ListGroup.Item>
                    <ListGroup.Item>{`Cylinders: ${carDetails.cylinders} `}</ListGroup.Item>
                    <ListGroup.Item>{`Class: ${carDetails.class}`}</ListGroup.Item>
                </ListGroup>
                <button id="car-button"> favorite</button>
                </Card>
            </div>

       </div>
    ); 
}

export default Cars