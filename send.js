const startButton = document.getElementById("startButton");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
let localStream;

startButton.addEventListener("click", async () => {
    try {
        localStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
        });

        // Exibir o vídeo local no elemento de vídeo
        localVideo.srcObject = localStream;

        // Iniciar uma conexão WebRTC
        const configuration = {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };
        const peerConnection = new RTCPeerConnection(configuration);

        // Adicionar a stream local à conexão
        localStream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, localStream));

        // Definir o evento de recebimento da stream remota
        peerConnection.ontrack = (event) => {
            remoteVideo.srcObject = event.streams[0];
        };

        // Criar uma oferta de sessão e definir localDescription
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        const offerDescription = JSON.stringify(
            peerConnection.localDescription
        );
        console.log("Descrição da oferta:", offerDescription);

        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = async () => {
            // Enviar a descrição da oferta gerada para o receptor
            const offerDescription = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offerDescription);
            socket.send(
                JSON.stringify({ type: "offer", offer: offerDescription })
            );
        };
    } catch (error) {
        console.error("Erro ao iniciar o compartilhamento de tela:", error);
    }
});
