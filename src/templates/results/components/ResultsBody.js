/* Import Dependencies */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import QueryBuilder from "templates/queryBuilder/QueryBuilder";
import ObservedTable from './ObservedTable';
import PredictedTable from './PredictedTable';
import PredictedLegend from './PredictedLegend';
import TaxonDetails from './TaxonDetails';
import GraphLayout from './GraphLayout';


const ResultsBody = (props) => {
    const { results, formData, SetBackdrop } = props;

    const navigate = useNavigate();

    const [chosenTaxon, setChosenTaxon] = useState(results['input'][0]);

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

    /* Handle filter */
    const [filter, setFilter] = useState({});
    const [filteredPredictedTaxa, setFilteredPredictedTaxa] = useState(results['predicted']);

    const observedCount = results['observed'].length;

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
            results['predicted'].forEach((taxon, i) => {
                for (const [, value] of Object.entries(filter)) {
                    const check = CheckConfidence(taxon, value, i);

                    if (check) {
                        newFilteredPredictedTaxa.push(check);
                    }
                }
            });
        } else {
            newFilteredPredictedTaxa = results['predicted'];
        }

        setFilteredPredictedTaxa(newFilteredPredictedTaxa);
    }, [filter, results, CheckConfidence]);

    /* Table or Graph lay-out */
    const [chosenLayout, setChosenLayout] = useState({
        table: 'active',
        graph: ''
    });

    return (
        <Container fluid className="results_body">
            <Row className="h-100">
                <Col md={{ span: 10, offset: 1 }} className="h-100">
                    <Row className="mt-5">
                        <Col md={{ span: 5 }} className="position-relative">
                            <div className="position-absolute w-100">
                                <QueryBuilder errorMessage={errorMessage}
                                    formData={formData}

                                    SubmitAction={(results, formData) => HandleSubmit(results, formData)}
                                    SetBackdrop={(bool) => SetBackdrop(bool)}
                                />
                            </div>
                        </Col>

                        <Col className="col-md-auto ms-4">
                            <Row>
                                <Col className={`results_layoutOption col-md-auto ${chosenLayout['table']} py-2 px-3`}
                                    onClick={() => setChosenLayout({ table: 'active', graph: '' })}
                                >
                                    Table Mode
                                </Col>
                                <Col className={`results_layoutOption col-md-auto ${chosenLayout['graph']} py-2 px-3`}
                                    onClick={() => setChosenLayout({ table: '', graph: 'active' })}
                                >
                                    Graph Mode
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {chosenLayout['table'] ?
                        <div className="results_tableMargin h-100">
                            <Row className="mt-4" style={{ height: '35%' }}>
                                <Col md={{ span: 2 }} className="h-100">
                                    <TaxonDetails taxon={chosenTaxon} />
                                </Col>
                                <Col md={{ span: 7 }} className="h-100">
                                    <Row className="mt-1" style={{ height: '100%' }}>
                                        <Col className="h-100">
                                            <ObservedTable observedTaxa={results['observed']}
                                                chosenTaxon={chosenTaxon}

                                                SetChosenTaxon={(taxon) => setChosenTaxon(taxon)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mt-1" style={{ height: '34%' }}>
                                <Col md={{ span: 2 }}>
                                    <PredictedLegend filter={filter}
                                        Filter={(index, range) => Filter(index, range)}
                                    />
                                </Col>
                                <Col md={{ span: 7 }} className="h-100">
                                    <PredictedTable predictedTaxa={filteredPredictedTaxa}
                                        observedCount={observedCount}
                                        chosenTaxon={chosenTaxon}

                                        SetChosenTaxon={(taxon) => setChosenTaxon(taxon)}
                                    />
                                </Col>
                            </Row>
                        </div>
                        : <Row className="h-75">
                            <Col className="h-100 results_graphMargin">
                        
                                    <GraphLayout results={results}
                                        formData={formData}
                                    />
                                
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default ResultsBody;