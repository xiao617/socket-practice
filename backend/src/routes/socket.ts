import fastify, { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify';
import { request } from 'http';

const SocketRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
    //const userRepo = UserRepoImpl.of();
    //server.io.on("connection",)
    
    server.get('/messages',(request,reply) =>{
        //fastify.on("connection",(socket,Socket) =>{});
        
    })
    done();
}
export {SocketRouter};