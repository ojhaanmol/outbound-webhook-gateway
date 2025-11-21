const { serviceConfiguration }= require('../utils/zod');

const configurations= serviceConfiguration( process.env );

module.exports= configurations;