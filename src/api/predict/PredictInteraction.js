import axios from 'axios';


function PredictInteraction(formData, callback) {
    if (formData['taxonA']) {
        const endPoint = `${formData['interaction']}/${formData['taxonA']}`;

        axios({
            method: "get",
            url: endPoint,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (result) {
            callback(result['data']);
        }).catch(error => {
            console.warn(error);
            /* To be replaced by logger */
            callback(null);
        });
    }
}

export default PredictInteraction;