import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Block } from "src/entity/schema/block/block.entity";
import { ILike, Like, Not, Repository, IsNull } from "typeorm";
import {
  CreateBlock_RequestDto,
  PaginatedBlock_RequestDto,
  UpdateBlock_RequestDto,
} from "./dto/request.dto";
import {
  CreateBlock_ResponseDto,
  DeleteBlock_ResponseDto,
  GetBlock_ResponseDto,
  GetBlockActive_ResponseDto,
  PaginatedBlock_ResponseDto,
  UpdateBlock_ResponseDto,
} from "./dto/response.dto";
import { PaginationQueryDto } from "src/common/dto/swagger-schema/pagination/pagination.dto";
import { PaginatedResponseDto } from "src/common/dto/swagger-schema/pagination/pagination-response.dto";

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block) private blockRepository: Repository<Block>,
  ) {}

  async create(data: CreateBlock_RequestDto): Promise<CreateBlock_ResponseDto> {
    const find = await this.blockRepository.findOne({
      where: { name: data.name },
    });
    if (find) {
      throw new ConflictException("Block with this name already exists");
    }
    const block = this.blockRepository.create(data);
    await this.blockRepository.save(block);
    return block;
  }

  async update(
    id: string,
    data: UpdateBlock_RequestDto,
  ): Promise<UpdateBlock_ResponseDto> {
    const block = await this.blockRepository.findOne({ where: { id } });
    if (!block) {
      throw new NotFoundException("Block not found");
    }

    const exists = await this.blockRepository.findOne({
      where: { name: data.name, id: Not(id) },
    });
    if (exists) {
      throw new ConflictException("Block with this name already exists");
    }
    Object.assign(block, data);
    await this.blockRepository.save(block);
    return {
      id: block.id,
      name: block.name,
      createdAt: block.createdAt,
      updatedAt: block.updatedAt,
      deletedAt: block.deletedAt,
    };
  }

  async delete(id: string): Promise<DeleteBlock_ResponseDto> {
    const block = await this.blockRepository.findOne({ where: { id } });
    if (!block) {
      throw new NotFoundException("Block not found");
    }
    await this.blockRepository.remove(block);
    return {
      id: block.id,
      message: "Block deleted successfully",
    };
  }

  async getBlock(id: string): Promise<GetBlock_ResponseDto> {
    const block = await this.blockRepository.findOne({ where: { id } });
    if (!block) {
      throw new NotFoundException("Block not found");
    }
    return {
      id: block.id,
      name: block.name,
      createdAt: block.createdAt,
      updatedAt: block.updatedAt,
      deletedAt: block.deletedAt,
    };
  }

  async pagination(
    paginationQuery: PaginationQueryDto,
    filter: PaginatedBlock_RequestDto,
  ): Promise<PaginatedResponseDto<PaginatedBlock_ResponseDto>> {
    const {
      offset,
      limit,
      page,
      sortBy = "createdAt",
      sortOrder,
    } = paginationQuery;

    const [items, total] = await this.blockRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { [sortBy]: sortOrder },
      where: {
        name: ILike(`%${filter.name}%`),
      },
    });

    const data: PaginatedBlock_ResponseDto[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      deletedAt: item.deletedAt,
    }));

    return {
      items: data,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getActiveBlock(): Promise<GetBlockActive_ResponseDto[]> {
    const blocks = await this.blockRepository.find({
      where: { deletedAt: IsNull() },
    });

    if (!blocks || blocks.length === 0) {
      throw new NotFoundException("No active block found");
    }

    return blocks.map((block) => ({
      id: block.id,
      name: block.name,
      createdAt: block.createdAt,
      updatedAt: block.updatedAt,
      deletedAt: block.deletedAt,
    }));
  }
}
