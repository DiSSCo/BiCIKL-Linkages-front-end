import { Row, Col, Table, Card } from 'react-bootstrap';


const PredictedTable = (props) => {
    const predictedTaxa = props.predictedTaxa;
    const observedCount = props.observedCount;
    const chosenTaxon = props.chosenTaxon;

    function CheckConfidence(confidence) {
        let confidenceClass;

        if (confidence <= 1 && confidence >= 0.95) {
            confidenceClass = 'high';
        } else if (confidence <= 0.949 && confidence >= 0.7) {
            confidenceClass = 'good';
        } else if (confidence <= 0.699 && confidence >= 0.5) {
            confidenceClass = 'medium';
        } else if (confidence <= 0.499 && confidence >= 0.3) {
            confidenceClass = 'low';
        } else if (confidence <= 0.299 && confidence >= 0.01) {
            confidenceClass = 'very_low';
        } else {
            confidenceClass = 'none';
        }

        return confidenceClass;
    }

    function RenderTaxaRows() {
        const taxaRows = [];

        if (predictedTaxa.length > 0) {
            predictedTaxa.forEach((taxon, i) => {
                let confidence = taxon['confidence'];

                const confidenceClass = CheckConfidence(confidence);

                let activeClass;

                if (chosenTaxon['taxon_id'] === taxon['taxon_id']) {
                    activeClass = 'active';
                }

                taxaRows.push(
                    <tr key={i}
                        className={`results_tableRow ${activeClass}`}
                        onClick={() => props.SetChosenTaxon(taxon)}
                    >
                        <td>
                            {taxon['taxonNo'] ?
                                <> {`Taxon ${taxon['taxonNo']}`} </>
                                : <> {`Taxon ${observedCount + i + 2}`} </>
                            }
                        </td>
                        <td>
                            <a href={`https://www.gbif.org/species/${taxon['taxon_id']}`} rel="noreferrer" target='_blank'>
                                {taxon['taxon_id']}
                            </a>
                        </td>
                        <td>
                            {taxon['sci_name']}
                        </td>
                        <td>
                            {taxon['fam']}
                        </td>
                        <td className={`results_predictedColumn ${confidenceClass}`}>
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
                <Row className="results_tableSection">
                    <Col className="h-100">
                        <Card className="p-0 m-0 h-100">
                            <Table striped className="results_table m-0 h-100 bg-white">
                                <thead className="results_thead">
                                    <tr>
                                        <th>
                                            Predicted taxa
                                        </th>
                                        <th>
                                            Taxon key
                                        </th>
                                        <th>
                                            Scientific name
                                        </th>
                                        <th>
                                            Family
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
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PredictedTable;