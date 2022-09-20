import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapController } from './scrap/scrap.controller';

@Module({
  imports: [],
  controllers: [AppController, ScrapController],
  providers: [AppService],
})
export class AppModule {}
