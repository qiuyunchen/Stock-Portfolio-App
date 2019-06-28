const express = require('express');
const app = express();
const port = 5555;

// Connection Assertion
app.get('/', (req, res) =>{
    res.json({
        test: 'connected',
        local_url: `http://localhost:${port}/`,
    })
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}.`);
})