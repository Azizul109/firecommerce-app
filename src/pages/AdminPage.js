import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs, setDoc, doc , deleteDoc} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaTrash, FaEdit } from "react-icons/fa";
import {Modal, Tabs, Tab} from "react-bootstrap";
import { toast } from 'react-toastify';

const AdminPage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [product, setProduct] = useState({
      name: "",
      img: "",
      price: 0,
      stock: "",
    });

    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     useEffect(() => {
       getdata();
     }, []);

     async function getdata() {
       try {
         setLoading(true);

         const users = await getDocs(collection(fireDB, "products"));
         const productsArray = [];

         users.forEach((doc) => {
           const obj = {
             id: doc.id,
             ...doc.data(),
           };

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
           getOrdersData();
         }, []);

         async function getOrdersData() {
           try {
             setLoading(true);

             const result = await getDocs(collection(fireDB, "orders"));
             const ordersArray = [];

             result.forEach((doc) => {
               ordersArray.push(doc.data());
               setLoading(false);
             });

             setOrders(ordersArray);
           } catch (error) {
             console.log(error);
             setLoading(false);
           }
         }


     const editHandler = (item) => {
         setProduct(item);

         setShow(true);
     }


     const updateProduct = async (item) => {

        try {
            setLoading(true);
            await setDoc(doc(fireDB, "products", product.id), product);
            handleClose();
            toast.success("Product updated successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Product updated failed");
            setLoading(false);
        }
     }

     const addProduct = async () => {

        try {
            setLoading(true);
            await addDoc(collection(fireDB, "products"), product);
            handleClose();
            toast.success("Product added successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Product add failed");
            setLoading(false);
        }
     }

    const addHandler = () => {
        setAdd(true);
        handleShow();
    }

    const deleteProduct = async (item) => {

        try {
            setLoading(true);
            await deleteDoc(doc(fireDB, "products", item.id));
            toast.success("Product deleted successfully");
            getdata();
        } catch (error) {
            toast.error("Product deleted failed");
            setLoading(false);
        }
    }

    return (
      <Layout loading={loading}>
        <Tabs
          defaultActiveKey="products"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="products" title="Products">
            <div className="d-flex justify-content-between">
              <h3>Products List</h3>
              <button onClick={addHandler}>ADD PRODUCT</button>
            </div>

            <table className="table mt-2">
              <thead>
                <tr>
                  <th>ছবি</th>
                  <th>পণ্য়টির নাম</th>
                  <th>মূল্য</th>
                  <th>Seller</th>
                  <th>Stock</th>
                  <th>করনীয়</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => {
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
                      <td>{item.seller}</td>
                      <td>{item.stock}</td>
                      <td>
                        <FaTrash
                          color="red"
                          size={20}
                          onClick={() => {
                            deleteProduct(item);
                          }}
                        />

                        <FaEdit
                          onClick={() => editHandler(item)}
                          color="blue"
                          size={20}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {add === true ? "Add a product" : "Edit product"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <div className="register-form">
                  <hr />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                  <textarea
                    rows={3}
                    type="text"
                    className="form-control"
                    placeholder="image-url"
                    value={product.img}
                    onChange={(e) =>
                      setProduct({ ...product, img: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="price"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    className="form-control"
                    placeholder="avilable stock"
                    value={product.stock}
                    onChange={(e) =>
                      setProduct({ ...product, stock: e.target.value })
                    }
                  />

                  <hr />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button>Close</button>
                {add ? (
                  <button onClick={addProduct}>SAVE</button>
                ) : (
                  <button onClick={updateProduct}>SAVE</button>
                )}
              </Modal.Footer>
            </Modal>
          </Tab>
          <Tab eventKey="orders" title="Orders">
            {orders.map((order) => {
              return (
                <table className="table mt-2 order">
                  <thead>
                    <tr>
                      <th>ছবি</th>
                      <th>পণ্য়টির নাম</th>
                      <th>মূল্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => {
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })}
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled></Tab>
        </Tabs>
      </Layout>
    );
};

export default AdminPage;