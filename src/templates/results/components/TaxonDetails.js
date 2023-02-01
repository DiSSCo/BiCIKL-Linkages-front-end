import { Row, Col, Card } from 'react-bootstrap';


const TaxonDetails = (props) => {
    const taxon = props.taxon;

    return (
        <Row className="h-100">
            <Col className="mt-1">
                <Card className="results_taxonDetailsBody px-3 pb-4">
                    <Row className="mt-2">
                        <Col className="results_taxonDetailsTitle fw-bold">
                            Selected taxon details
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={{ span: 1 }} className="position-relative">
                            <div className="results_taxonDetailsStripe h-100" />
                        </Col>
                        <Col>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 position-relative d-flex align-items-center">
                                    <span className=" fst-italic">
                                        Taxon id:
                                    </span>

                                    {` ${taxon['taxon_id']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 d-flex align-items-center">
                                    <span className="fst-italic">
                                        Scientific name:
                                    </span>

                                    {` ${taxon['sci_name']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 d-flex align-items-center">
                                    <span className="fst-italic">
                                        Kingdom:
                                    </span>

                                    {` ${taxon['kingdom']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 d-flex align-items-center">
                                    <span className="fst-italic">
                                        Phylum:
                                    </span>

                                    {` ${taxon['phylum']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 d-flex align-items-center">
                                    <span className="fst-italic">
                                        Order:
                                    </span>

                                    {` ${taxon['ord']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 d-flex align-items-center">
                                    <span className="fst-italic">
                                        Family:
                                    </span>

                                    {` ${taxon['fam']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 d-flex align-items-center">
                                    <span className="fst-italic">
                                        Genus:
                                    </span>

                                    {` ${taxon['genus']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="results_taxonDetailsItem py-1 d-flex align-items-center">
                                    <span className="fst-italic">
                                        Species:
                                    </span>

                                    {` ${taxon['species']}`}

                                    <div className="results_taxonDetailsSubStripe position-absolute" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}

export default TaxonDetails;