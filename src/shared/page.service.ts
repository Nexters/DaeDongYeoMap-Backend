import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PageInfo } from "./entities/pageinfo.entity";

@Injectable()
export class PageService {
  constructor(private configService: ConfigService) {}

  getPageInfo(
    size: number,
    page: number,
    count: number,
    is_end: boolean
  ): PageInfo {
    const maxKakaoItemSize: number = 45;
    const total_count: number = Math.min(maxKakaoItemSize, count);
    return {
      total_count,
      total_page_count: Math.ceil(total_count / size),
      is_end,
      cur_page: page,
    };
  }
}
