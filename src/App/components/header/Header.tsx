import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import logo from '../../../assets/logo.svg'
import coin from '../../../assets/icons/coin.svg'
import {getUser, addCoins} from '../api/api'
import headerImg from '../../../assets/header.png'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ProductsContext } from '../contexto/ProductsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faAdd } from '@fortawesome/free-solid-svg-icons'
import ClipLoader from "react-spinners/ClipLoader";

const Header = () => {

    const {user,setUser, buying, setBuying} = useContext(ProductsContext)
    const [visible, setVisible] = useState<boolean>(false)


      useEffect(()=>{
        getUser().then((res) => {
        setUser(res)
        })
      },[user])

      const handleAdd = (amount:number) => {
        setBuying(true)
        addCoins(amount).then(()=>{
          getUser().then(res=>{
            setUser(res)
          }).finally(()=>{
            setBuying(false)
          })
        })
      }

  return (
    <>
  <header className={styles.headerContainer}>
    
    <div className={styles.header}>
        <NavLink to={'/'}><img className={styles.kiteImg} src={logo} alt="" /></NavLink>
        <div className={styles.userInfo}>
        {visible ? <div className={styles.coinManagement}>
            <div className={styles.top}> <p>Add coins</p> <button onClick={()=>{setVisible(false)}}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon> </button></div>
            <div className={styles.text}>Please, select the amount of coins you want to add to your account</div>
            <div className={styles.buttonsContainer}>
              <button disabled={buying ? true: false} onClick={()=>{handleAdd(1000)}}>{buying ? <ClipLoader size={20}/> : "1000"}</button>
              <button disabled={buying ? true: false} onClick={()=>{handleAdd(5000)}}>{buying ? <ClipLoader size={20}/> : "5000"}</button>
              <button disabled={buying ? true: false} onClick={()=>{handleAdd(7500)}}>{buying ? <ClipLoader size={20}/> : "7500"}</button>
            </div>
        </div> : <></>}
          <p className={styles.username}>{user ? user.name : ""}</p>
          <div className={styles.userCoins}>
           
          <img src={coin} alt="coins" /> <p>{user ? user.points : ""}</p>
          </div>
          <button onClick={()=>{setVisible(!visible)}} className={styles.addButton}> <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> </button>
        </div>
    </div>
    
    
  </header>
  <div className={styles.imageContainer} >
           <h3 className={styles.title}>Electronics</h3>
           <img className={styles.headerImg} src={headerImg} alt="" />
        </div>
    
    </>
  )
}

export default Header