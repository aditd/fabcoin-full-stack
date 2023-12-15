const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/index.js');


async function main() {
    await network.enrollAdmin(true, false);
    await network.enrollAdmin(false,true);
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/', router);


    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main();

