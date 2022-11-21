import { Row, Col } from 'react-bootstrap';


const TaxonTable = (props) => {
    const taxonData = props.taxonData;
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
                <table class="results_table table table-striped">
                    <thead className="results_thead">
                        <tr>
                            <th>
                                Source taxon
                            </th>
                            <th>
                                Taxon key
                            </th>
                            <th>
                                Kingdom
                            </th>
                            <th>
                                Phylum
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
                                {formData['taxonA']}
                            </td>
                            <td>
                                {taxonData[0]}
                            </td>
                            <td>
                                {taxonData[1]}
                            </td>
                            <td className="fw-bold">
                                Missing
                            </td>
                            <td>
                                {interactionTypes[formData['interaction']]}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Col>
        </Row>
    );
}

export default TaxonTable;