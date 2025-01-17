import { IJSONObject } from '@automatisch/types';
import defineAction from '../../../../helpers/define-action';
import transporter from '../../common/transporter';

export default defineAction({
  name: 'Send Email',
  key: 'sendEmail',
  description: 'Send an email',
  substeps: [
    {
      key: 'chooseConnection',
      name: 'Choose connection',
    },
    {
      key: 'chooseAction',
      name: 'Set up action',
      arguments: [
        {
          label: 'From name',
          key: 'fromName',
          type: 'string',
          required: false,
          description: 'Display name of the sender.',
          variables: true,
        },
        {
          label: 'From email',
          key: 'fromEmail',
          type: 'string',
          required: true,
          description: 'Email address of the sender.',
          variables: true,
        },
        {
          label: 'Reply to',
          key: 'replyTo',
          type: 'string',
          required: false,
          description:
            'Email address to reply to. Defaults to the from email address.',
          variables: true,
        },
        {
          label: 'To',
          key: 'to',
          type: 'string',
          required: true,
          description:
            'Comma seperated list of email addresses to send the email to.',
          variables: true,
        },
        {
          label: 'Cc',
          key: 'cc',
          type: 'string',
          required: false,
          description: 'Comma seperated list of email addresses.',
          variables: true,
        },
        {
          label: 'Bcc',
          key: 'bcc',
          type: 'string',
          required: false,
          description: 'Comma seperated list of email addresses.',
          variables: true,
        },
        {
          label: 'Subject',
          key: 'subject',
          type: 'string',
          required: true,
          description: 'Subject of the email.',
          variables: true,
        },
        {
          label: 'Body',
          key: 'body',
          type: 'string',
          required: true,
          description: 'Body of the email.',
          variables: true,
        },
      ],
    },
    {
      key: 'testStep',
      name: 'Test action',
    },
  ],

  async run($) {
    const info = await transporter($).sendMail({
      from: `${$.step.parameters.fromName} <${$.step.parameters.fromEmail}>`,
      to: ($.step.parameters.to as string).split(','),
      replyTo: $.step.parameters.replyTo as string,
      cc: ($.step.parameters.cc as string).split(','),
      bcc: ($.step.parameters.bcc as string).split(','),
      subject: $.step.parameters.subject as string,
      text: $.step.parameters.body as string,
    });

    $.setActionItem({ raw: info as IJSONObject });
  },
});
