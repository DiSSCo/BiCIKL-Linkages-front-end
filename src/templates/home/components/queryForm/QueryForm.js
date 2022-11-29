import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';


const QueryForm = (props) => {
    const formIndication = props.formIndication;
    const interactionTypes = props.interactionTypes;

    /* Handling adding multiple taxas in field B */
    const [taxonB, setTaxonB] = useState('');
    const [taxaBFields, setTaxaBFields] = useState([]);

    useEffect(() => {
        props.UpdateForm('taxonB', taxaBFields);
    }, [taxaBFields]);

    function AddTaxonBField() {
        setTaxaBFields(current => [...current, taxonB]);
        setTaxonB('');
    }

    function RemoveTaxonBField(index) {
        let copyTaxonBFields = [...taxaBFields];

        copyTaxonBFields.splice(index, 1);

        setTaxaBFields(copyTaxonBFields);
    }

    /* Function for rendering the Interaction Types as select options */
    function RenderInteractionOptions() {
        const interactionOptions = [];

        Object.entries(interactionTypes).forEach((interactionTypeList) => {
            interactionTypeList[1].forEach((interactionType, i) => {
                interactionOptions.push(
                    <option key={interactionTypeList[0] + i} value={interactionType[0]}>
                        {interactionType[1]}
                    </option>
                );
            });
        });

        return interactionOptions;
    }

    /* Function for rendering the Submit Button */
    function RenderSubmitButton() {
        if (!props.searching) {
            return (
                <button type="submit"
                    className="home_queryFormSubmit py-1 px-3"
                    onClick={() => props.SubmitForm()}
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
                        Compare to taxa (optional)
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={{ span: 4 }} className="position-relative justify-content-center d-flex">
                        <input className="home_queryFormField w-100 px-1"
                            onChange={(input) => props.UpdateForm('taxonA', input.target.value)}
                        />

                        <div className={`home_queryFormWarning ${formIndication} w-75 text-center fw-bold p-1`}> Please insert a taxon id </div>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <select className="home_queryFormField w-100"
                            onChange={(option) => props.UpdateForm('interaction', option.target.value)}
                        >
                            {RenderInteractionOptions()}
                        </select>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <Row>
                            <Col className="pe-0">
                                <input className="home_queryFormField taxonB w-100 px-1"
                                    value={taxonB}
                                    onChange={(input) => setTaxonB(input.target.value)}
                                />
                            </Col>
                            <Col className="col-md-auto p-0">
                                <button className="home_addTaxonButton text-white fw-bold px-2 h-100"
                                    onClick={() => AddTaxonBField()}
                                >
                                    +
                                </button>
                            </Col>
                        </Row>

                        {taxaBFields.map((taxon, i) => {
                            return (
                                <Row key={i} className="mt-1">
                                    <Col className="pe-0">
                                        <div className="home_taxonBRow px-1">
                                            {taxon}
                                        </div>
                                    </Col>
                                    <Col className="col-md-auto p-0">
                                        <button className="home_addTaxonButton text-white fw-bold h-100"
                                            onClick={() => RemoveTaxonBField(i)}
                                        >
                                            -
                                        </button>
                                    </Col>
                                </Row>
                            );
                        })}
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