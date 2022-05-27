const axios = require('axios');

const curl = {
    // 메일발송 함수
    send: function (config, func_callback) {
        axios(config).then(function (response) {
            // handle success
            func_callback('success', response);
        })
        .catch(function (error) {
            func_callback('fail', error);
        })
        .finally(function () {
            // always 
            let response = {};
            response.status = 200;
            func_callback('finish', response);
        });
    }
};

module.exports = curl;
/**
let config = {
    'method': 'GET'
    , 'url': 'http://35.216.48.65/health/check.php'
    , 'headers': {
        'Content-Type': 'application/json;charset=utf8'
    }
    , 'responseType': 'json'
    , 'timeout': 2000
    , 'params': {}
    , 'data': {}
};
curl.send(config, axios_callback);
function axios_callback(type, res) {
    let RESTYPE = type ? type : '';
    let RES = res ? res : {};
    let CFG = RES.config ? RES.config : {};
    console.group(RESTYPE + " - " + new Date().toISOString());
    console.log(RES);
    console.groupEnd();
}
*/