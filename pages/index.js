import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { firebase } from '../services/firebase';
import Product from '../components/Product';
import Cart from '../components/Cart';
import toast, { Toaster } from 'react-hot-toast';

const notify = (message) => toast(message);

const db = firebase.firestore();

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  useEffect(() => {
    /*
    firebaseCloudMessaging.init().then((messaging) => {
      console.log('ok');
      messaging.onMessage((message) => {
        console.log('received message :', message);
      });
    });
    */
  }, []);

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
    if (cart.length)
      db.collection('orders')
        .add({
          customerName,
          state: 'pending',
          items: cart,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          notify("Thanks for your order ! We'll let you know when it's ready");
          setCart([]);
        });
  };

  useEffect(() => {
    db.collection('products')
      .get()
      .then((s) => {
        setProducts(
          s.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
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
