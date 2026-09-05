import { Document, Model, UpdateQuery } from "mongoose";
import { IRead } from "../../../application/interfaces/IRead";
import { IWrite } from "../../../application/interfaces/IWrite";
import { SortBy } from "../../../domain/enums/sortBy.enum";

export abstract class BaseRepository<T extends Document>
  implements IWrite<T>, IRead<T>
{
  constructor(protected readonly model: Model<T>) {
    this.model = model;
  }

  create(data: Partial<T>): Promise<T> {
    return this.model.create(data)
  }
  update(_id: string, data: UpdateQuery<T>): Promise<T | null> {
    const filter = {_id}
    return this.model.findOneAndUpdate(filter as any,data,{new : true})
  }
  getById(_id: string): Promise<T | null> {
    return this.model.findById(_id)
  }
  getAll(sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string): Promise<T[]> {
    return this.model.find()
  }
}
