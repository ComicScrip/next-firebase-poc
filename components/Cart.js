import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ProductInCart from './ProductInCart';
import createPersistedState from 'use-persisted-state';

const useCustomerName = createPersistedState('customerName');

export default function Cart({
  items,
  onOrder,
  isOpen,
  onClick,
  setCartQuantity,
}) {
  const [customerName, persistCustomerName] = useCustomerName();
  const { register, handleSubmit, setFocus, watch } = useForm({
    defaultValues: { customerName },
  });
  const bottomRef = useRef();
  const customerNameInput = watch('customerName');

  useEffect(() => {
    persistCustomerName(customerNameInput);
  }, [customerNameInput, persistCustomerName]);

  const chekoutEnabled = !!customerName && items.length;

  const totalPrice = items
    .reduce(
      (total, { product: { price }, quantity }) => total + price * quantity,
      0
    )
    .toFixed(2);

  return (
    <div
      className={`shadow-lg box-content transition-all absolute ${
        isOpen ? 'h-[75%]' : 'h-[80px]'
      }  bottom-0 w-full bg-gray-100 max-w-[800px] rounded-md overflow-hidden`}
    >
      <div
        className='w-full border-b text-start cursor-pointer flex justify-between px-[20px] pt-[30px] pb-[25px]'
        onClick={() => {
          if (isOpen) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
            if (!customerName) setFocus('customerName');
          }
          onClick();
        }}
      >
        <div className='flex'>
          <div
            className={`border-solid border-l-black border-l-[12px] border-y-transparent border-y-[12px] border-r-0 mr-4 h-4 transform-all ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
          {items.length !== 0 ? (
            <>
              {items.reduce((acc, { quantity }) => acc + quantity, 0)} items
              {' - '}
              <span className='font-semibold'>${totalPrice}</span>
            </>
          ) : (
            <div>{'Click on "+" to order'}</div>
          )}
        </div>

        <div className='flex items-center relative bottom-1'>
          <button
            className={`${
              !items.length ? 'opacity-70' : ''
            } p-1 block bg-gradient-to-r from-blue-500 to-indigo-400 rounded-lg text-white font-semibold px-3 ml-4`}
          >
            {isOpen ? 'See Menu' : 'Checkout'}
          </button>
        </div>
      </div>
      <div className='relative overflow-y-scroll h-[80%] pb-2'>
        <form className='p-[20px]' onSubmit={handleSubmit(onOrder)}>
          {items.map(({ product, quantity }) => {
            const inCart = items.find(
              ({ product: { id } }) => id === product.id
            );
            return (
              <ProductInCart
                quantity={quantity}
                increaseQuantity={() =>
                  setCartQuantity(product, (inCart?.quantity || 0) + 1)
                }
                decreaseQuantity={() =>
                  setCartQuantity(
                    product,
                    inCart?.quantity === 1 ? 0 : inCart?.quantity - 1
                  )
                }
                key={product.id}
                product={product}
              />
            );
          })}
          {items.length === 0 && (
            <div className='mt-4 mb-12'>Nothing was ordered so far</div>
          )}

          <label htmlFor='customerName'>
            Your name :
            <input
              className='p-2 rounded-lg ml-2 mb-2'
              type='text'
              {...register('customerName', { required: true })}
              id='customerName'
            />
          </label>

          <button
            ref={bottomRef}
            className={`p-2 block bg-green-500 rounded-lg text-white font-semibold px-3 mt-4 w-full ${
              !chekoutEnabled ? 'opacity-70' : 'opacity-100'
            }`}
          >
            Confirm your order
          </button>
        </form>
      </div>
    </div>
  );
}
