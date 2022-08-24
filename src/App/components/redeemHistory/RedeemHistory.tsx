import React, {useState, useEffect, useContext} from 'react'
import styles from './RedeemHistory.module.css'
import { redeemHistory } from '../api/api'
import { Product, User } from '~/App/types/types'
import moment from "moment";   
import coin from '../../../assets/icons/coin.svg'
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

const RedeemHistory = () => {

  const [redeemed, setRedeemed] = useState<Product[]>([])
  const [clicked, setClicked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [moreProducts, setMoreProducts] = useState<boolean>(false)
  const [parameter, setParameter] = useState<number>(20)

  useEffect(()=>{
    redeemHistory().then((res)=>{
      setRedeemed(res.data.reverse().slice(0,10))
    }).finally(()=>setLoading(false))
  },[])
  
  const loadMore = () => {
    console.log("asd")
    setParameter(parameter + 10)
    setMoreProducts(true)
    redeemHistory().then((res)=>{
      setRedeemed(res.data.reverse().slice(0,parameter))
    }).finally(()=>{
      setClicked(true)
      setMoreProducts(false)
    })
  }

  return (
    <div className={styles.center}>
      <h1>Your Orders</h1>
      <div className={styles.container}>{loading ? <PulseLoader className={styles.spinner} /> : redeemed.map((product,index)=>{
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
    })}</div>
    {loading ? "" : <button disabled={moreProducts === true ? true : false} className={styles.moreButton} onClick={()=>{loadMore()}}>{moreProducts ? <ClipLoader/> : "Más..."}</button>
}
    </div>
  )
}

export default RedeemHistory