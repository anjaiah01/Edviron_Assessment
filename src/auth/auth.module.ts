import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
import { User,UserSchema } from 'src/User/user.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
