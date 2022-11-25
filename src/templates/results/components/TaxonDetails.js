import { Row, Col } from 'react-bootstrap';


const TaxonDetails = (props) => {
    const taxon = props.taxon;

    return (
        <Row className="h-100">
            <Col className="results_taxonDetailsBody ps-3">
                <Row className="mt-2">
                    <Col className="results_taxonDetailsTitle fw-bold">
                        Selected taxon details
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Taxon id:
                        </span>

                        {` ${taxon['taxon_id']}`}
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Scientific name:
                        </span>

                        {` ${taxon['sci_name']}`}
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Kingdom:
                        </span>

                        {` ${taxon['kingdom']}`}
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Phylum:
                        </span>

                        {` ${taxon['phylum']}`}
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Order:
                        </span>

                        {` ${taxon['ord']}`}
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Family:
                        </span>

                        {` ${taxon['fam']}`}
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Genus:
                        </span>

                        {` ${taxon['genus']}`}
                    </Col>
                </Row>
                <Row>
                    <Col className="py-1">
                        <span className="fst-italic">
                            Species: 
                        </span>

                        {` ${taxon['species']}`}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TaxonDetails;