module.exports.datastores = {

  default: {
    adapter: `sails-mongo`,
    url: `mongodb+srv://kyitharmoe2000:Kyisin129195@cluster0.blyvo35.mongodb.net/feedbackBank?retryWrites=true&w=majority&tls=true`,
    database: 'feedbackBank',
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  },


};
