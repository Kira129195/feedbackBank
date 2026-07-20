module.exports = {

  attributes: {
    feedbackType: {
      type: 'string',
      required: true,
    },
    feedbackField: {
      type: 'string',
      required: true,
    },
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true
    },
    contactNumber: {
      type: 'number',
      required: true,
    },
    staff: {
      type: 'string',
    },
    branch: {
      type: 'string',
    },
    feedbackPayload: {
      type: 'string',
      required: true,
    },  
  },

};

