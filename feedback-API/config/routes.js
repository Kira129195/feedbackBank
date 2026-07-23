module.exports.routes = {
  'GET /test': 'test/hello',
  'POST /sendFeedback': 'form/sendform',
  'POST /api/v1/auth/login': { action: 'auth/login' },
};