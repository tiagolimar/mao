const socket = new WebSocket('ws://seu-servidor-de-sinalizacao.com');

socket.onmessage = async (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'offer') {
        const offerDescription = new RTCSessionDescription(message.offer);

        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const peerConnection = new RTCPeerConnection(configuration);

        // Adicionar lógica para lidar com o recebimento de tracks remotas (stream de vídeo)
        peerConnection.ontrack = (event) => {
            const remoteVideo = document.getElementById('remoteVideo');
            remoteVideo.srcObject = event.streams[0];
        };

        // Definir a descrição da oferta recebida
        await peerConnection.setRemoteDescription(offerDescription);

        // Criar uma resposta à oferta e definir a descrição local
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Enviar a descrição da resposta de volta para o compartilhador da tela
        socket.send(JSON.stringify({ type: 'answer', answer: answer }));
    } else if (message.type === 'answer') {
        // Recebendo a descrição da resposta do compartilhador da tela
        const answerDescription = new RTCSessionDescription(message.answer);

        // Definir a descrição da resposta no lado do receptor
        await peerConnection.setRemoteDescription(answerDescription);
    }
};