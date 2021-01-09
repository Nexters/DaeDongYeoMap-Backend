import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello 데동여지도 🗺️❤️!";
  }
}
