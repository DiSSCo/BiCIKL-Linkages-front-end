import { Row, Col, Table } from 'react-bootstrap';


const PredictedTable = (props) => {
    const predictedTaxa = props.predictedTaxa;
    const observedCount = props.observedCount;

    function RenderTaxaRows() {
        const taxaRows = [];

        if (predictedTaxa.length > 0) {
            let i = 0;

            predictedTaxa.forEach((taxon, i) => {
                taxaRows.push(
                    <tr key={i}>
                        <td>
                            {`Taxon ${i + observedCount + 2}`}
                        </td>
                        <td>
                            {taxon['taxon_key']}
                        </td>
                        <td>
                            {taxon['sci_name']}
                        </td>
                        <td className="fw-bold">
                            Missing
                        </td>
                        <td>
                            {taxon['confidence']}
                        </td>
                    </tr>
                );
            });
        } else {
            taxaRows.push(
                <tr key={0}>
                    <td>
                        No taxa found for filter
                    </td>
                    <td /><td /><td /><td />
                </tr>
            );
        }

        return taxaRows;
    }

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row className="results_titleBar">
                    <Col className="results_titleBarSub col-md-auto fw-bold h-100">
                        Predicted interactions
                    </Col>
                </Row>

                <Row className="results_tableSection">
                    <Col className="h-100">
                        <Table striped className="results_table h-100">
                            <thead className="results_thead">
                                <tr>
                                    <th>
                                        Target taxon
                                    </th>
                                    <th>
                                        Taxon key
                                    </th>
                                    <th>
                                        Scientific name
                                    </th>
                                    <th>
                                        Country of occurence
                                    </th>
                                    <th>
                                        Confidence score
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="results_tbody">
                                {RenderTaxaRows()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PredictedTable;