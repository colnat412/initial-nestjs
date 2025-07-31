import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../base-entity.entity";
import { Block } from "./block.entity";

@Entity({ name: "sub_block" })
export class SubBlock extends BaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @ManyToOne(() => Block, (block) => block.subBlocks, { nullable: false })
  @JoinColumn({ name: "block_id" })
  block: Block;
}
