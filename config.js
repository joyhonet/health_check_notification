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
        'from': `보내는사람<${process.env.MAILER_AUTHID}>`,
        'replyTo': '',
        'to': '{받는사람}',
        'subject': '',
        'text': '',
        'html': '',
    },
    'email_to': '{받는사람}',
    'email_toall': '{받는사람}',
    //'email_toall': '{}',
    // DB HEALTH CHECK
    'mysql_list': [
        {'host': '{DB IP or URL}', 'database': '{DB name}'},
        {'host': '{DB IP or URL}', 'database': '{DB name}'},
        {'host': '{DB IP or URL}', 'database': '{DB name}'},
        {'host': '{DB IP or URL}', 'database': '{DB name}'},
    ],
    'http_list': {
        '{SERVER IP or URL}':   '{HEALTH CHECK URL PATH}',
        '{SERVER IP or URL}':   '{HEALTH CHECK URL PATH}',
        '{SERVER IP or URL}':   '{HEALTH CHECK URL PATH}',
        '{SERVER IP or URL}':   '{HEALTH CHECK URL PATH}',
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
