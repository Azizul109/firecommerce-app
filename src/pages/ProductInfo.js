import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProductInfo = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );

      setProduct(productTemp.data());
      setLoading(false);
      // console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.img}
                  alt="product"
                  className="product-info-img"
                />
                <hr />
                <div className="fs-5">
                  <h3 className="fw-bolder">বিস্তারিত</h3>
                  <p className="badge bg-primary text-wrap space">
                    পণ্যটির দরনঃ {product.category}
                  </p>
                  <p className="badge bg-primary text-wrap space">
                    বর্তমান মূল্যঃ {product.price} $/ডলার
                  </p>
                  <p className="badge bg-primary text-wrap space">
                    খুচরা মূল্যঃ {product.wholePrice} $/ডলার
                  </p>
                  <p className="badge bg-primary text-wrap space">
                    বিক্রেতাঃ {product.seller}
                  </p>
                </div>
                <div className="d-flex justify-content-end my-3">
                  <button onClick={() => addToCart(product)}>কার্ট এ যুক্ত করুন</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
