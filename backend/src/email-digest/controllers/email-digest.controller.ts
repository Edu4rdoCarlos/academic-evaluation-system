import { Controller, Get, Post, Param } from '@nestjs/common';
import { EmailDigestService } from '../services/email-digest.service';
import { HttpResponse } from '@/shared/utils/http-response';

@Controller('email-digest')
export class EmailDigestController {
  constructor(private readonly emailDigestService: EmailDigestService) {}

  @Get('pending')
  async findPending() {
    return HttpResponse.of(await this.emailDigestService.findPending());
  }

  @Post(':id/send')
  async markSent(@Param('id') id: string) {
    return HttpResponse.of(await this.emailDigestService.markSent(id));
  }
}
