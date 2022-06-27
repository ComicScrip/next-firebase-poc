import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { firebase } from '../services/firebase';
import Product from '../components/Product';
import Cart from '../components/Cart';
import toast, { Toaster } from 'react-hot-toast';

const notify = (message) => toast(message);

const db = firebase.firestore();

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const setCartQuantity = (product, quantity = 1) => {
    const alreadyInCart = cart.find(({ product: { id } }) => product.id === id);

    if (quantity === 0)
      return setCart((old) =>
        old.filter(({ product: { id } }) => id !== product.id)
      );
    if (alreadyInCart)
      return setCart((old) =>
        old.map((ci) =>
          ci.product.id === product.id ? { ...ci, quantity } : ci
        )
      );
    return setCart((old) => [...old, { product, quantity }]);
  };

  const handleOrderClick = ({ customerName }) => {
    if (cart.length) {
      // post a new order
      db.collection('orders')
        .add({
          customerName,
          items: cart,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          state: 'pending',
        })
        .then((docRef) => {
          notify('Thanks for your order, you will be nofified when its ready');
          setCart([]);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  };

  useEffect(() => {
    // get products
    db.collection('products')
      .get()
      .then((querySnapshot) => {
        setProducts(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  return (
    <Layout>
      <Toaster position='bottom-center' />
      <div className={`${cartIsOpen ? 'h-[50vh]' : 'h-[90vh]'}`}>
        {products.map((p) => {
          const inCart = cart.find(({ product: { id } }) => id === p.id);
          return (
            <Product
              key={p.id}
              product={p}
              quantity={inCart?.quantity}
              increaseQuantity={() =>
                setCartQuantity(p, (inCart?.quantity || 0) + 1)
              }
              decreaseQuantity={() =>
                setCartQuantity(
                  p,
                  inCart?.quantity === 1 ? 0 : inCart?.quantity - 1
                )
              }
            />
          );
        })}
        <div className={`${cartIsOpen ? 'h-[45vh]' : 'h-[100px]'}`}></div>
      </div>

      <Cart
        items={cart}
        onOrder={handleOrderClick}
        onClick={() => setCartIsOpen((open) => !open)}
        isOpen={cartIsOpen}
        setCartQuantity={setCartQuantity}
      />
    </Layout>
  );
}
