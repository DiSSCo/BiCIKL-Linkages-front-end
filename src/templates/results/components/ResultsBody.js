import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';
import TaxonTable from './TaxonTable';
import ObservedTable from './ObservedTable';
import PredictedTable from './PredictedTable';
import PredictedLegend from './PredictedLegend';
import TaxonDetails from './TaxonDetails';
import GraphLayout from './GraphLayout';


const ResultsBody = (props) => {
    const { results, formData } = props;

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

    const CheckConfidence = useCallback((taxon, value, i) => {
        if (value.length === 2) {
            if (taxon['confidence'] >= value[0] && taxon['confidence'] <= value[1]) {
                taxon['taxonNo'] = observedCount + i + 2;

                return taxon;
            } else {
                return false;
            }
        } else {
            if (taxon['confidence'] === value[0] || taxon['confidence'] === 'Unknown') {
                taxon['taxonNo'] = observedCount + i + 2;

                return taxon;
            } else {
                return false;
            }
        }
    }, [observedCount]);

    useEffect(() => {
        let newFilteredPredictedTaxa = [];

        if (Object.keys(filter).length > 0) {
            results['Predicted'].forEach((taxon, i) => {
                for (const [, value] of Object.entries(filter)) {
                    const check = CheckConfidence(taxon, value, i);

                    if (check) {
                        newFilteredPredictedTaxa.push(check);
                    }
                }
            });
        } else {
            newFilteredPredictedTaxa = results['Predicted'];
        }

        setFilteredPredictedTaxa(newFilteredPredictedTaxa);
    }, [filter, results, CheckConfidence]);

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
                                {`Results / ${formData['interaction']}`}
                            </Col>
                            <Col className="col-md-auto">
                                <Row>
                                    <Col className={`results_layoutOption ${chosenLayout['table']} py-1`}
                                        onClick={() => setChosenLayout({ table: 'active', graph: '' })}
                                    >
                                        Table
                                    </Col>
                                    <Col className={`results_layoutOption ${chosenLayout['graph']} py-1`}
                                        onClick={() => setChosenLayout({ table: '', graph: 'active' })}
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

export default ResultsBody;