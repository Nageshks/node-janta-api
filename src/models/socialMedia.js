const mongoose = require('mongoose')
const constants = require('../constants')

const socialMediaSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: false,
  },
  personalMail: {
    type: String,
    required: false,
  },
  collegeMail: {
    type: String,
    required: false,
  },
  workMail: {
    type: String,
    required: false,
  },
  whatsapp: {
    type: String,
    required: false,
  },
  telegram: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  linktree: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  }
});

mongoose.model(constants.socialMedia, socialMediaSchema);