import { SortBy } from "../../domain/enums/sortBy.enum";

export interface IRead<T> {
  getAll: (sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string) => Promise<T[]>;
  getById: (_id : string) => Promise<T | null>;
}
