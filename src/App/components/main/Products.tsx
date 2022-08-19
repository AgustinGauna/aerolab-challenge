import React, { useState, useContext} from 'react'
import styles from './Products.module.css'
import { ProductsContext } from '../contexto/ProductsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../../assets/icons/arrow-right.svg'
import leftArrow from '../../../assets/icons/arrow-left.svg'
import Product from './Product'

const Products = () => {

  const {setProductOrder} = useContext(ProductsContext);
  const [parameter1,setParameter1] = useState(0)
  const [parameter2,setParameter2] = useState(16)
  const [activeButton, setActiveButton] = useState(1)

  const handlePage1 = () => {
    setParameter1(0)
    setParameter2(16)
  }
  const handlePage2 = () => {
    setParameter1(16)
    setParameter2(32)
  }

  return (
    <div className={styles.appContainer}>
        <div className={styles.utility}>
          <div className={styles.buttonsContainer}> 
            <p>Sort by: </p>
            <button className={activeButton === 1 ? styles.activeButton : styles.unactiveButton} onClick={()=>{setProductOrder("getProducts"),setParameter1(0),setParameter2(16), setActiveButton(1)}}>Most Recent</button>
            <button className={activeButton === 2 ? styles.activeButton : styles.unactiveButton} onClick={()=>{setProductOrder("getLowestProducts"),setParameter1(0),setParameter2(16), setActiveButton(2)}}>Lowest Price</button>
            <button className={activeButton === 3 ? styles.activeButton : styles.unactiveButton} onClick={()=>{setProductOrder("getHighestProducts"),setParameter1(0),setParameter2(16), setActiveButton(3)}}>Highest Price</button>
          </div>
          <div className={styles.nextPage}>
            <img className={styles.arrow} onClick={()=>{handlePage1()}} src={leftArrow} alt="left arrow" /> 
            <p>Page {parameter2 === 16 ? "1" : "2"} of 2</p>
            <img className={styles.arrow} onClick={()=>{handlePage2()}} src={rightArrow} alt="right arrow" />
          </div>
        </div>
        <Product parameter1={parameter1} parameter2={parameter2} />
      
      <NavLink to={'/history'}><div className={styles.history}><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></div></NavLink>
    </div>
  )
}

export default Products