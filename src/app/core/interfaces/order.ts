import { CartItem } from "./CartItem"
import { User } from "./user"

export interface Order {
   taxPrice: number
   shippingPrice: number
   totalOrderPrice: number
   paymentMethodType: string
   isPaid: boolean
   isDelivered: boolean
   _id: string
   user: User
   cartItems: CartItem[]
   paidAt: string
   createdAt: string
   updatedAt: string
   id: number
   __v: number
}
