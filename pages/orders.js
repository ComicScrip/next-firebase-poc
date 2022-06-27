import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Order from '../components/Order';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // get pending orders sorted by createdAt
    // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
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
