/* Import Dependencies */
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faDrumstickBite, faVirus } from '@fortawesome/free-solid-svg-icons';


const Instructions = () => {
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Biotic Interactions Browser
                        </Card.Title>
                        <div className="mt-3">
                            <p> Hello, and welcome to BLUE, the Biotic Linkages Unified Explorer. 
                            Here, you can explore species interactions based on data from the
                            <a href="https://www.globalbioticinteractions.org/" rel="noreferrer" target="_blank"> Global Biotic Interactions database</a>.
                            To begin, input a GBIF taxon ID and select the relation you're interested in. BLUE will output species 
                            that have been observed interacting with your targeted species in the given interaction. </p>

                            <p> In addition to outputting observed interactions, BLUE uses a machine learning classifier to predict
                            potential interactions. These predictions will fit within the larger BiCIKL infrastructure and predict
                            more linkages between biodiversity information sources. This feature is currently only available for the
                            Pollination interactions. </p>
                        </div>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col className="col-md-auto">
                                        <FontAwesomeIcon icon={faBug} className="instructionIcon" />
                                    </Col>
                                    <Col>
                                        <h6 className="d-inline">
                                            Pollination
                                        </h6>
                                        <div>
                                            The transfer of pollen to a plant to allow fertilization.
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col className="col-md-auto">
                                        <FontAwesomeIcon icon={faDrumstickBite} className="instructionIcon" />
                                    </Col>
                                    <Col>
                                        <h6 className="d-inline">
                                            Predation
                                        </h6>
                                        <div>
                                            An interaction wherein one organism, the predator, kills and eats another organism,
                                            its prey.
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col className="col-md-auto">
                                        <FontAwesomeIcon icon={faVirus} className="instructionIcon" />
                                    </Col>
                                    <Col>
                                        <h6 className="d-inline">
                                            Parasitation
                                        </h6>
                                        <div>
                                            A non mutual relationship between two organisms in which one benefits at
                                            the expense of the other.
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Instructions;