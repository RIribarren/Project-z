import nodemailer from 'nodemailer';
import { envVarConfig } from '@config';

const transporter = nodemailer.createTransport({
  host: envVarConfig.email_host,
  secure: true, // true for 465, false for other ports
  port: envVarConfig.email_port,
  auth: {
    user: envVarConfig.email_user,
    pass: envVarConfig.email_pass,
  },
});

export default transporter;
