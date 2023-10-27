import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveCircle } from "react-icons/md"
import { db } from '../firebase';
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
              return(
             <div id='card'>
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
                  </Card>
                  </Col>
              ))}
              </Row>
              </div>
          )})}
          </div>
        
        </div> 
    );

}

export default Account