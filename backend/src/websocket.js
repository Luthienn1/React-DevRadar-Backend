const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculatedDistance = require('./utils/calculatedDistance');

let io;
const connection = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connection.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        })
    });
};

exports.findConnections = (coordinates, techs) => {
    return connection.filter(connection => {
        return calculatedDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item));
    })
}

exports.sendMessage = (to, message, data) => {
    to.findEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}