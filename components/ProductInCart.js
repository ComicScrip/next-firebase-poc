import Quantity from './Quantity';

export default function ProductInCart({
  product: { name, picture, price },
  increaseQuantity,
  decreaseQuantity,
  quantity,
}) {
  return (
    <div className='mb-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <img
          src={picture}
          alt={name}
          className='rounded-full h-[50px] w-[50px]'
        />
        <div className='ml-6'>
          <h2 className='font-bold'>{name}</h2>
          <p className='text-xs mt-[2px] text-gray-400'>
            ${price}{' '}
            {quantity && `x ${quantity} = $${(price * quantity).toFixed(2)}`}
          </p>
        </div>
      </div>

      <Quantity
        quantity={quantity}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
}
