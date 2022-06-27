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
    if (customerNameInput) persistCustomerName(customerNameInput);
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
        isOpen ? 'h-[40vh]' : 'h-[80px]'
      }  bottom-0 w-full bg-gray-100 max-w-[800px] rounded-md overflow-hidden`}
    >
      <div
        className='w-full border-b text-start cursor-pointer flex justify-between px-[20px] pt-[30px] pb-[25px]'
        onClick={() => {
          onClick();
          bottomRef.current.scrollIntoView({ behavior: 'smooth' });
          if (!customerName && !isOpen) setFocus('customerName');
        }}
      >
        <div className='flex '>
          <div
            className={`border-solid border-l-black border-l-[12px] border-y-transparent border-y-[12px] border-r-0 mr-4 h-4 transform-all ${
              isOpen ? 'rotate-90' : ''
            }`}
          />

          <p className='font-semibold'>Your order</p>
        </div>
        <div className='flex items-center relative bottom-1'>
          <p>
            {items.length ? (
              <>
                {items.reduce((acc, { quantity }) => acc + quantity, 0)} items
                {' - '}
                <span className='font-semibold'>${totalPrice}</span>
              </>
            ) : (
              'Click on "+" to add items'
            )}
          </p>

          <button
            className={`p-1 block bg-blue-500 rounded-lg text-white font-semibold px-3 ml-4`}
          >
            Checkout
          </button>
        </div>
      </div>
      <div className='relative overflow-y-scroll h-[30vh] pb-2'>
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
            <div className='mt-4 mb-12'>Nothing was ordered so far.</div>
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
