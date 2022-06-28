import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { firebase, messaging } from '../services/firebase';
import Product from '../components/Product';
import Cart from '../components/Cart';
import toast, { Toaster } from 'react-hot-toast';

const notify = (message) => toast(message);

const db = firebase.firestore();

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    messaging.init().then((t) => {
      /*
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log('event for the service worker', event);
        });
      }
      */
      console.log('fcm token', t);
      if (t) {
        setToken(t);
        // hanlde notifications in the foreground
        firebase.messaging().onMessage((payload) => {
          notify(
            `${payload.notification.title} - ${payload.notification.body}`
          );
        });
      }
    });
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
          customerToken: token,
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

  useEffect(() => {
    if (cart.length === 0) setCartIsOpen(false);
  }, [cart.length]);

  return (
    <Layout>
      <div onClick={() => setCartIsOpen(false)}>
        <Toaster position='bottom-center' />
        <div>
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
          <div className={`${cartIsOpen ? 'h-[65%]' : 'h-[100px]'}`}></div>
        </div>
      </div>

      <Cart
        items={cart}
        onOrder={handleOrderClick}
        onClick={() => {
          if (cart.length) setCartIsOpen((open) => !open);
        }}
        isOpen={cartIsOpen}
        setCartQuantity={setCartQuantity}
      />
    </Layout>
  );
}
