import dayjs from 'dayjs';
import ProductInOrder from './ProductInOrder';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
import { firebase as fb } from '../services/firebase';

const db = fb.firestore();

export default function Order({
  order: { customerName, items, createdAt, status, id },
}) {
  const setOrderReady = () => {
    if (confirm('confirm ?')) {
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