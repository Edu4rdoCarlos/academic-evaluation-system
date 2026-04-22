import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Login } from '../../application/use-cases/Login';
import { InvalidCredentials } from '../../domain/errors/InvalidCredentials';
import { Public } from '../../infrastructure/decorators/Public';
import { LoginDto } from './dto/LoginDto';
import { AuthTokenResponseDto } from './dto/AuthTokenResponseDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate and receive a JWT access token' })
  @ApiResponse({ status: 200, type: AuthTokenResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async handleLogin(@Body() dto: LoginDto): Promise<AuthTokenResponseDto> {
    try {
      return await this.login.execute({ email: dto.email, password: dto.password });
    } catch (error) {
      if (error instanceof InvalidCredentials) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }
}
