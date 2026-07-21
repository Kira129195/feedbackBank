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
      const { 
        feedbackType, 
        feedbackField, 
        firstName, 
        lastName, 
        email, 
        contactNumber, 
        staff,
        branch,
        feedbackPayload
      } = record;

      const insertedForm = await db.collection('formInfo').insertOne({
        feedbackType: feedbackType || '',
        feedbackField: feedbackField || '',
        firstName: firstName ? firstName.trim() : '',
        lastName: lastName ? lastName.trim() : '',
        email: email ? email.trim().toLowerCase() : '',
        contactNumber: contactNumber ? contactNumber.trim() : '',
        staff: staff || '',
        branch: branch || '',
        feedbackPayload: feedbackPayload || {},
        sourcePlatform: record.sourcePlatform || 'Dashboard',
        createdAt: new Date(),
        updatedAt: new Date()
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