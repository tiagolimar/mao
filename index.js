const http = require('http');
const WebSocketServer = require('websocket').server;

// Crie um servidor HTTP
const server = http.createServer((request, response) => {
    console.log('Recebida uma requisição HTTP, mas estamos esperando WebSocket.');
    response.writeHead(404);
    response.end();
});

server.listen(8080, () => {
    console.log('Servidor de sinalização está ouvindo na porta 8080.');
});

// Crie o servidor WebSocket
const wsServer = new WebSocketServer({
    httpServer: server,
});

// Armazene as conexões dos clientes
const connections = [];

// Configurar o evento de conexão WebSocket
wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    console.log('Nova conexão WebSocket aceita.');

    // Adicione a conexão à lista de conexões
    connections.push(connection);

    // Configurar evento de mensagem WebSocket
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            // Reenviar a mensagem para todos os clientes conectados (exceto o remetente)
            connections.forEach((client) => {
                if (client !== connection && client.connected) {
                    client.sendUTF(message.utf8Data);
                }
            });
        }
    });

    // Configurar evento de fechamento da conexão
    connection.on('close', (reasonCode, description) => {
        console.log(`Conexão fechada: ${reasonCode} - ${description}`);
        // Remover a conexão da lista de conexões
        const index = connections.indexOf(connection);
        if (index !== -1) {
            connections.splice(index, 1);
        }
    });
});