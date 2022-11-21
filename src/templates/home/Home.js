import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './home.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';
import QueryForm from './components/queryForm/QueryForm';

/* Import API */
import Predict from 'api/predict/Predict';


const Home = () => {
    const navigate = useNavigate();

    const [searching, setSearching] = useState(false);

    /* Form Handling */
    const [form, setForm] = useState({
        interaction: 'pollinatedBy'
    });

    function UpdateForm(field, value) {
        const copyForm = { ...form };

        copyForm[[field]] = value;

        setForm(copyForm);
    }

    function SubmitForm() {
        Predict(form, Process);

        function Process(result) {
            navigate('/results', {
                state: {
                    results: result,
                    formData: form
                }
            });
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