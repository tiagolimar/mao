# **Atenção: Este projeto é um exemplo de código e não está completo ou funcional em sua forma atual. Foi criado apenas para fins educacionais e como ponto de partida para desenvolvimento futuro.**

# Compartilhamento de Tela usando WebRTC

Este projeto é um exemplo simples de como criar uma aplicação de compartilhamento de tela em tempo real usando a tecnologia WebRTC (Web Real-Time Communication). Com este projeto, você pode compartilhar a tela de um dispositivo com outros dispositivos em uma rede local, permitindo que os outros visualizem a tela compartilhada em tempo real.

## Como Funciona

Este projeto consiste em duas partes principais: a parte do compartilhador da tela e a parte do receptor da tela.

### Compartilhador da Tela

- O compartilhador da tela inicia uma conexão WebRTC e captura a tela do dispositivo.
- Ele cria uma descrição da oferta (offer) e a envia para o receptor da tela usando uma conexão WebSocket.
- Quando a oferta é recebida pelo receptor da tela, ele cria uma descrição da resposta (answer) e a envia de volta ao compartilhador da tela.
- Após a troca de descrições de oferta e resposta, a conexão WebRTC é estabelecida.
- O compartilhador da tela começa a transmitir a tela em tempo real para o receptor da tela.

### Receptor da Tela

- O receptor da tela também inicia uma conexão WebRTC e aguarda a recepção da oferta do compartilhador da tela.
- Quando a oferta é recebida, o receptor da tela cria uma descrição da resposta e a envia de volta ao compartilhador da tela.
- Após a troca de descrições de oferta e resposta, a conexão WebRTC é estabelecida.
- O receptor da tela exibe a tela compartilhada em tempo real em um elemento de vídeo na página.

## Pré-requisitos

- Node.js instalado no servidor para executar o servidor de sinalização WebSocket.
- Um ambiente de desenvolvimento web que suporta HTTPS para uso da API WebRTC (ou seja, você deve servir estas páginas em um servidor seguro, local ou na web).

## Como Usar

1. Clone o repositório para o seu ambiente local.
2. Execute `npm install` para instalar as dependências do servidor.
3. Inicie o servidor de sinalização WebSocket usando `node server.js`.
4. Abra o navegador e acesse a página do compartilhador da tela em `http://localhost:3000` (ou o URL do servidor).
5. Clique no botão "Iniciar Compartilhamento" para iniciar a transmissão da tela.
6. Abra o navegador em outra máquina na mesma rede e acesse a página do receptor da tela em `http://localhost:3000` (ou o URL do servidor).
7. O receptor da tela receberá a transmissão da tela em tempo real.

Lembre-se de que este é apenas um exemplo simplificado. Em um ambiente de produção, você precisa configurar servidores de sinalização mais robustos e adicionar medidas de segurança adequadas.
