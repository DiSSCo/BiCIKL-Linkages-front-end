import ForceGraph2D from 'react-force-graph-2d';


const Test = () => {
    const myData = {
        nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        links: [
            { source: 'a', target: 'b' },
            { source: 'c', target: 'a' }
        ]
    };

    return (
        <ForceGraph2D
            graphData={myData}
        />
    );
}

export default Test;