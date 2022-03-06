import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
// import { fireproducts } from "../firecommerce-products";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {

  const[products, setProducts] = useState([]);
  const {cartItems} = useSelector(state => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getdata()
  }, [])

  // function addProductsData() {
  //   fireproducts.map(async (product) => {
  //     try {
  //       await addDoc(collection(fireDB, "products"), product);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }

  async function getdata(){
    
    try {
      setLoading(true);
      
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];

      users.forEach((doc) => {

        const obj = {
          id: doc.id,
          ...doc.data()
        }

        productsArray.push(obj);
        setLoading(false);
      });

      setProducts(productsArray);
      // console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems])

  const addToCart = (product) => {
    dispatch({type:'ADD_TO_CART', payload:product});
  }

  return (
    <Layout loading={loading}>
      
        {/* <button onClick={adddata}>add data to firebase</button> */}
        {/* <button onClick={getdata}>get data from firebase</button>
        <button onClick={addProductsData}>add products data firebase</button> */}

        <div className="container">
          <div className="row">
            {products.map(product =>{
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{product.name}</p>
                      <div className="text-center">
                        <img
                          src={product.img}
                          alt="ecommerce-product"
                          className="product-img"
                        />
                      </div>
                    </div>

                    <div className="product-action">
                      <h2>{product.price} $(ডলার)</h2>
                      <div className="d-flex">
                        <button className="mx-2" onClick={()=>addToCart(product)}>কার্ট এ যুক্ত করুন</button>
                        <button
                          onClick={() => {
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}  
          </div>
        </div>
    </Layout>
  );
};

export default HomePage;
