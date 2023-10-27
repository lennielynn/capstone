import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveCircle } from "react-icons/md"
import { db } from '../firebase';
import { GrEdit } from 'react-icons/gr';
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  doc,
  where,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

const Account = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
    const [cars, setCars] = useState([])
    const [editFormData, setEditFormData] = useState(null);
    const [editingCarId, setEditingCarID] = useState(null);
  


    function titleCase(astring) {
      let output = ''
      const wordsArray = astring.split(' ')
      for (const word of wordsArray) {
        output += word[0].toUpperCase() + word.substring(1) + ' '
      }
      return output.trim()
    }

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
          console.log('You are logged out');
        } catch (e) {
          console.log(e.message);
        }
    };

    useEffect(() => {
        if (user && user.uid) {
          const q = query(collection(db, 'favCars'), where('userID', '==', user.uid));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let favoriteCarArr = [];
            querySnapshot.forEach((car) => {
              favoriteCarArr.push({ ...car.data(), id: car.id });
            });
            setCars(favoriteCarArr);
          });
          return () => unsubscribe;
        } 
    }, [user]);

    const handleEditInputChange = (e) => {
      const { name, value } = e.target;
      setEditFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    // start editing function
    const startEditing = (car) => {
      setEditFormData({
        make: car.make,
        model: car.model,
        year: car.year,
        class: car.class,
        cylinders: car.cylinders,
      });
      setEditingCarID(car.id);
    };


    const updateCar = async () => {
      if (editingCarId) {
        const carRef = doc(db, 'favCars', editingCarId);
        await updateDoc(carRef, {
          make: editFormData.make,
          model:editFormData.model,
          year: editFormData.year,
          class:editFormData.class,
          cylinders: editFormData.cylinders,
        });
        setEditingCarID(null);
        setEditFormData(null);
      }
    };


      const removeCar = async (id) => {
        await deleteDoc(doc(db, 'favCars', id));
    };

    const setCarPhoto = (car) => {
      if (car.model === 'challenger'){
          const link = "/Cars/08challenger.webp"
          return ( link )
      } else if (car.model === 'supra') {
          const link = "/Cars/supra.jpg"
          return ( link )
      } else if (car.model === 'mustang') {
          const link = "/Cars/mustang.jpeg"
          return ( link )
  }}


    return (
         <div id="account-pg">
            <button
            onClick={handleLogout}
            className='button'
            id='logout-btn'
            > LOGOUT</button>
          <h2>FAVORITES</h2>
          <hr/>
          <div id='cards'>
            {cars.map((car) => {
              const isEditingThisCar = editingCarId === car.id;
            
              return(
             <div id='card' key={car.id}> 
              <Row>
              {Array.from({ length: 1 }).map((_, idx) => (
                  <Col key={idx}>
                  <Card>
                      <Card.Img variant="top" src={setCarPhoto(car)}/>
                      <Card.Body>
                      <Card.Title>{`${titleCase(car.make)} ${titleCase(car.model)}`}</Card.Title><br/>
                      <Card.Text>
                          {`Year: ${car.year}`}
                      </Card.Text>
                      <Card.Text>
                          {`Class: ${car.class}`}
                      </Card.Text>
                      <Card.Text>
                          {` Cylinders: ${car.cylinders}`}
                         
                      </Card.Text>
                      </Card.Body>
                      <button 
                      onClick={() =>removeCar(car.id)}
                      id='remove'>
                        <MdOutlineRemoveCircle  size={30}/>
                      </button>
                      <button 
                      id='edit-btn'
                      onClick={() => startEditing(car)}>
                        <GrEdit size={30} />
                      </button>
                  </Card>
                  </Col>
              ))}
              </Row>
                {isEditingThisCar && (
                    <div className='mt-4' id='edit-form'>
                      <h3>Input Car Info</h3>
                      <input
                        value={editFormData.make}
                        onChange={handleEditInputChange}
                        className='border p-2 w-full text-xl'
                        type='text'
                        placeholder='Enter Car Make'
                        name='make'
                      />
                      <input
                        value={editFormData.model}
                        onChange={handleEditInputChange}
                        className='border p-2 w-full text-xl'
                        type='text'
                        placeholder='Enter Car Model'
                        name='model'
                      />
                      <input
                        value={editFormData.year}
                        onChange={handleEditInputChange}
                        className='border p-2 w-full text-xl'
                        type='number'
                        placeholder='Enter Car Year'
                        name='year'
                      />
                      <input
                        value={editFormData.class}
                        onChange={handleEditInputChange}
                        className='border p-2 w-full text-xl'
                        type='text'
                        placeholder='Enter Car class'
                        name='class'
                      />
                      <input
                        value={editFormData.cylinders}
                        onChange={handleEditInputChange}
                        className='border p-2 w-full text-xl'
                        type='number'
                        placeholder='Enter Car Cylinders'
                        name='cylinders'
                      />
                      <button
                        id='update-btn'
                        onClick={() => updateCar(car.id)}
                      >Update Car
                      </button>
                    </div>
                )}

              </div>
          )})}
          </div>
          
             
          
        </div> 
    );

}

export default Account