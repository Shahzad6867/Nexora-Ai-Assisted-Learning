import { Course } from "../../domain/entities/course.entity";
import { SortBy } from "../../domain/enums/sortBy.enum";
import { ICourseRepository } from "../../domain/repositories/course.repository";
import CourseModel, { ICourseDocument } from "../mongodb/models/course.model";
import { BaseRepository } from "./base/base.repository";

export class CourseRepository extends BaseRepository<ICourseDocument> implements ICourseRepository {
  async getAll(
    sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ) {
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
    if (
      search !== undefined &&
      skip !== undefined &&
      itemsPerPage !== undefined
    ) {
      return await CourseModel.find({
        $or: [
          { course_name: { $regex: search, $options: "i" } },
          { course_id: { $regex: search, $options: "i" } },
        ],
      })
        .sort(sortQuery)
        .skip(skip)
        .limit(itemsPerPage);
    }
    if (skip !== undefined && itemsPerPage !== undefined) {
      return await CourseModel.find({}).sort(sortQuery).skip(skip).limit(itemsPerPage);
    }
    return await CourseModel.find({}).sort(sortQuery);
  }
  async getById(course_id: string) {
    return await CourseModel.findOne({ course_id });
  }
  async getCoursesByInstitutionId(
    institution_id : string
  ): Promise<ICourseDocument[]> {
    return await CourseModel.find({institution_id});
  }
  async create(course: Course): Promise<ICourseDocument> {
    const newCourse = await CourseModel.create({
        institution_id : course.institution_id,
        course_id : course.course_id,
        course_name : course.course_name,
        course_subtitle : course.course_subtitle,
        description : course.description,
        course_category : course.course_category,
        course_banner : course.course_banner ?? null,
        price : course.price,
        price_per_module : course.price_per_module,
        is_archived : course.is_archived,
        is_published : course.is_published,
        is_approved : course.is_approved,
    });
    return newCourse;
  }
  async update(course_id : string,course: Course): Promise<ICourseDocument | null> {
    return await CourseModel.findOneAndUpdate({ course_id }, course,{returnDocument : "after"});
  }
}
