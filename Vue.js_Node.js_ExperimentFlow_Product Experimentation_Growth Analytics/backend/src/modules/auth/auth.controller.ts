import { Controller, Post, Body, UseGuards, Get, Req, Res, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private config: ConfigService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) return { error: 'Invalid credentials' };
    const token = await this.authService.login(user);
    const cookieName = this.config.get<string>('JWT_COOKIE_NAME') || 'jid';
    const cookieOptions = {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax' as const,
      maxAge: 1000 * 60 * 60, // 1 hour
    };
    res.cookie(cookieName, token.access_token, cookieOptions);
    return { user: token.user };
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string; name?: string }, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.register(body.email, body.password, body.name);
    const token = await this.authService.login(user);
    const cookieName = this.config.get<string>('JWT_COOKIE_NAME') || 'jid';
    const cookieOptions = {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax' as const,
      maxAge: 1000 * 60 * 60,
    };
    res.cookie(cookieName, token.access_token, cookieOptions);
    return { user: token.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    const cookieName = this.config.get<string>('JWT_COOKIE_NAME') || 'jid';
    res.clearCookie(cookieName, { httpOnly: true, sameSite: 'lax' });
    return { ok: true };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as any;
    const token = await this.authService.login(user);
    const cookieName = this.config.get<string>('JWT_COOKIE_NAME') || 'jid';
    res.cookie(cookieName, token.access_token, {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });
    return res.json(token);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as any;
    const token = await this.authService.login(user);
    const cookieName = this.config.get<string>('JWT_COOKIE_NAME') || 'jid';
    res.cookie(cookieName, token.access_token, {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });
    return res.json(token);
  }
}
