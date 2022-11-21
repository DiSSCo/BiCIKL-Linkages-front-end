import { Container, Row, Col } from 'react-bootstrap';
import './header.scss';

/* Import Media */
import BiciklLogo from 'webroot/img/bicikl_logo.svg';


const Header = () => {
    return (
        <Container className="header">
            <Row className="h-100">
                <Col md={{ span: 10, offset: 1 }} className="h-100">
                    <Row className="h-100 position-relative">
                        <Col md={{ span: 3 }} className="h-100">
                            <img src={BiciklLogo}
                                alt="BiCIKL logo"
                                className="h-100 p-3" 
                            />
                        </Col>
                        <Col className="position-absolute text-center pt-3">
                            <Row>
                                <Col className="fw-bold">
                                    BiCIKL
                                </Col>
                            </Row>
                            <Row>
                                <Col className="fw-bold">
                                    Biotic Interactions Browser
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;