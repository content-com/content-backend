import { pick } from 'lodash';
import * as Joi from 'joi';

require('dotenv').config();

const CONFIG_KEYS = ['API_PORT', 'JWT_SECRET', 'JWT_EXPIRES_IN'];

const stringRequired = Joi.string().required();
const numberRequired = Joi.number().required();

const schema = Joi.object().keys({
  API_PORT: numberRequired,
  JWT_SECRET: stringRequired,
  JWT_EXPIRES_IN: stringRequired
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
  app: {
    api: { port: config.value.API_PORT },
    jwt: {
      secret: config.value.JWT_SECRET,
      expiresIn: config.value.JWT_EXPIRES_IN
    }
  }
});
