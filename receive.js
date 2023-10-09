const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = async (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'offer') {
        const offerDescription = new RTCSessionDescription(message.offer);

        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const peerConnection = new RTCPeerConnection(configuration);

        peerConnection.ontrack = (event) => {
            const remoteVideo = document.getElementById('remoteVideo');
            remoteVideo.srcObject = event.streams[0];
        };

        await peerConnection.setRemoteDescription(offerDescription);

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.send(JSON.stringify({ type: 'answer', answer: answer }));
    } else if (message.type === 'answer') {

        const answerDescription = new RTCSessionDescription(message.answer);

        await peerConnection.setRemoteDescription(answerDescription);
    }
};