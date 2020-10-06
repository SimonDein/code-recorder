const express = require('express');
const app = express();
const port = 3000;

// static files can be served from this file
app.use(express.static('./public'));
app.use(express.static('./node_modules'));

app.get('/', (req, res) => res.sendFile('index.html', {root: './pages'}));

app.listen(port, () => console.log(`App started on port ${port}`));