import axios from 'axios';


function Predict(formData, callback) {
    if (formData['taxonA']) {
        const endPoint = `${formData['interaction']}/${formData['taxonA']}`;

        axios({
            method: "get",
            url: endPoint,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(function (result) {
            callback(result['data']);
        }).catch(error => {
            /* To be replaced by logger */
            callback(null);
        });
    }
}

export default Predict;