import React, {useState, useEffect, useContext} from 'react'
import styles from './RedeemHistory.module.css'
import { redeemHistory } from '../api/api'
import { Product, User } from '~/App/types/types'
import moment from "moment";   
import coin from '../../../assets/icons/coin.svg'
import InfiniteScroll from 'react-infinite-scroller';

const RedeemHistory = () => {

  const [redeemed, setRedeemed] = useState<Product[]>([])
 

  useEffect(()=>{
    redeemHistory().then((res)=>{
      setRedeemed(res.data.reverse())
    })
  },[])
  

  return (
    <div className={styles.center}>
      <h1>Your Orders</h1>
      <div className={styles.container}>{redeemed ? redeemed.map((product,index)=>{
      return(
        <div className={styles.product} key={index} >
            <img className={styles.productImg} src={product.img.url} alt="" />       
            <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <h4>{product.category}</h4>
            </div>
            <div className={styles.date}>
              <h3>Redeem date:</h3>
              <h4>{moment(product.createDate, 'YYYY-MM-DD hh:mm:ss').format('MM-DD-YYYY').replace(/-/g,'/')}</h4>
              <h4>{product.createDate?.slice(11,19)}</h4>
            </div>
            <div className={styles.cost}>
              <h4>{product.cost}</h4>
              <img src={coin} alt="" />
            </div>
        </div>
      )
    }): ""}</div>
    </div>
  )
}

export default RedeemHistory