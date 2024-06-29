import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamPaperDto } from './dto/create-exam-paper.dto';
import { UpdateExamPaperDto } from './dto/update-exam-paper.dto';

type CreateExamPaperArgs = {
  data: CreateExamPaperDto;
  organizationId: string;
};

type GetExamByIdArgs = {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
};

type GetAllExamsArgs = {
  page: number;
  pageSize: number;
  search: string;
  organizationId: string;
  userId: string;
  role: string;
};

type UpdateExamPaperArgs = {
  data: UpdateExamPaperDto;
  id: string;
};

type DeleteExamPaperArgs = {
  id: string;
};

const defaultSelect = {
  id: true,
  name: true,
  accessEnd: true,
  accessStart: true,
  exam: {
    select: {
      id: true,
      name: true,
    },
  },
};

@Injectable()
export class ExamPaperService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllExamPaper({
    page,
    pageSize,
    search,
    organizationId,
    role,
    userId,
  }: GetAllExamsArgs) {
    const exam = {};

    if (role === 'INVIGILATOR') {
      exam['invigilators'] = {
        some: {
          userId: userId,
        },
      };
    }

    const [papers, count] = await Promise.all([
      this.prisma.exam_paper.findMany({
        where: {
          name: {
            contains: search,
          },
          organizationId,
          exam: exam,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        select: defaultSelect,
      }),
      this.prisma.exam_paper.count({
        where: {
          name: {
            contains: search,
          },
          organizationId,
          exam: exam,
        },
      }),
    ]);

    return { papers, count };
  }

  async getExamPaperById({
    id,
    organizationId,
    role,
    userId,
  }: GetExamByIdArgs) {
    const exam = {};

    if (role === 'INVIGILATOR') {
      exam['invigilators'] = {
        some: {
          userId: userId,
        },
      };
    }

    const paper = await this.prisma.exam_paper.findUnique({
      where: {
        id: id,
        organizationId: organizationId,
        exam: exam,
      },
      select: defaultSelect,
    });

    return paper;
  }

  createExamPaper({ data, organizationId }: CreateExamPaperArgs) {
    return this.prisma.exam_paper.create({
      data: {
        accessEnd: data.accessEndTime,
        accessStart: data.accessStartTime,
        name: data.name,
        exam: {
          connect: {
            id: data.examId,
          },
        },
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      select: defaultSelect,
    });
  }

  updateExamPaper({ data, id }: UpdateExamPaperArgs) {
    return this.prisma.exam_paper.update({
      where: {
        id: id,
      },
      data: {
        accessEnd: data.accessEndTime,
        accessStart: data.accessStartTime,
        name: data.name,
      },
      select: defaultSelect,
    });
  }

  deleteExamPaper({ id }: DeleteExamPaperArgs) {
    return this.prisma.exam_paper.delete({
      where: {
        id: id,
      },
    });
  }
}
