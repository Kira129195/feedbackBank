module.exports = {
  friendlyName: 'Send feedback form',

  exits: {
    success: { responseType: 'ok' },
    badRequest: { responseType: 'badRequest' },
    serverError: { responseType: 'serverError' }
  },

  fn: async function () {
    try {
      const db = sails.getDatastore().manager;
      const record = this.req.body;

      // Extract properties directly from the single incoming payload
      const { 
        customerName, 
        email, 
        rating, 
        comments, 
        address, 
        sentiment, 
        sourcePlatform 
      } = record;

      // One straightforward, fast insertion into 'forminfo'
      const insertedForm = await db.collection('forminfo').insertOne({
        customerName,
        email: email ? email.trim().toLowerCase() : '',
        address: address ? address.trim() : '',
        rating: rating ? Number(rating) : 0,
        comments: comments ? comments.trim() : '',
        sentiment: sentiment || 'Neutral',
        sourcePlatform: sourcePlatform || 'Dashboard',
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      if (!insertedForm || !insertedForm.insertedId) {
        return this.res.badRequest({ message: 'Could not process form submission.' });
      }

      return {
        message: 'Feedback saved successfully!',
        data: {
          id: insertedForm.insertedId
        }
      };

    } catch (err) {
      sails.log.error('Database write failed in forminfo submission:', err);
      return this.res.serverError(err);
    }
  }
};