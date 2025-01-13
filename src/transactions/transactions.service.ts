import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>) {}

  async getAllTransactions() {
    return this.transactionModel.find().exec();
  }

  async getTransactionsBySchool(schoolId: string) {
    return this.transactionModel.find({ school_id: schoolId }).exec();
  }

  async checkTransactionStatus(customOrderId: string) {
    return this.transactionModel.findOne({ custom_order_id: customOrderId }).exec();
  }
}
