const server = require('./server/server');

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
