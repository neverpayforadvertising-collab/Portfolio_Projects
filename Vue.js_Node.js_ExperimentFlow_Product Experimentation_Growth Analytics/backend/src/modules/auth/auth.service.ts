import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) return null;
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async registerOrFindOAuthUser(profile: any) {
    if (!profile || !profile.emails || !profile.emails.length) {
      throw new UnauthorizedException('OAuth provider did not return an email');
    }
    const email = profile.emails[0].value;
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: profile.displayName || undefined,
          password: Math.random().toString(36).slice(2, 10),
        },
      });
    }
    return user;
  }

  async register(email: string, password: string, name?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { email, password: hash, name } });
    return user;
  }
}
