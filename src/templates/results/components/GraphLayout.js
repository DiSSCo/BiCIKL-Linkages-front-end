import { useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Row, Col } from 'react-bootstrap';

/* Import API */
import PredictInteraction from 'api/predict/PredictInteraction';
import GetInteractions from 'api/interactions/GetInteractions';


const GraphLayout = (props) => {
    const { results, formData } = props;

    /* Ref for graph canvas parent */
    const [canvas, setCanvas] = useState();

    const MakeCanvas = useCallback(col => {
        if (col && !canvas) {
            const newCanvas = {
                width: col.getBoundingClientRect().width,
                height: col.getBoundingClientRect().height
            }

            setCanvas(newCanvas);
        }
    });

    const targetTaxon = results['Input'][0];

    const [interactionTypes, setInteractionTypes] = useState();
    const [nodeTracker, setNodeTracker] = useState({
        [targetTaxon['taxon_id']]: {
            id: targetTaxon['taxon_id'],
            name: targetTaxon['sci_name'],
            color: '#4b6c2d',
            interaction: formData['interaction']
        }
    });
    const [linkTracker, setLinkTracker] = useState({});
    const [keyNodeTracker, setKeyNodeTracker] = useState([targetTaxon['taxon_id']]);

    useEffect(() => {
        GetInteractions(Process);

        function Process(result) {
            setInteractionTypes(result);
        }
    }, []);

    useEffect(() => {
        /* For each observed taxon, add to graph data */
        if (results['Predicted'].length > 0) {
            const copyNodeTracker = { ...nodeTracker };
            const copyLinkTracker = { ...linkTracker };

            results['Predicted'].forEach((taxon, _i) => {
                copyNodeTracker[taxon['taxon_id']] = {
                    id: taxon['taxon_id'],
                    name: taxon['sci_name'],
                    interaction: formData['interaction']
                };
                copyLinkTracker[`${taxon['taxon_id']}-${targetTaxon['taxon_id']}`] = {
                    source: taxon['taxon_id'],
                    target: targetTaxon['taxon_id']
                };
            });

            setNodeTracker(copyNodeTracker);
            setLinkTracker(copyLinkTracker);
        }
    }, [results]);

    if (interactionTypes) {
        /* Prepare graph nodes and links */
        const nodes = [];

        Object.entries(nodeTracker).forEach((value) => {
            nodes.push(value[1]);
        });

        const links = [];

        Object.entries(linkTracker).forEach((value) => {
            links.push(value[1]);
        });

        const graphData = {
            nodes: nodes,
            links: links
        };

        /* When clicked on node in grpah, try to extend graph with new found relations */
        const ExtendUponNode = (node) => {
            if (!keyNodeTracker.includes(node['id'])) {
                /* Reverse interaction method */
                let interactionMethod;

                Object.entries(interactionTypes['Interactions'][formData['interactionType']]).forEach((value) => {
                    if (value[1][0] !== nodeTracker[node['id']]['interaction']) {
                        interactionMethod = value[1][0];
                    }
                });

                /* Fetch new interaction data */
                PredictInteraction({
                    interaction: interactionMethod,
                    taxonA: node['id']
                }, CheckNodes, node, interactionMethod);
            }
        }

        /* Check if nodes and links exist, otherwise add them */
        function CheckNodes(result, node, interactionMethod) {
            /* Push node to key nodes */
            const copyKeyNodeTracker = [...keyNodeTracker, node['id']];

            setKeyNodeTracker(copyKeyNodeTracker);

            /* Extend graph nodes and links */
            const copyNodeTracker = { ...nodeTracker };
            const copyLinkTracker = { ...linkTracker };

            for (const [, taxon] of Object.entries(result['Predicted'])) {
                if (!copyNodeTracker[taxon['taxon_id']]) {
                    copyNodeTracker[taxon['taxon_id']] = {
                        id: taxon['taxon_id'],
                        name: taxon['sci_name'],
                        interaction: interactionMethod
                    }
                }

                if (!copyLinkTracker[`${taxon['taxon_id']}-${node['id']}`]) {
                    copyLinkTracker[`${taxon['taxon_id']}-${node['id']}`] = {
                        source: taxon['taxon_id'],
                        target: node['id']
                    }
                }
            }

            setNodeTracker(copyNodeTracker);
            setLinkTracker(copyLinkTracker);
        }

        return (
            <Row className="h-100 py-4">
                <Col className="h-100 mx-3 bg-white overflow-hidden" ref={MakeCanvas}>
                    {canvas &&
                        <ForceGraph2D
                            graphData={graphData}
                            height={canvas['height']}
                            width={canvas['width']}
                            onNodeClick={ExtendUponNode}
                            rendererConfig={{
                                centerAt: [(canvas['height'] / 2), (canvas['width'] / 2)],
                                pauseAnimation: true
                            }}
                            nodeCanvasObjectMode={() => "after"}
                            nodeCanvasObject={(node, ctx, globalScale) => {
                                const label = node.name;
                                const fontSize = 10 / globalScale;
                                ctx.font = `${fontSize}px Sans-Serif`;
                                ctx.textAlign = node.isClusterNode ? "center" : "left";
                                ctx.textBaseline = "middle";
                                ctx.fillStyle = 'black';

                                if (node.isClusterNode) {
                                    ctx.fillText(label, node.x, node.y);
                                } else {
                                    ctx.fillText(label, node.x - 4, node.y);
                                }
                            }}
                            nodeRelSize={8}
                            enableNodeDrag={false}
                        />
                    }
                </Col>
            </Row>
        );
    }
}

export default GraphLayout;