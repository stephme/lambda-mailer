# :envelope: lambda-mailer
AWS Lambda for sending emails with MJML + templating and SES Amazon service.

This lambda gives your browser (or any client) a backend for sending emails.

### Quick Usage

```
// install node-lambda
npm install -g node-lambda

// clone the lambda and get inside!
https://github.com/stephme/lambda-mailer
cd lambda-mailer

// install dependencies
npm install

// create deployment files (to hold your env vars)
node-lambda setup
```

open `.env` and fill it with your AWS credentials: (make sure you have proper IAM permissions)

```
AWS_ENVIRONMENT=dev
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_ROLE_ARN=your_amazon_role
AWS_REGION=us-east-1
AWS_FUNCTION_NAME=your_lambda_name
AWS_HANDLER=index.handler
AWS_MODE=event
AWS_MEMORY_SIZE=128
AWS_TIMEOUT=60
AWS_DESCRIPTION=your_lambda_description
AWS_RUNTIME=nodejs8.10
CONFIG_FILE=deploy.env
```

open `event.json` and fill it with the following sample event: (just change the `to` and `from` Properties)

```
{
  "from": "username@gmail.com",
  "to": "any@email.com",
  "subject": "Hello",
  "template": "welcome",
  "context": {
    name: "Bob"
  }
}

```
now everything is set! Let's test locally!

```
node-lambda run
```

This will use the `welcome` template coupled with the context/data (name).
You should receive an email that says:

```
Hello World ! My name is Bob
```

You can edit the template text by editing these two files:

```
lambda-mailer/templates/welcome.mjml
```

now that it works locally, let's deploy to AWS:

```
node-lambda deploy
```
That's it! Now you can call the lambda from any AWS SDK, like your browser JS SDK.

### Mail Options (Event Properties):

Here's the full list of options you can pass in your event:

  - **from** - The e-mail address of the sender. All e-mail addresses can be plain `'sender@server.com'` or formatted `'Sender Name <sender@server.com>'`, see [here](#address-formatting) for details
  - **sender** - An e-mail address that will appear on the *Sender:* field
  - **to** - Comma separated list or an array of recipients e-mail addresses that will appear on the *To:* field
  - **cc** - Comma separated list or an array of recipients e-mail addresses that will appear on the *Cc:* field
  - **bcc** - Comma separated list or an array of recipients e-mail addresses that will appear on the *Bcc:* field
  - **replyTo** - An e-mail address that will appear on the *Reply-To:* field
  - **inReplyTo** - The message-id this message is replying
  - **references** - Message-id list (an array or space separated string)
  - **subject** - The subject of the e-mail
  - **template** - The template to use for this email. Make sure it matches one of the folder names inside the `templates` folder
  - **context** - The context/data the template needs. eg. `{"first_name": "..."}`
  - **watchHtml** - Apple Watch specific HTML version of the message (*experimental*)
  - **headers** - An object or array of additional header fields (e.g. *{"X-Key-Name": "key value"}* or *[{key: "X-Key-Name", value: "val1"}, {key: "X-Key-Name", value: "val2"}]*)
  - **attachments** - An array of attachment objects
  - **alternatives** - An array of alternative text contents (in addition to text and html parts)
  - **envelope** - optional SMTP envelope, if auto generated envelope is not suitable
  - **messageId** - optional Message-Id value, random value will be generated if not set
  - **date** - optional Date value, current UTC string will be used if not set
  - **encoding** - optional transfer encoding for the textual parts
