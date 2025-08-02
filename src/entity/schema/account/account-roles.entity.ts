import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { Role } from "./role.entity";
import { Account } from "./account.entity";
import { BaseEntity } from "src/entity/base-entity.entity";
import { ScopeType } from "src/entity/enum/scope-type";

@Entity("account_roles")
export class AccountRoles extends BaseEntity {
  @ManyToOne(() => Account, (account) => account.accountRoles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  account: Account;

  @ManyToOne(() => Role, (role) => role.accountRoles, { eager: true })
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ type: "enum", enum: ScopeType, name: "scope_type" })
  scopeType: ScopeType;

  @Column({ nullable: true, type: "uuid", default: null, name: "scope_id" })
  scopeId: string | null;
}
