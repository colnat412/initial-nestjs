import { Block } from "src/entity/schema/block/block.entity";
import { SubBlock } from "src/entity/schema/block/sub-block.entity";
import { DataSource } from "typeorm";

export async function seedSubBlocks(dataSource: DataSource) {
  const blockRepo = dataSource.getRepository(Block);
  const subBlockRepo = dataSource.getRepository(SubBlock);

  const blocks = await blockRepo.find();
  const subBlocks = [
    { name: "A-01", description: "Block A SubBlock 01", block: blocks[0] },
    { name: "A-02", description: "Block A SubBlock 02", block: blocks[0] },
    { name: "B-01", description: "Block B SubBlock 01", block: blocks[1] },
    { name: "B-02", description: "Block B SubBlock 02", block: blocks[1] },
  ];
  for (const subBlockData of subBlocks) {
    const exists = await subBlockRepo.findOneBy({ name: subBlockData.name });

    if (!exists) {
      const subBlock = subBlockRepo.create(subBlockData);
      await subBlockRepo.save(subBlock);
    }
  }
  console.log(`Seeded: SubBlocks`);
}
