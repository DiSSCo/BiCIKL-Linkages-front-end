import { Row, Col, Table } from 'react-bootstrap';


const ObservedTable = (props) => {
    const observedTaxa = props.observedTaxa;

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row className="results_titleBar">
                    <Col className="results_titleBarSub col-md-auto fw-bold h-100">
                        Observed interactions
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
                                    <th className="results_alignmentTableItem"> Confidence score </th>
                                </tr>
                            </thead>
                            <tbody className="results_tbody">
                                {observedTaxa.map((taxon, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {`Taxon ${i + 2}`}
                                            </td>
                                            <td>
                                                {taxon['taxon_id']}
                                            </td>
                                            <td>
                                                {taxon['sci_name']}
                                            </td>
                                            <td className="fw-bold">
                                                Missing
                                            </td>
                                            <td />
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ObservedTable;