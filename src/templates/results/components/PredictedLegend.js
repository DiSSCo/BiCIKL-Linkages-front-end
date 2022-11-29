import { Row, Col } from 'react-bootstrap';


const PredictedLegend = (props) => {
    const filter = props.filter;

    /* Check filters */
    const activeFilters = {};

    Object.entries(filter).forEach((f) => {
        activeFilters[[f[0]]] = 'active';
    });

    return (
        <Row className="h-100">
            <Col className="results_legend">
                <Row className="mt-2">
                    <Col className="fw-bold mx-2">
                        Legend
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className={`results_legendItem ${activeFilters[1]} mx-2`}
                        onClick={() => props.Filter(1, [0.95, 1])}
                    >
                        <div className="results_legendIndication one me-2" />
                        {`Confidence score >= 0.95`}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col className={`results_legendItem ${activeFilters[2]} mx-2`}
                        onClick={() => props.Filter(2, [0.7, 0.949])}
                    >
                        <div className="results_legendIndication two me-2" />
                        {`Confidence score > 0.7`}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col className={`results_legendItem ${activeFilters[3]} mx-2`}
                        onClick={() => props.Filter(3, [0.5, 0.699])}
                    >
                        <div className="results_legendIndication three me-2" />
                        {`Confidence score > 0.5`}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col className={`results_legendItem ${activeFilters[4]} mx-2`}
                        onClick={() => props.Filter(4, [0.3, 0.499])}
                    >
                        <div className="results_legendIndication four me-2" />
                        {`Confidence score > 0.3`}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col className={`results_legendItem ${activeFilters[5]} mx-2`}
                        onClick={() => props.Filter(5, [0.01, 0.299])}
                    >
                        <div className="results_legendIndication five me-2" />
                        {`Confidence score < 0.3`}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col className={`results_legendItem ${activeFilters[6]} mx-2`}
                        onClick={() => props.Filter(6, [0])}
                    >
                        <div className="results_legendIndication six me-2" />
                        {`Confidence score 0`}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PredictedLegend;