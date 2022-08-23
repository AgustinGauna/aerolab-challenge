import React, {useEffect, useState, createContext} from 'react'
import { ChildrenProps, ProductsState, User} from '../../types/types'

export type ProductsContextProps = {
  productState: ProductsState,
  setProductOrder: React.Dispatch<React.SetStateAction<"getProducts" | "getHighestProducts" | "getLowestProducts">>,
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  buying: boolean
  setBuying: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

}

export const ProductsContext = createContext<ProductsContextProps>({} as ProductsContextProps);

