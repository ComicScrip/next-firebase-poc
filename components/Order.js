import dayjs from 'dayjs';
import ProductInOrder from './ProductInOrder';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
import { firebase } from '../services/firebase';

const db = firebase.firestore();

export default function Order({
  order: { customerName, items, createdAt, id },
}) {
  const setOrderReady = () => {
    if (confirm('confirm ?')) {
      // update the order with the "ready" state
      // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
      db.collection('orders').doc(id).update({ state: 'ready' });
    }
  };

  return (
    <div className='py-4 px-8 bg-white shadow-lg rounded-lg my-4'>
      <div className='flex justify-between'>
        <div className='font-bold text-2xl mb-4'>{customerName}</div>
        <div className='text-gray-400'>{dayjs(createdAt).fromNow()}</div>
      </div>
      <div className='flex justify-between'>
        <div>
          {items.map(({ product, quantity }) => (
            <ProductInOrder
              key={product.id}
              product={product}
              quantity={quantity}
            />
          ))}
        </div>
        <div>
          <button
            onClick={() => setOrderReady()}
            className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg'
            type='button'
          >
            {"It's Ready !"}
          </button>
        </div>
      </div>
    </div>
  );
}
