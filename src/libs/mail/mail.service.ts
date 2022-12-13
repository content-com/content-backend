import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { EmailSubjects, EmailTemplates } from '../../enums';

@Injectable()
export class MailService {
  private signUpConfirmationBaseURL: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {
    const { signUpConfirmationBaseURL } = this.configService.get('smtp');

    this.signUpConfirmationBaseURL = signUpConfirmationBaseURL;
  }

  async sendUserConfirmation(user: any, actionToken: string) {
    const url = `${this.signUpConfirmationBaseURL}/sign-up/confirmation?actionToken=${actionToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      //   subject: EmailSubjects.CONFIRMATION,
      //   template: EmailTemplates.CONFIRMATION,
      context: {
        name: user.username,
        url
      }
    });
  }
}
