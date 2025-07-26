import { Injectable, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";
import { seedRoles } from "./implement/role.seed";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    seedRoles(this.dataSource);
  }
}
