import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../base-entity.entity";
import { RoleEnum } from "../enum/role.enum";

@Entity({ name: "role" })
export class Role extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true, enum: RoleEnum })
  name: RoleEnum;

  @Column({ type: "text", nullable: false, default: "" })
  description: string;
}
