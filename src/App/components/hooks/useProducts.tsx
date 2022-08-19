import { useReducer, useState } from "react";
import { ProductsState, Product } from "../../types/types";

const INITIAL_STATE:ProductsState = {
    products: []
  }
  
  type ProductsAction = 
| {type: 'getProducts', payload: Product[]}
| {type: 'getHighestProducts', payload: Product[]}
| {type: 'getLowestProducts', payload: Product[]}

function shuffleArray(array:Product[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export const productsReducer = (state: ProductsState, action: ProductsAction): ProductsState => {
    switch (action.type) {
        case 'getProducts':
            const newArray = shuffleArray(action.payload)
            return { ...state, products: action.payload};
            
        case 'getLowestProducts':
            const priceProductsLowest:Product[] = action.payload.sort((a:Product, b:Product) => (a.cost - b.cost))
            return { ...state, products: priceProductsLowest };
    
        case 'getHighestProducts':
            const priceProductsHigher:Product[] = action.payload.sort((a:Product, b:Product) => (b.cost - a.cost))
            return { ...state, products: priceProductsHigher };
    }


}

const useProducts = () => {
    return useReducer(productsReducer, INITIAL_STATE)
}

export default useProducts