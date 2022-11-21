import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import './results.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';
import TaxonTable from './components/TaxonTable';


const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();

    /* Fetch results from location state, if not, redirect to Home */
    const results = location.state.results;

    if (Object.keys(results).length === 0) {
        navigate('/');
    } else {
        console.log(results);

        const formData = location.state.formData;

        return (
            <div>
                <Header />

                <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <Row className="mt-5">
                                <Col className="fw-bold">
                                    Results
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col>
                                    <TaxonTable taxonData={results['Input']} 
                                        formData={formData}
                                    />                               
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <Footer />
            </div>
        );
    }
}

export default Results;