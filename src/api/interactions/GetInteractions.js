import axios from 'axios';


function GetInteractions(callback) {
    axios({
        method: "get",
        url: 'interactions',
        responseType: 'json'
    }).then(function (result) {
        callback(result['data']);
    }).catch(error => {
        /* To be replaced by logger */
        console.warn(error);
    });
}

export default GetInteractions;