const express = require('express');
const { isloggedin } = require('../../middlewares/auth');
const router = express.Router();

let clients = {};

router.get('/notifications/stream/:username', (req, res) => {
  const { username } = req.params;

  req.socket.setTimeout(0);

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  res.flushHeaders();

  clients[username] = res;

  req.on('close', () => {
    delete clients[username];
  });
});

// Export broadcast function
const sendSSE = (username, data) => {
  if (username === 'all') {
    Object.values(clients).forEach((clientRes) => {
      clientRes.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  } else if (clients[username]) {
    clients[username].write(`data: ${JSON.stringify(data)}\n\n`);
  }
};

module.exports = { router, sendSSE };
