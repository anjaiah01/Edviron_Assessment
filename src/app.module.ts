import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions-module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('your-mongodb-uri'),
    TransactionsModule,
    AuthModule,
  ],
})
export class AppModule {}
