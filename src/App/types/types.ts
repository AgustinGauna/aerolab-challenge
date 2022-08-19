
export interface Product {
      category: string,
      cost: number,
      img: {
        hdUrl: string,
        url: string,
      },
      name: string,
      _id: string,
      createDate?: string
  }

export interface ProductsState  {
    products: Product[]
}


export interface User  {
    createDate: string,
    name: string,
    points: number,
    redeemHistory: Product[],
    __v: number,
    _id: string
}

// context children props
export type ChildrenProps = {
  children: JSX.Element | JSX.Element[]
 }

 //Product component types
 export type ProductComponent = {
    parameter1: number
    parameter2: number
 }