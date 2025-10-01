import { Module } from '@nestjs/common';
import { ApisService } from './apis.service';
import { ApisController } from './apis.controller';

@Module({
  imports: [],
  controllers: [ApisController],
  providers: [ApisService]
})
export class ApisModule {}