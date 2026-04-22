import { Controller, Get, Post, Param } from '@nestjs/common';
import { EmailDigestService } from '../services/email-digest.service';

@Controller('email-digest')
export class EmailDigestController {
  constructor(private readonly emailDigestService: EmailDigestService) {}

  @Get('pending')
  findPending() {
    return this.emailDigestService.findPending();
  }

  @Post(':id/send')
  markSent(@Param('id') id: string) {
    return this.emailDigestService.markSent(id);
  }
}
