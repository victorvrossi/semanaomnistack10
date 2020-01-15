const express = require('express');

const app = express();

app.use(express.json());

app.post('/', (request,response) => {
    console.log(request.body);
    return response.json({ home:'Ola' });
});

app.listen(3333);