import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className='h-[100vh] overflow-scroll overflow-y-scroll'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
