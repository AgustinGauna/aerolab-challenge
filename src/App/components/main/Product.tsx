import React, { FC, useContext, useState } from 'react'
import { ProductComponent } from '../../types/types'
import styles from './Products.module.css'
import buyblue from '../../../assets/icons/buy-blue.svg'
import buywhite from '../../../assets/icons/buy-white.svg'
import coin from '../../../assets/icons/coin.svg'
import {Product} from '../../types/types'
import { redeemProduct } from '../api/api'
import { ProductsContext } from '../contexto/ProductsContext'
import ClipLoader from "react-spinners/ClipLoader";

const Product: FC<ProductComponent> = ({parameter1, parameter2}) => {

    const { productState, user, buying, setBuying} = useContext(ProductsContext);
    const {products} = productState
    const [dropdown, setDropDown] = useState<null | number>(null);
    
    const handleDropdown = (index:number) =>{
        setDropDown(value => value === index ? null : index);
      }
      const handleRedeem = (id:string) => {
        setBuying(true)
          redeemProduct(id).finally(()=>{
            setBuying(false)
          })
      }
  return (
    <div className={styles.container}>
        {products ? products.slice(parameter1,parameter2).map((product: Product, index:number) => {
          return (
            <div onMouseEnter={() => handleDropdown(index)} onMouseLeave={() => handleDropdown(index)}  className={styles.producto} key={product._id}>
              {user.points >= product.cost ?   <img className={styles.bagIcon} src={index === dropdown ? buywhite:buyblue} alt="" /> : <div className={styles.error}>You need {product.cost - user.points}<img src={coin} alt="coin" /></div> }
              <div  className={index === dropdown ? styles.redeem : styles.hidden} >
                  <div className={styles.productCost}>
                  <p>{product.cost}</p>
                  <img src={coin} alt="coin" />
                  </div>
                  <button disabled={(buying === false && user.points >= product.cost) === true ? false : true} onClick={user.points >= product.cost ? ()=>{handleRedeem(product._id)} : ()=>{}}>{buying ? <ClipLoader size={20}/> : "Redeem"}</button>
              </div>
              <img className={styles.productImg} src={product.img.url} alt="" />       
              <div className={styles.border}></div>
              <div className={styles.productInfo}>
              <h2>{product.name}</h2>
              <h3>{product.category}</h3>
              </div>
            </div>     
        )
        }) : 
        <div className={styles.spinner}>
            
        </div>
        } 
  
      </div>
  )
}

export default Product