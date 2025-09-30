import { Module } from '@nestjs/common';
import { TamagotchiService } from './tamagotchi.service';
import { TamagotchiController } from './tamagotchi.controller';

@Module({
  imports: [],
  controllers: [TamagotchiController],
  providers: [TamagotchiService]
})
export class TamagotchiModule {}
