import axios from 'axios';


function PredictInteraction(formData, callback, node = null, interactionMethod = null ) {
    if (formData['taxonA']) {
        const endPoint = `${formData['interaction']}`;

        if (typeof formData['taxonA'] === 'number') {
            endPoint += `/${formData['taxonA']}`;
        }

        const data = {
            species: formData['taxonA']
        }

        axios({
            method: "post",
            url: endPoint,
            data: data,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (result) {
            callback(result['data'], node, interactionMethod);
        }).catch(error => {
            console.warn(error);
            /* To be replaced by logger */
            callback(null);
        });
    }
}

export default PredictInteraction;