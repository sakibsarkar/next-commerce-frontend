import { IProduct } from "./product"


export interface ICoupon{
    id:string
    code:string
    discount:number
    productId:string
    productInfo?:IProduct
    createdAt:string
    updatedAt:string
}