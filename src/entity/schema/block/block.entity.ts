import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../base-entity.entity";
import { AccountRoles } from "../account/account-roles.entity";
import { SubBlock } from "./sub-block.entity";

@Entity({ name: "block" })
export class Block extends BaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @OneToMany(() => SubBlock, (subBlock) => subBlock.block, { eager: true })
  subBlocks: SubBlock[];
}
