import { Container, Row, Col } from 'react-bootstrap';
import './header.scss';

/* Import Media */
import BiciklLogo from 'webroot/img/bicikl_logo.svg';


const Header = () => {
    return (
        <Container fluid className="header">
            <Row className="h-100">
                <Col className="logo h-100 col-md-auto ms-4 mt-2">
                    <a href="https://bicikl-project.eu" rel="noreferrer" target="_blank">
                        <img src={BiciklLogo}
                            alt="BiCIKL logo"
                            className="h-100 p-3"
                        />
                    </a>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;