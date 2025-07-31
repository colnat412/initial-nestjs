import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";
import { AccountRoles } from "./account-roles.entity";
import { BaseEntity } from "src/entity/base-entity.entity";

@Entity({ name: "account" })
export class Account extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", length: 15 })
  phone: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToOne(() => Profile, (profile) => profile.account, { cascade: true })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @OneToMany(() => AccountRoles, (accountRoles) => accountRoles.account)
  accountRoles: AccountRoles[];
}
