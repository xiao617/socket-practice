"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketRouter = void 0;
var SocketRouter = function (server, opts, done) {
    //const userRepo = UserRepoImpl.of();
    server.ready(function (err) {
        if (err) {
            console.error(err);
        }
        else {
            server.io.on('connect', function (socket) { return console.info('socket connected!', socket.id); });
        }
    });
    server.get('/messages', function (request, reply) {
        //fastify.on("connection",(socket,Socket) =>{});
    });
    done();
};
exports.SocketRouter = SocketRouter;
