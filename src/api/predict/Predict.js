import axios from 'axios';


function Predict(formData, callback) {
    axios({
        method: "post",
        url: 'predict',
        data: formData,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (result) {
        result['data']['observed'] = [];
        console.log(result['data']);

        callback(result['data']);
    }).catch(error => {
        console.warn(error);
        /* To be replaced by logger */
        callback(null);
    });
}

export default Predict;