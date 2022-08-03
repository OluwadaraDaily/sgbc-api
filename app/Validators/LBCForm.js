'use strict'

class LBCForm {
  get rules () {
    return {
      // validation rules
      email: "required|email|unique:lagos_bible_conference_2022_s",
      full_name: "required",
      phone_number: "required|unique",
      location_from: "required"
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'Email is already registered',
      'full_name.required': 'You must provide your full name.',
      'phone_number.required': 'Phone number is already registered.',
      'location_from.required': 'You must provide a location from where you will be coming'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response
      .status(400)
      .send({ status: "error", message: errorMessages[0].message });
  }
}

module.exports = LBCForm
