import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import {addDoc, collection} from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phone,
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userId: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true);
      await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success('order placed successfully');
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error('order failed');
    }
  };

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout loading={loading}>
      <table className="table mt-2">
        <thead>
          <tr>
            <th>ছবি</th>
            <th>পণ্য়টির নাম</th>
            <th>মূল্য</th>
            <th>করনীয়</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img
                    src={item.img}
                    alt="hello"
                    height="80"
                    width="80"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <h3 className="total-amount">সর্বমোট মূল্য = {totalAmount} $(ডলার)</h3>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="place-order" onClick={handleShow}>
          পণ্য়টি ক্রয় কড়তে চাপুন
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <h2>DETAILS INFO</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              rows={3}
              type="text"
              className="form-control"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="pin-code"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />

            <input
              type="number"
              className="form-control"
              placeholder="phone-number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>ORDER</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default CartPage;
