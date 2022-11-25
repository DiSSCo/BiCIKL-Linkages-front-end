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
import TaxonDetails from './components/TaxonDetails';
import GraphLayout from './components/GraphLayout';


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
    const [chosenTaxon, setChosenTaxon] = useState(results['Input'][0]);

    /* Handle filter */
    const [filter, setFilter] = useState({});
    const [filteredPredictedTaxa, setFilteredPredictedTaxa] = useState(results['Predicted']);

    const observedCount = results['Observed'].length;

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
            results['Predicted'].forEach((taxon, i) => {
                for (const [key, value] of Object.entries(filter)) {
                    if (value.length === 2) {
                        if (taxon['confidence'] >= value[0] && taxon['confidence'] <= value[1]) {
                            taxon['taxonNo'] = observedCount + i + 2;

                            newFilteredPredictedTaxa.push(taxon);
                        }
                    } else {
                        if (taxon['confidence'] === value[0] || taxon['confidence'] === 'Unknown') {
                            taxon['taxonNo'] = observedCount + i + 2;

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

    /* Table or Graph lay-out */
    const [chosenLayout, setChosenLayout] = useState({
        table: 'active',
        graph: ''
    });

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
                            <Col className="col-md-auto">
                                <Row>
                                    <Col className={`results_layoutOption ${chosenLayout['table']} py-1`}
                                        onClick={() => setChosenLayout({table: 'active', graph: ''})}
                                    >
                                        Table
                                    </Col>
                                    <Col className={`results_layoutOption ${chosenLayout['graph']} py-1`}
                                        onClick={() => setChosenLayout({table: '', graph: 'active'})}
                                    >
                                        Graph
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {chosenLayout['table'] ?
                            <>
                                <Row className="mt-4" style={{ height: '50%' }}>
                                    <Col md={{ span: 9 }} className="h-100">
                                        <Row>
                                            <Col>
                                                <TaxonTable taxonData={results['Input']}
                                                    formData={formData}
                                                    chosenTaxon={chosenTaxon}

                                                    SetChosenTaxon={(taxon) => setChosenTaxon(taxon)}
                                                />
                                            </Col>
                                        </Row>

                                        {formData['taxonB'].length === 0 &&
                                            <Row className="mt-1" style={{ height: '70%' }}>
                                                <Col className="h-100">
                                                    <ObservedTable observedTaxa={results['Observed']}
                                                        chosenTaxon={chosenTaxon}

                                                        SetChosenTaxon={(taxon) => setChosenTaxon(taxon)}
                                                    />
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                    <Col md={{ span: 3 }} className="h-100 pt-4 pb-2">
                                        <TaxonDetails taxon={chosenTaxon} />
                                    </Col>
                                </Row>


                                <Row className="mt-1" style={{ height: '34%' }}>
                                    <Col md={{ span: 9 }} className="h-100">
                                        <PredictedTable predictedTaxa={filteredPredictedTaxa}
                                            observedCount={observedCount}
                                            chosenTaxon={chosenTaxon}

                                            SetChosenTaxon={(taxon) => setChosenTaxon(taxon)}
                                        />
                                    </Col>
                                    <Col md={{ span: 3 }}>
                                        <PredictedLegend filter={filter}
                                            Filter={(index, range) => Filter(index, range)}
                                        />
                                    </Col>
                                </Row>
                            </>
                            : <Row className="h-75">
                                <Col className="h-100">
                                    <GraphLayout results={results} 
                                        formData={formData}
                                    />
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Results;