const logger = (req, res, next) => {
  if (req.method === 'POST') {
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`[${new Date().toISOString()}] POST request by user: ${req.session.userId}`);
      }
    });
  }
  next();
};

module.exports = logger;