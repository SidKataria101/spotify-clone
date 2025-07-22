import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(private readonly devConfigService: DevConfigService,
    @Inject('CONFIG') 
    private readonly config: {port: number},
  ) {}
  getHello(): string {
    return `Hello Sid! I'm ${this.devConfigService.getDBHost()} at port ${this.config.port}`;
  }
}
