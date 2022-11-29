import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './home.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';
import QueryForm from './components/queryForm/QueryForm';

/* Import API */
import Predict from 'api/predict/Predict';
import PredictInteraction from 'api/predict/PredictInteraction';
import GetInteractions from 'api/interactions/GetInteractions';


const Home = () => {
    const navigate = useNavigate();

    const [searching, setSearching] = useState(false);

    /* Get Interaction Types */
    const [interactionTypes, setInteractionTypes] = useState([]);

    useEffect(() => {
        GetInteractions(Process);

        function Process(result) {
            setInteractionTypes(result['Interactions']);
        }
    }, [])
    

    /* Form Handling */
    const [formIndication, setFormIndication] = useState();

    useEffect(() => {
        if (formIndication) {
            setTimeout(() => {
                setFormIndication();
            }, 3000);
        }
    }, [formIndication])

    function CheckForm(formData) {
        if (!formData['taxonA']) {
            setFormIndication('active');

            return false;
        } else {
            return true;
        }
    }

    function SubmitForm(formData) {
        if (CheckForm(formData)) {
            setSearching(true);

            if (formData['taxonB'].length > 0) {
                const request_body = {
                    relation: formData['interaction'],
                    is_subject: true,
                    taxon_id: formData['taxonA'],
                    check: formData['taxonB'],
                    confidence: 0
                }

                Predict(request_body, Process);
            } else {
                PredictInteraction(formData, Process);
            }

            function Process(result) {
                navigate('/results', {
                    state: {
                        results: result,
                        formData: formData
                    }
                });
            }
        }
    }

    return (
        <div>
            <Header />

            <Container>
                <Row className="mt-5">
                    <Col md={{ span: 10, offset: 1 }}>
                        <QueryForm  searching={searching}
                            interactionTypes={interactionTypes}
                            formIndication={formIndication}

                            SubmitForm={(formData) => SubmitForm(formData)}
                            SetSearching={() => setSearching(true)}
                        />
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Home;