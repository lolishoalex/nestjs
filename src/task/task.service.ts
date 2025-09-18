import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.log('CRON task execute every 10 seconds');
  }

  @Interval(1000)
  handleInterval() {
    this.logger.log('Interval task every 1 second');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.log('Timeout task every 5 seconds after start');
  }
}
