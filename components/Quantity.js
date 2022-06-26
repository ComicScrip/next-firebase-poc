export default function Quantity({
  increaseQuantity,
  decreaseQuantity,
  quantity,
}) {
  return (
    <div className='flex items-center'>
      <button
        type='button'
        className='bg-yellow-500 hover:bg-yellow-600 rounded-full text-white py-1 px-3 mt-2 transition-all hover:scale-105'
        onClick={increaseQuantity}
      >
        +
      </button>
      {quantity && (
        <>
          <p className='mx-4 relative top-1 w-[20px] text-center'>{quantity}</p>

          <button
            type='button'
            className='bg-red-400 hover:bg-red-500 rounded-full text-white py-1 px-3 mt-2 transition-all hover:scale-105'
            onClick={decreaseQuantity}
          >
            {quantity === 1 ? 'x' : '-'}
          </button>
        </>
      )}
    </div>
  );
}
