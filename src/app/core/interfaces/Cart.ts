import { Data } from "./Data"

export interface Cart {
    status: string
    numOfCartItems: number
    cartId: string
    data: Data
}