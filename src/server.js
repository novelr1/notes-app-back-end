/*
origin web server yg dituju http://notesapp-v1.dicodingacademy.com berbeda dengan http://localhost:5000/
npx eslint . --fix
*/
const Hapi = require('@hapi/hapi');
const routes = require('./routes.js');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors : {
        origin: ['*'],
        // * pada nilai origin untuk memperbolehkan data dikonsumsi oleh seluruh origin
        //response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();