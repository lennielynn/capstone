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
        await deleteDoc(doc(db, 'favCars', id))
    }

    
    return (
         <div id="account-pg">
            <button
            onClick={handleLogout}
            className='button'
            > LOGOUT</button>
         
          <div id='cards'>
            {cars.map((car) => {
              return(
             <div id='card'>
              <Row>
              {Array.from({ length: cars.length - cars.length / 2 }).map((_, idx) => (
                  <Col key={idx}>
                  <Card>
                      <Card.Img variant="top" src="" alt='' />
                      <Card.Body>
                      <Card.Title>{`${car.make} ${car.model}`}</Card.Title><br/>
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
                      onClick={removeCar}
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