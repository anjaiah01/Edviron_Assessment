import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get()
  async getAll() {
    return this.service.getAllTransactions();
  }

  @Get(':schoolId')
  async getBySchool(@Param('schoolId') schoolId: string) {
    return this.service.getTransactionsBySchool(schoolId);
  }

  @Post('status')
  async getStatus(@Body() body: { custom_order_id: string }) {
    return this.service.checkTransactionStatus(body.custom_order_id);
  }
}
