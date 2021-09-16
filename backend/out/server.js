"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFastify = void 0;
var fastify_1 = __importDefault(require("fastify"));
var mongoose_1 = require("./plugins/mongoose");
var fastify_static_1 = __importDefault(require("fastify-static"));
var path_1 = __importDefault(require("path"));
var fastify_socket_io_1 = require("fastify-socket.io");
var socket_1 = require("./routes/socket");
var server = (0, fastify_1.default)({
    logger: { prettyPrint: true }
});
var startFastify = function (port) {
    server.listen(port, function (err, _) {
        if (err) {
            console.error(err);
        }
        (0, mongoose_1.establishConnection)();
    });
    server.register(fastify_socket_io_1.socketioServer);
    server.register(socket_1.SocketRouter);
    server.register(fastify_static_1.default, {
        root: path_1.default.join(__dirname, '../../frontend/build'),
        prefix: '/'
    });
    return server;
};
exports.startFastify = startFastify;
