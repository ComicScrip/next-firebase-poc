import Quantity from './Quantity';

export default function Product({
  product: { name, picture, description, price },
  increaseQuantity,
  decreaseQuantity,
  quantity,
}) {
  return (
    <div className='flex p-4 justify-between border-t'>
      <div>
        <h2 className='font-bold'>{name}</h2>
        <p className='text-sm text-gray-600'>{description}</p>
        <p className='text-xs mt-[2px] text-gray-400'>${price} </p>
        <Quantity
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
      <img
        src={picture}
        alt={name}
        className='rounded-full h-[100px] w-[100px] ml-3'
      />
    </div>
  );
}
