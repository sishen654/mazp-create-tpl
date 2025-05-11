import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
    await this.transporter.sendMail({
      from: {
        name: '注册验证码',
        address: process.env.NODEMAILER_USER,
      },
      to,
      subject,
      html,
    });
  }
}
