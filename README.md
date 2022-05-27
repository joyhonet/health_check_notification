# CRON - HEALTH CHECK NOTIFICATION
## Project 초기화
> npm init -y
## Use Package Install / File
| 이름 | npm 설치 명령 | 설명 |
|:---|:---|---|
| pm2 | npm i pm2 -g | node 실행 관리 패키지 (global 설치) |
| env | npm i dotenv | .env 패키지 |
| mysql | npm i mysql | mysql 패키지 |
| axios | npm i axios | 통신용 패키지 |
| nodemailer | npm i nodemailer | 메일 발송 패키지 |
| node-cron | npm i node-cron | nodejs용 cron 스케쥴링 패키지 |
| config | require('./config') | health check할 서버정보및 계정 정보 config 파일 |
| mailer | require('./mailer') | nodemailer(을)를 이용한 메일 발송 파일 |
| curl | require('./curl') | axios(을)를 이용한 통신 세팅 파일 |
| date | require('./date') | date prototype setting |

## node.js 시작
### node start
> node cron.js
### pm2 start
> pm2 start cron.js --watch
### npm start
> npm run cron  
### npm run script 추가 (package.json)
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    , "cron": "pm2 start cron.js --watch"
  }
````
## pm2 명령어
### Start
> pm2 start cron.js
### Stop
> pm2 stop cron.js
### List 확인
> pm2 list
### 모니터링
> pm2 monit
### Logs 확인
> pm2 logs
