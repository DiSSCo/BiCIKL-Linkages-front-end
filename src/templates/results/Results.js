import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import './results.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';
import TaxonTable from './components/TaxonTable';
import ObservedTable from './components/ObservedTable';
import PredictedTable from './components/PredictedTable';
import PredictedLegend from './components/PredictedLegend';


const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();

    /* Fetch results from location state, if not, redirect to Home */
    const results = location.state.results;

    useEffect(() => {
        if (Object.keys(results).length === 0) {
            navigate('/');
        }
    }, []);

    const formData = location.state.formData;

    /* Handle filter */
    const [filter, setFilter] = useState({});
    const [filteredPredictedTaxa, setFilteredPredictedTaxa] = useState(results['Predicted']);

    function Filter(index, range) {
        const copyFilter = { ...filter };

        if (!filter[index]) {
            copyFilter[index] = range;
        } else {
            delete copyFilter[index];
        }

        setFilter(copyFilter);
    }

    useEffect(() => {
        let newFilteredPredictedTaxa = [];

        if (Object.keys(filter).length > 0) {
            results['Predicted'].forEach(taxon => {
                for (const [key, value] of Object.entries(filter)) {
                    if (value.length === 2) {
                        if (taxon['confidence'] >= value[0] && taxon['confidence'] <= value[1]) {
                            newFilteredPredictedTaxa.push(taxon);
                        }
                    } else {
                        if (taxon['confidence'] === value[0]) {
                            newFilteredPredictedTaxa.push(taxon);
                        }
                    }
                }
            });
        } else {
            newFilteredPredictedTaxa = results['Predicted'];
        }

        setFilteredPredictedTaxa(newFilteredPredictedTaxa);
    }, [filter]);

    return (
        <div className="h-100">
            <Header />

            <Container className="results_body">
                <Row className="h-100">
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <Row className="mt-5">
                            <Col className="fw-bold">
                                Results
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={{ span: 9 }}>
                                <TaxonTable taxonData={results['Input']}
                                    formData={formData}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3" style={{ height: '34%' }}>
                            <Col md={{ span: 9 }} className="h-100">
                                <ObservedTable observedTaxa={results['Observed']} />
                            </Col>
                        </Row>
                        <Row className="mt-3" style={{ height: '34%' }}>
                            <Col md={{ span: 9 }} className="h-100">
                                <PredictedTable predictedTaxa={filteredPredictedTaxa}
                                    observedCount={results['Observed'].length}
                                />
                            </Col>
                            <Col md={{ span: 3 }}>
                                <PredictedLegend filter={filter}
                                    Filter={(index, range) => Filter(index, range)}
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

export default Results;