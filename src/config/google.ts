import { pick } from 'lodash';
import * as Joi from 'joi';

require('dotenv').config();

const CONFIG_KEYS = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];

const stringRequired = Joi.string().required();

const schema = Joi.object().keys({
  GOOGLE_CLIENT_ID: stringRequired,
  GOOGLE_CLIENT_SECRET: stringRequired
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
  google: {
    clientId: config.value.GOOGLE_CLIENT_ID,
    clientSecret: config.value.GOOGLE_CLIENT_SECRET
  }
});
