const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index')
});

module.exports = router;
// (do i have require pug in here or something?)
//do this page from the beginning...