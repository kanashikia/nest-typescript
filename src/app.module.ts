import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapController } from './controllers/scrap/scrap.controller';
import { ScrapService } from './services/scrap/scrap.service';

@Module({
  imports: [],
  controllers: [AppController, ScrapController],
  providers: [AppService, ScrapService],
})
export class AppModule {}
