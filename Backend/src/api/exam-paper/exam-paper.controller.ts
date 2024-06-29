import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/constants/roles';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { Role } from '../auth/decorator/role.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { CreateExamPaperDto } from './dto/create-exam-paper.dto';
import { UpdateExamPaperDto } from './dto/update-exam-paper.dto';
import { ExamPaperService } from './exam-paper.service';

@Controller('exam-paper')
export class ExamPaperController {
  constructor(private readonly examPaperService: ExamPaperService) {}

  @Get()
  @Role(Roles.INVIGILATOR)
  @UseGuards(JwtGuard, RoleGuard)
  async getAll(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @GetUser('organizationId') organizationId: string,
    @GetUser('userId') userId: string,
    @GetUser('role') role: string,
  ) {
    return this.examPaperService.getAllExamPaper({
      page: page,
      pageSize: pageSize,
      search: search,
      organizationId,
      userId: userId,
      role,
    });
  }

  @Get(':id')
  @Role(Roles.INVIGILATOR)
  @UseGuards(JwtGuard, RoleGuard)
  async getById(
    @Param('id') id: string,
    @GetUser('organizationId') organizationId: string,
    @GetUser('userId') userId: string,
    @GetUser('role') role: string,
  ) {
    return this.examPaperService.getExamPaperById({
      id: id,
      organizationId: organizationId,
      userId: userId,
      role,
    });
  }

  @Post()
  @Role(Roles.EXAMINER)
  @UseGuards(JwtGuard, RoleGuard)
  async create(
    @Body() data: CreateExamPaperDto,
    @GetUser('organizationId') organizationId: string,
  ) {
    return this.examPaperService.createExamPaper({
      data: data,
      organizationId: organizationId,
    });
  }

  @Put(':id')
  @Role(Roles.EXAMINER)
  @UseGuards(JwtGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() data: UpdateExamPaperDto) {
    return this.examPaperService.updateExamPaper({ data: data, id: id });
  }
}
