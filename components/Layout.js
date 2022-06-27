import Head from 'next/head';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className='m-auto max-w-[800px] '>
      <div className='w-full'>
        <Head>
          <title>Order App</title>
          <meta name='description' content='order app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
