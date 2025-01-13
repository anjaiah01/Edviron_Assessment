import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/User/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user.
   * @param username - The username of the user.
   * @param password - The plain text password of the user.
   */
  async register(username: string, password: string): Promise<User> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  /**
   * Validates user credentials.
   * @param username - The username of the user.
   * @param password - The plain text password of the user.
   */
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  /**
   * Logs in the user and generates a JWT token.
   * @param user - The user object.
   */
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Finds a user by their username.
   * @param username - The username of the user.
   */
  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }
}
