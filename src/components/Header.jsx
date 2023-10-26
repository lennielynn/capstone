import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {


    return (
        <Navbar collapseOnSelect expand="lg" className="navbar">
          <Container id='nav'>
            <Navbar.Brand id="brand" href="/">THE GARAGE</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">HOME</Nav.Link>
                <Nav.Link href="/account">ACCOUNT</Nav.Link>
                <Nav.Link href="/signin">SIGN IN</Nav.Link>
                <Nav.Link href="/cars">CARS</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }

export default Header