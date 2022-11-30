import { Formik, Field, Form, FieldArray } from "formik";
import { Row, Col } from 'react-bootstrap';


const QueryForm = (props) => {
    const { formIndication, interactionTypes } = props;

    /* Function for rendering the Interaction Types as select options */
    function RenderInteractionOptions(setInteractionType) {
        const interactionOptions = [];

        Object.entries(interactionTypes).forEach((interactionTypeList) => {
            interactionTypeList[1].forEach((interactionType, i) => {
                interactionOptions.push(
                    <option key={interactionTypeList[0] + i} value={interactionType[0]}
                        onClick={() => setInteractionType(interactionTypeList[0])}
                    >
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
                <button className="home_queryFormSubmit py-1 px-3"
                    type="submit"
                >
                    Search
                </button>
            );
        } else {
            return (
                <button type="button"
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
                <Formik
                    initialValues={{
                        taxonA: "",
                        interaction: '',
                        interactionType: '',
                        dummyTaxon: "",
                        taxonB: []
                    }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 500));

                        props.SubmitForm(values);
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <Row className="mt-2">
                                <Col md={{ span: 4 }} className="position-relative justify-content-center d-flex">
                                    <Field name="taxonA" type="text"
                                        className="home_queryFormField w-100 px-1"
                                    />

                                    <div className={`home_queryFormWarning ${formIndication} w-75 text-center fw-bold p-1`}> Please insert a taxon id </div>
                                </Col>
                                <Col md={{ span: 4 }}>
                                    <Field name="interaction" as="select"
                                        className="home_queryFormField w-100"
                                    >
                                        <option value=''>
                                            Choose interaction
                                        </option>

                                        {RenderInteractionOptions((interactionType) => { console.log('test'); values.interactionType = interactionType })}
                                    </Field>
                                </Col>
                                <Col md={{ span: 4 }}>
                                    <FieldArray name="taxonB">
                                        {({ remove, push }) => (
                                            <>
                                                <Row>
                                                    <Col className="pe-0">
                                                        <Field className="home_queryFormField taxonB w-100 px-1"
                                                            name="dummyTaxon"
                                                        />
                                                    </Col>
                                                    <Col className="col-md-auto p-0">
                                                        <button className="home_addTaxonButton text-white fw-bold px-2 h-100"
                                                            type="button"
                                                            onClick={() => { push(values.dummyTaxon); values.dummyTaxon = '' }}
                                                        >
                                                            +
                                                        </button>
                                                    </Col>
                                                </Row>

                                                {values.taxonB.length > 0 &&
                                                    values.taxonB.map((taxon, i) => {
                                                        return (
                                                            <Row key={i} className="mt-1">
                                                                <Col className="pe-0">
                                                                    <Field name={`taxonB.${i}`} type="text"
                                                                        className="home_queryFormField taxonB w-100 px-1"
                                                                        value={taxon}
                                                                    />
                                                                </Col>
                                                                <Col className="col-md-auto p-0">
                                                                    <button className="home_addTaxonButton text-white fw-bold h-100"
                                                                        type="button"
                                                                        onClick={() => remove(i)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                </Col>
                                                            </Row>
                                                        );
                                                    })
                                                }
                                            </>
                                        )}
                                    </FieldArray>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col className="d-flex justify-content-center">
                                    {RenderSubmitButton()}
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}

export default QueryForm;