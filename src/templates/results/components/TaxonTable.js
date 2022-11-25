import { Row, Col, Table } from 'react-bootstrap';


const TaxonTable = (props) => {
    const taxonData = props.taxonData[0];
    const formData = props.formData;
    const chosenTaxon = props.chosenTaxon;

    const interactionTypes = {
        pollinatorOf: 'Pollinates',
        pollinatedBy: 'Pollinated by',
        predatorOf: 'Predator of',
        predatedBy: 'Predated by',
        parasitizes: 'Parasitizes',
        parasitizedBy: 'Parasitized by'
    }

    let activeClass;

    if (chosenTaxon['taxon_id'] === taxonData['taxon_id']) {
        activeClass = 'active';
    }

    return (
        <Row>
            <Col>
                <Row className="results_titleBar">
                    <Col className="results_titleBarSub col-md-auto fw-bold h-100">
                        Base taxon
                    </Col>
                </Row>
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
                                        Family
                                    </th>
                                    <th>
                                        Type of interaction
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={`results_tableRow ${activeClass}`}
                                    onClick={() => props.SetChosenTaxon(taxonData)}
                                >
                                    <td>
                                        Taxon 1
                                    </td>
                                    <td>
                                        <a href={`https://www.gbif.org/species/${taxonData['taxon_id']}`} target='_blank'>
                                            {taxonData['taxon_id']}
                                        </a>
                                    </td>
                                    <td>
                                        {taxonData['sci_name']}
                                    </td>
                                    <td>
                                        {taxonData['fam']}
                                    </td>
                                    <td>
                                        {interactionTypes[formData['interaction']]}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TaxonTable;