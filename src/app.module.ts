import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BasicPasswordMiddleware, LoggerMiddleware } from './middleware';
import { DatabaseModule } from './database/database.module';
import { TamagotchiModule } from './modules/cmd/tamagotchi/tamagotchi.module';
import { ShortUrlModule } from './modules/url/shortUrl/shortUrl.module';
import { CamerasModule } from './modules/dgt/cameras/cameras.module';
import { PhotosModule } from './modules/dgt/photos/photos.module';
import { ApisModule } from './modules/www/apis/apis.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, 
            TamagotchiModule, ShortUrlModule, 
            CamerasModule, PhotosModule, ApisModule
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
