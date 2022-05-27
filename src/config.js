require('dotenv').config();

const CONFIG = {
    'schedule_time': '1,31 * * * *',
    'def_axios': {
        'method': 'GET'
        , 'url': '{URL}'
        , 'headers': {
            'Content-Type': 'application/json;charset=utf8'
        }
        , 'responseType': 'json'
        , 'timeout': 1000
        , 'params': {}
        , 'data': {}
    },
    'def_mysql': {
        'host': typeof process.env.DB_HOST=='string'?process.env.DB_HOST:'',
        'port': typeof process.env.DB_PORT=='string'?process.env.DB_PORT:'',
        'user': typeof process.env.DB_USER=='string'?process.env.DB_USER:'',
        'password': typeof process.env.DB_PASSWORD=='string'?process.env.DB_PASSWORD:'',
        'database': typeof process.env.DB_DATABASE=='string'?process.env.DB_DATABASE:'',
        'connectionLimit': 15,
        'queueLimit': 30,
        'acquireTimeout': 10000
    },
    'def_email': {
        'from': `판도라<${process.env.MAILER_AUTHID}>`,
        'replyTo': 'no-reply@pandora.tv',
        'to': '조연호<joy.cho@pandora.tv>',
        'subject': '',
        'text': '',
        'html': '',
    },
    'email_to': '조연호<joy.cho@pandora.tv>',
    //'email_toall': '조연호<joy.cho@pandora.tv>',
    'email_toall': '고현태<jason.ko@pandora.tv>;탁선호<bryan.tak@pandora.tv>;조연호<joy.cho@pandora.tv>',
    // DB HEALTH CHECK
    'mysql_list': [
        {'host': 'gcpmaster.pandora.tv', 'database': 'pandora'},
        {'host': 'gcpslave.pandora.tv', 'database': 'pandora'},
        {'host': '34.64.53.61', 'database': 'pandora'},
        {'host': '34.64.173.155', 'database': 'pandora'},
        {'host': '34.64.161.164', 'database': 'pandora'},
        {'host': '34.64.39.236', 'database': 'pandora'},
        {'host': '34.64.154.246', 'database': 'pandora'},
    ],
    'http_list': {
    // www.pandora.tv
        '35.216.125.201':   'http://35.216.125.201/health/check.php',
        '35.216.48.65':     'http://35.216.48.65/health/check.php',
        '35.216.6.162':     'http://35.216.6.162/health/check.php',
        '35.216.115.33':    'http://35.216.115.33/health/check.php',
    // m.pandora.tv
        '35.216.79.253':    'http://35.216.79.253/health/check.php',
        '35.216.44.10':     'http://35.216.44.10/health/check.php',
        '35.216.86.227':    'http://35.216.86.227/health/check.php',
        '35.216.48.44':     'http://35.216.48.44/health/check.php',
    }
};
/*
for(key in CONFIG.http_list) {
    var http_url = CONFIG.http_list[key];
    console.log("HTTP URL", http_url);
}
console.log("CONFIG: ", CONFIG);
*/
module.exports = CONFIG;