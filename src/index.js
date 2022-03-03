const express = require('express');
const router = require('./router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/demo', express.static('public'));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});