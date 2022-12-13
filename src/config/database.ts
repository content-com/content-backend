import { pick } from 'lodash';
import * as Joi from 'joi';

require('dotenv').config();

const CONFIG_KEYS = [
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'DATABASE_NAME'
];

const stringRequired = Joi.string().required();
const numberRequired = Joi.number().required();

const schema = Joi.object().keys({
  DATABASE_HOST: stringRequired,
  DATABASE_PORT: numberRequired,
  DATABASE_USERNAME: stringRequired,
  DATABASE_PASSWORD: stringRequired,
  DATABASE_NAME: stringRequired
});

const items = pick(process.env, CONFIG_KEYS);

const config = schema.validate(items);

if (config.error) {
  throw new Error(
    `Missing environment variable\n
    ${config.error.toString()}\n
    HINT => Compare your .env file with .env.example\n`
  );
}

export default () => ({
  database: {
    host: config.value.DATABASE_HOST,
    port: config.value.DATABASE_PORT,
    username: config.value.DATABASE_USERNAME,
    password: config.value.DATABASE_PASSWORD,
    database: config.value.DATABASE_NAME
  }
});
