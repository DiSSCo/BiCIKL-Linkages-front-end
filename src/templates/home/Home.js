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
    const [form, setForm] = useState({
        interaction: 'pollinates',
        taxonB: []
    });
    const [formIndication, setFormIndication] = useState();

    useEffect(() => {
        if (formIndication) {
            setTimeout(() => {
                setFormIndication();
            }, 3000);
        }
    }, [formIndication])

    function UpdateForm(field, value) {
        const copyForm = { ...form };

        copyForm[[field]] = value;

        setForm(copyForm);
    }

    /* Function for checking contents of Query Form */
    function CheckForm() {
        if (!form['taxonA']) {
            setFormIndication('active');

            return false;
        } else {
            return true;
        }
    }

    function SubmitForm() {
        if (CheckForm()) {
            setSearching(true);

            if (form['taxonB'].length > 0) {
                const request_body = {
                    relation: form['interaction'],
                    is_subject: true,
                    taxon_id: form['taxonA'],
                    check: form['taxonB'],
                    confidence: 0
                }

                Predict(request_body, Process);
            } else {
                PredictInteraction(form, Process);
            }

            function Process(result) {
                navigate('/results', {
                    state: {
                        results: result,
                        formData: form
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
                        <QueryForm form={form}
                            searching={searching}
                            formIndication={formIndication}
                            interactionTypes={interactionTypes}

                            UpdateForm={(field, value) => UpdateForm(field, value)}
                            SubmitForm={() => SubmitForm()}
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