import { IdPrefix } from "../../domain/enums/idPrefix.enum";

export interface IEntityIdGenerator {
    generate : (prefix : IdPrefix ) => string
}

