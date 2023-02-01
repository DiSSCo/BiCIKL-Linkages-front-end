import { Row, Col, Table, Card } from 'react-bootstrap';


const ObservedTable = (props) => {
    const observedTaxa = props.observedTaxa;
    const chosenTaxon = props.chosenTaxon;

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
                                            Observed taxa
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
                                                {/* <td /> */}
                                            </tr>
                                        );
                                    })
                                        : <tr>
                                            <td>
                                                No observations found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ObservedTable;