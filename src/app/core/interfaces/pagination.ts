import { MetaData } from "./MetaData"
import { Product } from "./product"

export interface Pagination<T> {
   results: number
   metadata: MetaData
   data: T[]
}

