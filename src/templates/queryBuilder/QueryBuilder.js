/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from "formik";
import classNames from 'classnames';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Styles s*/
import './queryBuilder.scss';

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import SubmitButton from './SubmitButton';

/* Import API */
import GetInteractions from "api/interactions/GetInteractions";
import Predict from 'api/predict/Predict';
import PredictInteraction from 'api/predict/PredictInteraction';


const QueryBuilder = (props) => {
    const { errorMessage, formData, SubmitAction, SetBackdrop } = props;

    const [searching, setSearching] = useState(false);

    /* Get Interaction Types */
    const [interactionTypes, setInteractionTypes] = useState([]);

    useEffect(() => {
        GetInteractions(Process);

        function Process(result) {
            setInteractionTypes(result['Interactions']);
        }
    }, [])

    /* Function for rendering the Interaction Types as select options */
    function RenderInteractionOptions() {
        const interactionOptions = [];

        Object.entries(interactionTypes).forEach((interactionTypeList) => {
            interactionTypeList[1].forEach((interactionType, i) => {
                const key = `${interactionType[0]}${i}`;

                interactionOptions.push(
                    <option key={key} value={[interactionTypeList[0], interactionType[0]]}>
                        {interactionType[1]}
                    </option>
                );
            });
        });

        return interactionOptions;
    }

    /* Function for toggling the advanced options */
    const [advancedOptions, setAdvancedOptions] = useState(false);

    function ToggleAdvancedOptions() {
        setAdvancedOptions(!advancedOptions);

        if (SetBackdrop) {
            SetBackdrop(!advancedOptions);
        }
    }

    const classAdvancedToggle = classNames({
        'active': advancedOptions
    });

    /* Form validation */
    const validate = (values) => {
        const errors = {};

        if (!values.taxonA) {
            errors.taxonA = 'A taxon id is required';
        }

        return errors;
    };

    /* Handling submit */
    function SubmitForm(formData) {
        setSearching(true);

        formData['interactionType'] = formData['interaction'].substring(0, formData['interaction'].indexOf(","));

        formData['interaction'] = formData['interaction'].split(',')[1];

        if (formData['taxonB'].length > 0) {
            const request_body = {
                relation: formData['interactionType'],
                is_subject: true,
                taxon_id: formData['taxonA'],
                check: formData['taxonB'],
                confidence: 0
            }

            Predict(request_body, (results) => { setSearching(false); SubmitAction(results, formData); });
        } else {
            PredictInteraction(formData, (results) => { setSearching(false); SubmitAction(results, formData); });
        }
    }

    return (
        <Row>
            <Col>
                <Card className="query_builder">
                    <Card.Header>
                        <Row>
                            <Col>
                                Query builder
                            </Col>
                            <Col className="query_advancedToggle col-md-auto"
                                onClick={() => ToggleAdvancedOptions()}
                            >
                                Advanced <FontAwesomeIcon icon={faChevronDown} className={`query_advancedToggleIcon ${classAdvancedToggle}`} />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <p className="query_introText mb-2"> Search for taxa that are: </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 4 }}>
                                <div data-bs-toggle="tooltip" data-bs-placement="top" className="query_formFieldTitle"
                                    title="Choose an option from this list to define an interaction method that will be used to search for interaction 
                                    related taxa (or to compare to the optional taxa)"
                                >
                                    Interaction
                                </div>
                            </Col>
                            <Col md={{ span: 4 }}>
                                <div data-bs-toggle="tooltip" data-bs-placement="top" className="query_formFieldTitle"
                                    title="Use this field to define a base taxon whose interactions will be checked based upon the chosen 
                                    interaction method (and possible other taxa)"
                                >
                                    Taxon
                                </div>
                            </Col>
                        </Row>

                        <Formik
                            initialValues={{
                                taxonA: formData ? formData['taxonA'] : '',
                                interaction: formData ? `${formData['interactionType']},${formData['interaction']}` : 'pollinates,pollinatedBy',
                                dummyTaxon: "",
                                taxonB: formData ? formData['taxonB'] : []
                            }}
                            validate={validate}
                            enableReinitialize
                            onSubmit={async (values) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));

                                SubmitForm(values);
                            }}
                        >
                            {({ values, errors }) => (
                                <Form>
                                    <Row className="mt-2">
                                        <Col md={{ span: 4 }}>
                                            <Field name="interaction" as="select"
                                                className="query_formField w-100 h-100"
                                            >
                                                {RenderInteractionOptions()}
                                            </Field>

                                            <Field name="interactionType" type="hidden" value="pollinates" />
                                        </Col>
                                        <Col md={{ span: 4 }} className="position-relative justify-content-center d-flex">
                                            <Field name="taxonA" type="text"
                                                className="query_formField w-100 px-1 h-100"
                                                placeholder="1314881"
                                            />
                                        </Col>
                                        <Col md={{ span: 4 }} className="d-flex justify-content-center">
                                            <SubmitButton searching={searching} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={{ span: 4, offset: 4 }}>
                                            <p className="query_formFieldError text-danger mt-1 mb-0"> {errors.taxonA} </p>
                                        </Col>
                                    </Row>

                                    {advancedOptions &&
                                        <Card.Footer className="mt-3">
                                            <Row>
                                                <Col className="query_advancedTitle">
                                                    Check for specific taxa
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={{ span: 6 }}>
                                                    <div data-bs-toggle="tooltip" data-bs-placement="top" className="query_formFieldTitle"
                                                        title="Use this optional field to define taxa that will be checked against the base
                                                        taxon using the chosen interaction method (only taxa defined in this field will be taken 
                                                        into account in the results screen). Add by using the + button"
                                                    >
                                                        Add taxa:
                                                    </div>
                                                </Col>
                                                <Col md={{ span: 6 }} className="query_formFieldTitle">
                                                    To be checked:
                                                </Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <FieldArray name="taxonB">
                                                    {({ remove, push }) => (
                                                        <>
                                                            <Col md={{ span: 5 }}>
                                                                <Row>
                                                                    <Col className="pe-0">
                                                                        <Field className="query_formField taxonB w-100 px-1"
                                                                            name="dummyTaxon"
                                                                            placeholder="2928234"
                                                                        />
                                                                    </Col>
                                                                    <Col className="col-md-auto p-0">
                                                                        <button className="query_addTaxonButton text-white fw-bold px-2 h-100"
                                                                            type="button"
                                                                            onClick={() => { push(values.dummyTaxon); values.dummyTaxon = '' }}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>

                                                            <Col md={{ span: 5, offset: 1 }}>
                                                                {values.taxonB.length > 0 &&
                                                                    values.taxonB.map((taxon, i) => {
                                                                        return (
                                                                            <Row key={taxon} className="mt-1">
                                                                                <Col className="pe-0">
                                                                                    <Field name={`taxonB.${i}`} type="text"
                                                                                        className="query_queryFormField taxonB w-100 px-1"
                                                                                        value={taxon}
                                                                                    />
                                                                                </Col>
                                                                                <Col className="col-md-auto p-0">
                                                                                    <button className="query_addTaxonButton text-white fw-bold h-100"
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
                                                            </Col>
                                                        </>
                                                    )}
                                                </FieldArray>
                                            </Row>
                                        </Card.Footer>
                                    }
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>

                {errorMessage &&
                    <Row className="mt-4">
                        <Col className="text-center text-danger">
                            {errorMessage}
                        </Col>
                    </Row>
                }
            </Col>
        </Row >
    );
}

export default QueryBuilder;