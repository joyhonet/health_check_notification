const cron = require('node-cron');
const mysql = require('mysql');
const config = require('../src/config');
const mailer = require('../model/mailer');
const curl = require('../model/curl');
require('../model/date');

cron.schedule(config.schedule_time, () => {
    let nDate = new Date().format('yyyy-MM-dd H:i:s');
    console.log(`[${nDate}]	[START]	schedule (${config.schedule_time})`);
    // HTTP CHECK
        for(key in config.http_list) {
            //console.log(ip, arrHost[ip]);
            config.def_axios.url = config.http_list[key];
            curl.send(config.def_axios, axios_callback);
        }
    // SQL CHECK
        set_mysql_check(0, config.mysql_list);
});


function set_mysql_check(cnt, sqlList) {
    let nDate = new Date().format('yyyy-MM-dd H:i:s');
    if( typeof sqlList[cnt] == 'object' ) {
        let host = typeof sqlList[cnt].host=='string'?sqlList[cnt].host:'';
        let database = typeof sqlList[cnt].database=='string'?sqlList[cnt].database:'';
        if( host != '' && database != '' ) {
            config.def_mysql.host = host;
            config.def_mysql.database = database;
            try{
                let pool= mysql.createPool(config.def_mysql);
                pool.getConnection(function(err, conn) {
                    if( err ) {
                        //연결 실패
                        console.log(`[${nDate}] "DB Failed" ${host}`);
                        config.def_email.to = config.email_to;
                        config.def_email.subject = `DB서버 접속 실패 "${host}"`;
                        config.def_email.html = `오류 시간 : ${nDate}<hr /><b style="color:red;">접속 실패 : ${host} 확인 요망</b>`;
                        mailer.sendGmail(config.def_email);
                        cnt++;
                        set_mysql_check(cnt, sqlList);
                    } else {
                        //연결 성공
                        //conn.query(...);
                        conn.release();
                        //console.log(`[${nDate}] "DB Success" ${JSON.stringify(sqlList[cnt])}`);
                        cnt++;
                        set_mysql_check(cnt, sqlList);
                    }
                });
            } catch(err) {
                cnt++;
                set_mysql_check(cnt, sqlList);
            }
        }
    } else {
        return true;
    }
}
function axios_callback(type, res) {
    let nDate = new Date().format('yyyy-MM-dd H:i:s');
    let RESTYPE = type ? type : '';
    let RES = typeof res.response!='undefined' ? res.response : res;
    let RESDATA = typeof RES.data!='undefined' ? RES.data : {};
    let CFG = res.config ? res.config : {};
    if( RESTYPE=='success' || RESTYPE=='fail' ) {
        let URLs = new URL(CFG.url);
        URLs.host = typeof URLs.host!='undefined' ? URLs.host : CFG.url;
        if( RESTYPE=='fail' ) {
            console.log(`[${nDate}] "HTTP ${RESTYPE}" ${URLs.host}`);
        }
        if( RES.status != 200 ) {
            config.def_email.to = config.email_toall;
            config.def_email.subject = `웹서버 접속 실패 "${URLs.host}"`;
            config.def_email.html = `오류 시간 : ${nDate}<hr /><b style="color:red;">접속 실패 : ${URLs.host} 확인 요망</b>`;
            /*
                config.def_email.html += `<hr />
                <div style="font-size:14px;font-weight:bold;">Date: ${nDate}</div>
                <table border=0 width=100% cellpadding=5 cellspacing=1 bgcolor=#999 style="font-size:14px;">
                    <tr bgcolor=#fff>
                        <td width=100>Type</td>
                        <td>${RESTYPE} (${RES.status})</td>
                    </tr>
                    <tr bgcolor=#fff>
                        <td>CHECK URL</td>
                        <td>${CFG.url}</td>
                    </tr>
                    <tr bgcolor=#fff>
                        <td>MESSAGE</td>
                        <td>${RESDATA.message}</td>
                    </tr>
                    <tr bgcolor=#fff>
                        <td>Return Data</td>
                        <td>${JSON.stringify(RESDATA)}</td>
                    </tr>
                    <tr bgcolor=#fff>
                        <td>HEADERS</td>
                        <td>${JSON.stringify(RES.headers)}</td>
                    </tr>
                </table>`;
            */
            mailer.sendGmail(config.def_email);
        }
    }
}
