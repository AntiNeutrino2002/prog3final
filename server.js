// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

var port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
//server.use('/type', jsonServer.router('collector/data/arxiv1.json'));
//server.use('/articles', jsonServer.router('collector/data/arxiv2.json'));
//server.use('/authors', jsonServer.router('collector/data/authorCount.json'));
server.listen(port, () => {
  console.log('json-server is running on port ' + port + '!')
})