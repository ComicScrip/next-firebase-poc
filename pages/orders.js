import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Order from '../components/Order';
import { firebase } from '../services/firebase';

const db = firebase.firestore();

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // get pending orders sorted by createdAt
    // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    const unsubscribe = db
      .collection('orders')
      .where('state', '==', 'pending')
      .orderBy('createdAt', 'asc')
      .onSnapshot((s) => {
        setOrders(
          s.docs.map((o) => {
            const data = o.data();
            console.log(data);
            return {
              id: o.id,
              ...data,
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
