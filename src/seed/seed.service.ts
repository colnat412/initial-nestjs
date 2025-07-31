import { Injectable, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";
import { seedRoles } from "./implement/role.seed";
import { seedBlocks } from "./implement/block/block.seed";
import { seedSubBlocks } from "./implement/block/sub-block.seed";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const isDropDatabase = this.configService.get<boolean>(
      "DATABASE_DROP_SCHEMA",
    );

    if (isDropDatabase) {
      await seedRoles(this.dataSource);

      await seedBlocks(this.dataSource);
      await seedSubBlocks(this.dataSource);
    }
  }
}
