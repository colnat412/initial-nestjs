import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Account } from "./account.entity";
import { BaseEntity } from "src/entity/base-entity.entity";

@Entity({ name: "profile" })
export class Profile extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
    name: "full_name",
    nullable: false,
    default: "",
  })
  fullName: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default: "",
  })
  avatarUrl: string;

  @Column({
    type: "date",
    name: "date_of_birth",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateOfBirth: Date;

  @Column({
    type: "enum",
    enum: ["male", "female"],
    nullable: false,
    default: "male",
  })
  gender: "male" | "female";

  @OneToOne(() => Account, (account) => account.profile)
  @JoinColumn({ name: "account_id" })
  account: Account;
}
