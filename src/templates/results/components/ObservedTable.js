import { Row, Col, Table } from 'react-bootstrap';


const ObservedTable = (props) => {
    const observedTaxa = props.observedTaxa;
    const chosenTaxon = props.chosenTaxon;

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
                                        Family
                                    </th>
                                    <th className="results_alignmentTableItem"> Confidence score </th>
                                </tr>
                            </thead>
                            <tbody className="results_tbody">
                                {observedTaxa.length > 0 ? observedTaxa.map((taxon, i) => {
                                    let activeClass;

                                    if (chosenTaxon['taxon_id'] === taxon['taxon_id']) {
                                        activeClass = 'active';
                                    }

                                    return (
                                        <tr key={i}
                                            className={`results_tableRow ${activeClass}`}
                                            onClick={() => props.SetChosenTaxon(taxon)}
                                        >
                                            <td>
                                                {`Taxon ${i + 2}`}
                                            </td>
                                            <td>
                                                <a href={`https://www.gbif.org/species/${taxon['taxon_id']}`} target='_blank'>
                                                    {taxon['taxon_id']}
                                                </a>
                                            </td>
                                            <td>
                                                {taxon['sci_name']}
                                            </td>
                                            <td>
                                                {taxon['fam']}
                                            </td>
                                            <td />
                                        </tr>
                                    );
                                })
                                    : <tr>
                                        <td>
                                            No observations found
                                        </td> <td /> <td /> <td /> <td />
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ObservedTable;