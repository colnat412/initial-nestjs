import { Module } from "@nestjs/common";
import { SubBlockService } from "./sub-block.service";
import { SubBlockController } from "./sub-block.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubBlock } from "src/entity/schema/block/sub-block.entity";
import { Block } from "src/entity/schema/block/block.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Block, SubBlock])],
  controllers: [SubBlockController],
  providers: [SubBlockService],
})
export class SubBlockModule {}
