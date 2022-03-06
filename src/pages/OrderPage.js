import React, {useState, useEffect} from 'react';
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import Layout from "../components/Layout";


const OrderPage = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem('currentUser')).user.uid;

    useEffect(() => {
      getdata();
    }, []);


    async function getdata() {
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

    return (
      <Layout loading={loading}>
        <div className="p-2">
          {orders.filter(obj=>obj.userId === userId).map((order) => {
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
        </div>
      </Layout>
    );
};

export default OrderPage;