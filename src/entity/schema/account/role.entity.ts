import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AccountRoles } from "./account-roles.entity";
import { BaseEntity } from "src/entity/base-entity.entity";
import { RoleEnum } from "src/entity/enum/role.enum";

@Entity({ name: "role" })
export class Role extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true, enum: RoleEnum })
  name: RoleEnum;

  @Column({ type: "text", nullable: false, default: "" })
  description: string;

  @OneToMany(() => AccountRoles, (accountRoles) => accountRoles.role)
  accountRoles: AccountRoles[];
}
