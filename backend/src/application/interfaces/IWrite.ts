import { UpdateQuery } from "mongoose"

export interface IWrite<T> {
    create : (data : Partial<T>) => Promise<T>
    update : (_id : string,data : UpdateQuery<T>) => Promise<T | null>
}