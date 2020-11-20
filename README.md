# FaceCall App

## Peer to peer video calling in the web browser using [WebRTC](https://webrtc.org/).

This project is currently under development.

## Setup

This repo is the front end of the app, built using [React](https://reactjs.org/). You also need the backend server which handles the WebRTC signalling via [socket.io](https://socket.io/). Clone the signalling server from [here](https://github.com/brian-cross/webrtc-signaling-server).

## Running

After cloning and running `npm install` on both repos, `cd` to the signalling server directory and run `npm start` to run the server. You can also run `npm run dev` to start the server in development mode using [nodemon](https://www.npmjs.com/package/nodemon).

Now `cd` back to the front end directory and run `npm run netlify`. This will run a [Netlify local development server](https://www.netlify.com/products/dev/) with the front end running on [localhost:8888](localhost:8888).
