import { run } from 'mailer';

exports.handler = (event, context) => {
  run(event, context, (error, result) => context.done(error, result));
};
