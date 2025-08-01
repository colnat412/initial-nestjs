import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CreateSubBlock_RequestDto,
  UpdateSubBlock_RequestDto,
} from "./dto/request.dto";
import {
  CreateSubBlock_ResponseDto,
  GetSubBlockByBlockId_ResponseDto,
  GetSubBlockById_ResponseDto,
} from "./dto/response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Block } from "src/entity/schema/block/block.entity";
import { Not, Repository } from "typeorm";
import { SubBlock } from "src/entity/schema/block/sub-block.entity";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SubBlockService {
  constructor(
    @InjectRepository(Block) private blockRepository: Repository<Block>,
    @InjectRepository(SubBlock)
    private subBlockRepository: Repository<SubBlock>,
  ) {}

  async create(
    data: CreateSubBlock_RequestDto,
  ): Promise<CreateSubBlock_ResponseDto> {
    const block = await this.blockRepository.findOne({
      where: { id: data.blockId },
    });
    if (!block) {
      throw new NotFoundException("Block not found");
    }

    const existingSubBlock = await this.subBlockRepository.findOne({
      where: { name: data.name, block: { id: data.blockId } },
    });
    if (existingSubBlock) {
      throw new ConflictException("SubBlock with this name already exists");
    }

    const subBlock = this.subBlockRepository.create({
      ...data,
      block,
    });
    await this.subBlockRepository.save(subBlock);
    return subBlock;
  }

  async update(
    id: string,
    data: UpdateSubBlock_RequestDto,
  ): Promise<CreateSubBlock_ResponseDto> {
    const subBlock = await this.subBlockRepository.findOne({
      where: { id },
      relations: ["block"],
    });
    if (!subBlock) {
      throw new NotFoundException("SubBlock not found");
    }

    const existingSubBlock = await this.subBlockRepository.findOne({
      where: { name: data.name, id: Not(id), block: { id: subBlock.block.id } },
    });
    if (existingSubBlock) {
      throw new ConflictException("SubBlock with this name already exists");
    }

    Object.assign(subBlock, data);
    await this.subBlockRepository.save(subBlock);
    return subBlock;
  }

  async delete(id: string): Promise<{ id: string; message: string }> {
    const subBlock = await this.subBlockRepository.findOne({ where: { id } });
    if (!subBlock) {
      throw new NotFoundException("SubBlock not found");
    }
    await this.subBlockRepository.remove(subBlock);
    return {
      id: subBlock.id,
      message: "SubBlock deleted successfully",
    };
  }

  async getSubBlockById(id: string): Promise<GetSubBlockById_ResponseDto> {
    const subBlock = await this.subBlockRepository.findOne({
      where: { id },
      relations: ["block"],
    });
    if (!subBlock) {
      throw new NotFoundException("SubBlock not found");
    }
    return plainToInstance(GetSubBlockById_ResponseDto, subBlock, {
      excludeExtraneousValues: true,
    });
  }

  async getSubBlocksByBlockId(
    blockId: string,
  ): Promise<GetSubBlockByBlockId_ResponseDto[]> {
    const subBlocks = await this.subBlockRepository.find({
      where: { block: { id: blockId } },
    });
    return subBlocks.map((subBlock) => ({
      id: subBlock.id,
      name: subBlock.name,
      createdAt: subBlock.createdAt,
      updatedAt: subBlock.updatedAt,
      deletedAt: subBlock.deletedAt,
      blockId: subBlock.block.id,
    }));
  }
}
