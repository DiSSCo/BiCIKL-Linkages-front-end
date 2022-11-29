import ForceGraph2D from 'react-force-graph-2d';
import { Row, Col } from 'react-bootstrap';

/* Import API */
import PredictInteraction from 'api/predict/PredictInteraction';


const GraphLayout = (props) => {
    const results = props.results;
    const formData = props.formData;

    const targetTaxon = results['Input'][0];

    const graphData = {
        nodes: [{
            id: targetTaxon['taxon_id'],
            name: targetTaxon['sci_name'],
            color: '#4b6c2d'
        }],
        links: []
    };

    const keyNodeTracker = [targetTaxon['taxon_id']];

    /* For each observed taxon, add to graph data */
    if (results['Predicted'].length > 0) {
        results['Predicted'].forEach((taxon, _i) => {
            graphData['nodes'].push({
                id: taxon['taxon_id'],
                name: taxon['sci_name']
            });
            graphData['links'].push({ source: taxon['taxon_id'], target: targetTaxon['taxon_id'], name: 'test' })
        });
    }

    /* When clicked on node in grpah, try to extend graph with new found relations */
    const ExtendUponNode = (node) => {
        if (!keyNodeTracker.includes(node['id'])) {
            PredictInteraction({
                interaction: formData['interaction'],
                taxonA: node['id']
            }, Process);

            function Process(result) {
                /* Do something */
            }
        }
    }

    return (
        <Row className="h-100">
            <Col className="h-100">
                <ForceGraph2D
                    graphData={graphData}
                    height={700}
                    width={940}
                    onNodeClick={ExtendUponNode}
                    rendererConfig={{
                        centerAt: [350, 470],
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
            </Col>
        </Row>
    );
}

export default GraphLayout;