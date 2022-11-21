import { Row, Col } from 'react-bootstrap';


const QueryForm = (props) => {
    const form = props.form;

    function RenderSubmitButton() {
        if (!props.searching) {
            return (
                <button type="submit"
                    className="home_queryFormSubmit py-1 px-3"
                    onClick={() => {props.SubmitForm(); props.SetSearching()}}
                >
                    Search
                </button>
            );
        } else {
            return (
                <button type="submit"
                    className="home_queryFormSubmit py-1 px-3"
                >
                    <span className="spinner-border spinner-border-sm me-2" />

                    Searching...
                </button>
            );
        }
    }

    return (
        <Row>
            <Col md={{ span: 10, offset: 1 }}>
                <Row>
                    <Col className="text-center fw-bold">
                        Query
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={{ span: 4 }}>
                        Taxon 1
                    </Col>
                    <Col md={{ span: 4 }}>
                        Interaction
                    </Col>
                    <Col md={{ span: 4 }}>
                        Taxon 2 (optional)
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={{ span: 4 }}>
                        <input className="home_queryFormField w-100"
                            onChange={(input) => props.UpdateForm('taxonA', input.target.value)}
                        />
                    </Col>
                    <Col md={{ span: 4 }}>
                        <select className="home_queryFormField w-100"
                            defaultValue={form['interaction']}
                            onChange={(option) => props.UpdateForm('interaction', option.target.value)}
                        >
                            <option value="pollinatorOf">
                                Pollinates
                            </option>
                            <option value="pollinatedBy">
                                Pollinated by
                            </option>
                            <option value="predatorOf">
                                Predator of
                            </option>
                            <option value="predatedBy">
                                Predated by
                            </option>
                            <option value="parasitizes">
                                Parasitizes
                            </option>
                            <option value="parasitizedBy">
                                Parasitized by
                            </option>
                        </select>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <input className="home_queryFormField w-100"
                            onChange={(input) => props.UpdateForm('taxonB', input.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        {RenderSubmitButton()}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default QueryForm;