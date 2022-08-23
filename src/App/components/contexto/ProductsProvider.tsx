import React, {useReducer, useEffect, useState} from 'react'
import { ProductsContext } from './ProductsContext'
import { ChildrenProps, ProductsState, User} from '../../types/types'
import {getAllProducts} from '../api/api'
import useProducts from '../hooks/useProducts'

export const ProductsProvider = ({ children } : ChildrenProps) => {
  
    const [productState, dispatch] = useProducts()
    const [productOrder, setProductOrder] = useState<"getProducts" | "getHighestProducts" | 'getLowestProducts' > ("getProducts")
    const [user, setUser] = useState<User>({
      createDate: "",
    name: "",
    points: 0,
    redeemHistory: [],
    __v: 0,
    _id: ""
    })
    const [buying, setBuying] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
      
      getAllProducts().then((res)=>{
          dispatch({type:'getProducts', payload: res})
        }).finally(()=>{
          setLoading(false)
        })
     
      },[])
      
      useEffect(()=>{
        if(productOrder === "getProducts"){
          dispatch({type:productOrder, payload: productState.products})
      } else if(productOrder === "getLowestProducts"){
        dispatch({type:productOrder, payload: productState.products})
      } else if(productOrder === 'getHighestProducts' ){
        dispatch({type:productOrder, payload: productState.products})
      }
    },[productOrder])

    
  return (
    <ProductsContext.Provider value={{
      productState,
      setProductOrder,
      user,
      setUser,
      buying,
      setBuying,
      loading,
      setLoading
      }}>
        {children}
    </ProductsContext.Provider>
  )
}

