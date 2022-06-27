import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Order from '../components/Order';
import { firebase as fb } from '../services/firebase';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = fb
      .firestore()
      .collection('orders')
      .where('state', '==', 'pending')
      .orderBy('createdAt', 'asc')
      .onSnapshot((s) => {
        setOrders(
          s.docs.map((order) => {
            const data = order.data();
            return {
              ...data,
              id: order.id,
              createdAt: data.createdAt.seconds * 1000,
            };
          })
        );
      });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      {!orders.length && <p>No orders yet</p>}
      {orders.map((o) => (
        <Order key={o.id} order={o} />
      ))}
    </Layout>
  );
}
