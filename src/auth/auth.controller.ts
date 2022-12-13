import {
  Logger,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from '../common/dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body()
    signUpRequestDto: SignUpRequestDto
  ) {
    try {
      const signUpResult = await this.authService.signUp(signUpRequestDto);
      Logger.log(
        `User ${signUpResult.email} created succesfully. Type: ${signUpResult.type}`
      );
      return signUpResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInRequestDto: SignInRequestDto) {
    try {
      const signInResult = await this.authService.signIn(signInRequestDto);
      return signInResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
