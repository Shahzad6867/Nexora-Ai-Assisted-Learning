import { Roles } from "../../domain/enums/roles.enum";

export interface UpdateIsBlockedDTO {
    _id : string,
    role : Roles.STUDENT | Roles.INSTRUCTOR | Roles.INSTITUTION
}