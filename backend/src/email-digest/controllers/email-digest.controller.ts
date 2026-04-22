import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailDigestService } from '../services/email-digest.service';
import { HttpResponse } from '@/shared/utils/http-response';
import { GetPendingDigestsApi, SendDigestApi } from '../decorators/email-digest-api.decorator';

@ApiTags('email-digest')
@Controller('email-digest')
export class EmailDigestController {
  constructor(private readonly emailDigestService: EmailDigestService) {}

  @Get('pending')
  @GetPendingDigestsApi()
  async findPending() {
    return HttpResponse.of(await this.emailDigestService.findPending());
  }

  @Post(':id/send')
  @SendDigestApi()
  async markSent(@Param('id') id: string) {
    return HttpResponse.of(await this.emailDigestService.markSent(id));
  }
}
