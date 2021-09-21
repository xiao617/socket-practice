import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { establishConnection } from './plugins/mongoose';
import fastifyStatic from 'fastify-static';
import { UserRouter } from './routes/user';
import path from 'path';
import { SocketRouter } from './routes/socket';
import fastifyIO from 'fastify-socket.io';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true }
})
 
const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {
 
    server.listen(port, (err, _) => {
        if (err) {
            console.error(err)
        }
        establishConnection()
    })

    server.register(fastifyIO,{});
    server.register(SocketRouter);

    // server.ready().then(() => {
    //     server.io.on("connection",(socket) => {
    //         console.log(socket);
    //         socket.emit("hello","world");
    //     })
    //     //server.io.
    // });
    // server.ready(err => {
    //     if(err)
    //     {
    //         console.error(err);
    //     }
    //     else{
    //         server.io.on('connect',(socket) => console.info('socket connected!',socket.id))
    //     }
        
    // })
    //server.register(socketioServer);
    //server.register(SocketRouter);
    server.register(fastifyStatic, {
        root: path.join(__dirname, '../../frontend/build'),
        prefix: '/'
      });
 
    return server
}
 
export { startFastify }