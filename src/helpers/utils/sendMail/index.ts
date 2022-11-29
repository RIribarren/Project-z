import { transporterConfig } from '@config';

const sendMail = async (from: string, to: string, subject: string, text: string, html: string) => {
  await transporterConfig.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

export default sendMail;
