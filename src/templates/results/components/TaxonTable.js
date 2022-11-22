import { Row, Col, Table } from 'react-bootstrap';


const TaxonTable = (props) => {
    const taxonData = props.taxonData[0];
    const formData = props.formData;

    const interactionTypes = {
        pollinatorOf: 'Pollinates',
        pollinatedBy: 'Pollinated by',
        predatorOf: 'Predator of',
        predatedBy: 'Predated by',
        parasitizes: 'Parasitizes',
        parasitizedBy: 'Parasitized by'
    }

    return (
        <Row>
            <Col>
                <Table striped className="results_table">
                    <thead className="results_thead">
                        <tr>
                            <th>
                                Source taxon
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
                                Type of interaction
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Taxon 1
                            </td>
                            <td>
                                {taxonData['taxon_id']}
                            </td>
                            <td>
                                {taxonData['sci_name']}
                            </td>
                            <td className="fw-bold">
                                Missing
                            </td>
                            <td>
                                {interactionTypes[formData['interaction']]}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default TaxonTable;