export default function ProductInOrder({ product: { name }, quantity }) {
  return (
    <div className='mb-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <p className='font-bold'>
          {name} x {quantity}
        </p>
      </div>
    </div>
  );
}
