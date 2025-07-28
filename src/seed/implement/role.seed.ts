import { RoleEnum } from "src/entity/enum/role.enum";
import { Role } from "src/entity/schema/role.entity";
import { DataSource } from "typeorm";

export async function seedRoles(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(Role);

  const roles = Object.values(RoleEnum);

  for (const roleName of roles) {
    const exists = await roleRepo.findOneBy({ name: roleName });

    if (!exists) {
      const role = roleRepo.create({
        name: roleName,
        description: `${roleName} role`,
      });
      await roleRepo.save(role);
    }
  }
  console.log(`Seeded: Roles`);
}
