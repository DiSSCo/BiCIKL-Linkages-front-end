/* Import Dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './home.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';
import Instructions from './components/instuctions/Instructions';
import QueryBuilder from '../queryBuilder/QueryBuilder';


const Home = () => {
    const navigate = useNavigate();

    /* Query Builder */
    const [errorMessage, setErrorMessage] = useState();

    function HandleSubmit(results, formData) {
        if (results) {
            navigate('/results', {
                state: {
                    results: results,
                    formData: formData
                }
            });
        } else {
            setErrorMessage('Something went wrong, please try again')
        }
    }

    return (
        <div className="h-100">
            <div className="main_bg">
                <Header />

                <Container fluid>
                    <Row className="mt-5">
                        <Col md={{ span: 4, offset: 1 }}>
                            <Instructions />
                        </Col>
                        <Col md={{ span: 5 }}>
                            <Row>
                                <Col md={{ span: 10, offset: 1 }}>
                                    <QueryBuilder errorMessage={errorMessage}
                                        SubmitAction={(results, formData) => HandleSubmit(results, formData)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>


            </div>
            <div className="main_footer">
                <Footer />
            </div>
        </div>
    );
}

export default Home;