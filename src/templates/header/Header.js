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
                        <Col className="header_logo h-100 col-md-auto">
                            <a href="https://bicikl-project.eu" rel="noreferrer" target="_blank">
                                <img src={BiciklLogo}
                                    alt="BiCIKL logo"
                                    className="h-100 p-3"
                                />
                            </a>
                        </Col>
                        <Col className="header_titleBar position-absolute text-center pt-3">
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