import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BasicPasswordMiddleware, LoggerMiddleware } from './middleware';
import { DatabaseModule } from './database/database.module';
import { TamagotchiModule } from './modules/cmd/tamagotchi/tamagotchi.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, 
            TamagotchiModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get("PORT") ?? 3000;
  }
  // Middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, BasicPasswordMiddleware)
      .exclude({ path: "favicon.ico", method: RequestMethod.GET })
      .forRoutes({ path:"*path", method:RequestMethod.ALL});
  }
}
