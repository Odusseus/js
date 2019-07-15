TODO
Uitzoeken debug app

<https://www.w3schools.com/nodejs/default.asp>

Nodejs host <https://signup.azure.com>

Database <http://lokijs.org>

Datamodel <http://www.databaseanswers.org>

Framework <https://vegibit.com/express-js-beginner-tutorial/>

Video <https://app.pluralsight.com/player?course=nodejs-express-web-applications-update&author=jonathan-mills&name=2c2079db-8559-469e-b536-2364633de80f&clip=0>


= debug =

<https://developer.ibm.com/node/2016/09/15/lets-code-it-the-debug-module/>
<https://developer.ibm.com/node/2016/10/12/the-node-js-debug-module-advanced-usage/>

set DEBUG=app & node app.js

set DEBUG=* & npm start

of

"scripts": {
    "start": "@powershell $env:DEBUG='*,-express:router*' ; node app.js"
},

