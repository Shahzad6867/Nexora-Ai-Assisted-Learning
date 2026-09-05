import { PipelineStage } from "mongoose";
import { Instructor } from "../../domain/entities/instructor.entity";
import { Roles } from "../../domain/enums/roles.enum";
import { IInstructorRepository } from "../../domain/repositories/instructor.repository";
import InstructorModel, {
  IInstructorDocument,
} from "../mongodb/models/instructor.model";
import { SortBy } from "../../domain/enums/sortBy.enum";
import { BaseRepository } from "./base/base.repository";

export class InstructorRepository extends BaseRepository<IInstructorDocument> implements IInstructorRepository {
  async create(instructor: Instructor): Promise<IInstructorDocument> {
    const newInstructor = await InstructorModel.create(instructor);
    return newInstructor;
  }
  async getAll(
    sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ): Promise<IInstructorDocument[]> {
    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
    if (sortBy === SortBy.NEWEST) {
      sortQuery = { createdAt: -1 };
    } else if (sortBy === SortBy.OLDEST) {
      sortQuery = { createdAt: 1 };
    } else if (sortBy === SortBy.NAMEASC) {
      sortQuery = { first_name: 1 };
    } else if (sortBy === SortBy.NAMEDESC) {
      sortQuery = { first_name: -1 };
    }
    const query: PipelineStage[] = [
      {
        $lookup: {
          from: "institutions",
          foreignField: "institution_id",
          localField: "institution_id",
          as: "institution_id",
        },
      },
      {
        $unwind: "$institution_id",
      },
    ];
    if (search !== undefined) {
      query.unshift({
        $match: {
          $or: [
            { first_name: { $regex: search, $options: "i" } },
            { last_name: { $regex: search, $options: "i" } },
            { instructor_mail: { $regex: search, $options: "i" } },
            { instructor_id: { $regex: search, $options: "i" } },
            { personal_email: { $regex: search, $options: "i" } },
          ],
        },
      });
    }
    query.push({$sort : sortQuery})
    if (skip !== undefined && itemsPerPage !== undefined) {
      query.push({
        $skip: skip,
      });
      query.push({
        $limit: itemsPerPage,
      });
    }
    return await InstructorModel.aggregate(query);
  }
  async getByEmail(
    instructor_mail: string,
    role?: Roles.INSTRUCTOR
  ): Promise<IInstructorDocument | null> {
    const query = role
      ? {
          instructor_mail,
          role,
        }
      : {
          instructor_mail,
        };
    return await InstructorModel.findOne(query);
  }
  async getByInstitutionId(
    institution_id: string
  ): Promise<IInstructorDocument[]> {
    return await InstructorModel.find({ institution_id });
  }
  async getById(instructor_id: string): Promise<IInstructorDocument | null> {
    return await InstructorModel.findOne({ instructor_id: instructor_id });
  }
  async update(instructor_id : string,instructor: Instructor): Promise<IInstructorDocument | null> {
    return await InstructorModel.findOneAndUpdate(
      { instructor_id },
      instructor,
      { returnDocument: "after" }
    );
  }
}
