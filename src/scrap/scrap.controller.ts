import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import fetch from 'node-fetch';
import xpathHtml from 'xpath-html';
import jsdom from 'jsdom';

export interface scrapPayloadFormat {
  url: string;
  customPath: string;
}

@Controller('scrap')
export class ScrapController {
  @Get()
  getScrap(): string {
    return 'Scrap';
  }

  @Post('/id')
  async getScrapById(@Body() params: scrapPayloadFormat) {
    if (params.url && params.customPath) {
      return fetch(params.url)
        .then((response) => response.text())
        .then((data) => {
          const domParser = new jsdom.JSDOM(data);
          return domParser.window.document.querySelector(
            `#${params.customPath}`,
          ).textContent;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('One or the two elements are undefined');
    }
  }

  @Post('/class')
  async getScrapByClass(@Body() params: scrapPayloadFormat) {
    if (params.url && params.customPath) {
      return fetch(params.url)
        .then((response) => response.text())
        .then((data) => {
          const domParser = new jsdom.JSDOM(data);
          return domParser.window.document.querySelector(
            `.${params.customPath}`,
          ).textContent;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('One or the two elements are undefined');
    }
  }

  @Post('/xpath')
  async getScrapAnySite(@Body() params: scrapPayloadFormat) {
    try {
      if (params.url && params.customPath) {
        return fetch(params.url)
          .then((response) => response.text())
          .then((data) => {
            console.log(
              xpathHtml.fromPageSource(data).findElements(params.customPath),
            );
            const nodes = xpathHtml
              .fromPageSource(data)
              .findElements(params.customPath);
            //console.log(`${nodes}`);
            return nodes;
          });
      } else {
        console.log('One or the two elements are undefined');
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'One or the two elements are undefined',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.log('error');
    }
  }
}
