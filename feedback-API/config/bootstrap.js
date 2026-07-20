module.exports.bootstrap = async function(done) {
  try {
    const db = sails.getDatastore().manager;
    await db.admin().ping();
    
    sails.log.info('🍋 UNICREDIT DB STATUS: Connection successful! Limoncello time.');
  } catch (err) {
    sails.log.error('❌ UNICREDIT  DB STATUS: Connection failed on lift!');
    sails.log.error('Details:', err.message);
    return done(err); 
  }

  return done();
};