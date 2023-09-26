const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').default('development'),
    PORT: Joi.number().default(3001),
    SERVER_URL: Joi.string().default('http://localhost:3001'),
    DATABASE_NAME: Joi.string().required().description('Database name is required'),
    DATABASE_HOST: Joi.string().required().description('Database host is required'),
    DATABASE_PORT: Joi.string().description('Database port is required').default(5432),
    DATABASE_USER: [Joi.string().required().description('Database user must be string'), Joi.allow(null)],
    DATABASE_PASSWORD: [Joi.string().required().description('Database password must be string'), Joi.allow(null)],
    DATABASE_DIALECT: Joi.string().description('Database dialect is required').default('postgres'),
    DATABASE_LOGGING: Joi.boolean().default(true),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  SERVER_URL: envVars.SERVER_URL,
  DATABASE: {
    NAME: envVars.DATABASE_NAME,
    HOST: envVars.DATABASE_HOST,
    PORT: envVars.DATABASE_PORT,
    USER: envVars.DATABASE_USER,
    PASSWORD: envVars.DATABASE_PASSWORD,
    DIALECT: envVars.DATABASE_DIALECT,
    LOGGING: envVars.DATABASE_LOGGING,
  },
};
