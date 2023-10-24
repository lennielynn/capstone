import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Account = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();



    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
          console.log('You are logged out');
        } catch (e) {
          console.log(e.message);
        }
      };

    return (
         <div>
            <button
            onClick={handleLogout}
            id = "logout-button"
            > LOGOUT</button>


            <Row xs={1} md={2} className="g-4">
            {
            Array.from({ length: 4 }).map((_, idx) => (
                <Col key={idx}>
                <Card>
                    <Card.Img variant="top" src="../Cars/Challenger/ch7.jpeg" alt='' />
                    <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
    );

}
export default Account