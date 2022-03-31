const express = require('express');
const mysql = require('express');
const { listenerCount } = require('process');

const app = express();

app.listen('3306', () => {
    console.log('Server running');
});