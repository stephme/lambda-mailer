var action = require('./mailer.js');

exports.handler = (event, context) => {
  action.run(event, context, (error, result) => context.done(error, result));
};
