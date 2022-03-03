const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Basic base64 pdf server, visit /pdf or /demo');
})

router.get('/pdf', (req, res) => {
    res.status(400).send('No filename requested. Usage: /pdf/{filename}');
})

router.get('/pdf/:fileName', (req, res) => {

    const filePath = path.join(__dirname, `../assets/${path.basename(req.params.fileName)}`)

    fs.readFile(filePath, (err, buffer) => {

        if (err) {

            res.status(404).json({
                message: err.message
            })

        } else {

            res.json({
                base64: buffer.toString('base64')
            })

        }

    });


})

router.get('*', (req, res) => {
    res.status(404).send('Page not found!');
})

module.exports = router;