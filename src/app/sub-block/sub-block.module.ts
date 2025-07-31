import { Module } from "@nestjs/common";
import { SubBlockService } from "./sub-block.service";
import { SubBlockController } from "./sub-block.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubBlock } from "src/entity/schema/block/sub-block.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SubBlock])],
  controllers: [SubBlockController],
  providers: [SubBlockService],
})
export class SubBlockModule {}
