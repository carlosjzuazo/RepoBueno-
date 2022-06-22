const joi = require('@hapi/joi');

const schemaUsers = joi.object().keys({
    name: joi.string().min(1).max(20).required(),
    bio: joi.string().max(200),
    email: joi.string().max(60).email().required(),
    password: joi.string().max(50).required()
});

const schemaPosts = joi.object().keys({
    title: joi.string().min(1).max(100).required(),
    description: joi.string().min(1).max(200).required(),
    url: joi.string().min(1).max(200).uri()
});



module.exports = { schemaUsers, schemaPosts }