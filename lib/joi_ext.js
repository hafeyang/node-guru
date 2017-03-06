const joi = require("joi");

/**
 * validate a json string
 * usage: extJoi.string().json()
 */
const extJoi = joi.extend({
  base: joi.string().default(),
  language: {
    json: ' must be a valid json string'
  },
  name: 'string',
  rules: [{
    name: 'json',
    validate(params, value, state, options) {
      try {
        const obj = JSON.parse(value);
        if (typeof obj !== "object") {
          return this.createError('string.json', { v: value }, state, options);
        }
      } catch (error) {
        return this.createError('string.json', { v: value }, state, options);
      }
      return value || "{}";
    }
  }]
});

module.exports = extJoi;