import {User, Product} from './../../types/types';
import axios from 'axios';



const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`
  }

  export const getUser = async (): Promise<User> => {
    const user = await fetch('https://coding-challenge-api.aerolab.co/user/me', {headers})
      .then((res) => res.json())
      .catch(() => console.log("Error"));
  
    return user;
  };

  export const getAllProducts = async (): Promise<Product[]> => {
    const products = await fetch('https://coding-challenge-api.aerolab.co/products', {headers})
      .then((res) => res.json())
      .catch(() => console.log("Error"));
    return products;
  };

  export const addCoins = (amount:number):Promise<any> => {
    const coins = axios({
      method: 'post',
      url: 'https://coding-challenge-api.aerolab.co/user/points',
      headers: headers, 
      data: {
        amount: amount
      }
    });
    return coins
  }

  export const redeemProduct = (productId:string):Promise<any> => {
    const redeemedProduct = axios({
      method: 'post',
      url: 'https://coding-challenge-api.aerolab.co/redeem',
      headers: headers, 
      data: {
        "productId": productId
      }
    });
    return redeemedProduct
  }

  export const redeemHistory = ():Promise<any> => {
    const history = axios({
      method: 'get',
      url: 'https://coding-challenge-api.aerolab.co/user/history',
      headers: headers,
    })
    return history
    }