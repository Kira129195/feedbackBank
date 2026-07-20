module.exports = {
  friendlyName: 'Hello test',
  fn: async function () {
    return { 
      status: 'success', 
      message: 'Hello from the separate Sails backend!' 
    };
  }
};