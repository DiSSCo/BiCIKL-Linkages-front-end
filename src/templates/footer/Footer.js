import { Container, Row, Col } from 'react-bootstrap';
import './footer.scss';

/* Import Media */
import NaturalisLogo from 'webroot/img/naturalis_logo.png';
import EULogo from 'webroot/img/eu_logo.jpg';


const Footer = () => {
    return (
        <Container fluid className="footer position-fixed bottom-0 start-0 end-0">
            <Row className="h-100">
                <Col className="col-md-auto h-100 d-flex align-items-center ms-5">
                    <a href="https://www.naturalis.nl/en" rel="noreferrer" target="_blank" className="h-75 w-100">
                        <img src={NaturalisLogo} alt="Naturalis logo" className="h-100" />
                    </a>
                </Col>
                <Col className="col-md-auto h-100 d-flex align-items-center">
                    <img src={EULogo} alt="EU logo" className="h-75" />
                </Col>
                <Col className="footer_text d-flex align-items-center">
                    Developed in the BiCIKL project with funding from the European Union's Horizon 2020 <br />
                    Research and Innovation Action under grant agreement ID: 101007492
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;