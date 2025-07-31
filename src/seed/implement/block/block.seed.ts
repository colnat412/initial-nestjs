import { Block } from "src/entity/schema/block/block.entity";
import { DataSource } from "typeorm";

export async function seedBlocks(dataSource: DataSource) {
  const blockRepo = dataSource.getRepository(Block);

  const blocks = [
    { name: "A", description: "Block A" },
    { name: "B", description: "Block B" },
    { name: "C", description: "Block C" },
    { name: "D", description: "Block D" },
  ];

  for (const blockData of blocks) {
    const exists = await blockRepo.findOneBy({ name: blockData.name });

    if (!exists) {
      const block = blockRepo.create(blockData);
      await blockRepo.save(block);
    }
  }
  console.log(`Seeded: Blocks`);
}
