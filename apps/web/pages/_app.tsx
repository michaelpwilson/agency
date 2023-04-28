import { AppProps } from "next/app";
import { Provider } from 'react-redux';
import store from '../store/';
import Head from "next/head";
import "./styles.scss";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      
      <Provider store={store}>
        <nav className="nav">
          <div className="container">
              <div className="nav__logo">
                  <a href="#">Website</a>
              </div>
              <div className="nav__menu">
                  <ul>
                      <li>
                          <a href="#">Home</a>
                      </li>
                      <li>
                          <a href="#">Portfolio</a>
                      </li>
                      <li>
                          <a href="https://github.com/michaelpwilson">Github</a>
                      </li>
                  </ul>
              </div>
              <div className="nav__action">
                  <a href="#">Login</a>
              </div>
          </div>
        </nav>

        <main className="app">
          <Component {...pageProps} />
        </main>

        <footer className="footer">
          <div className="container">
              <div className="footer__section">
                  <h3>Website</h3>
                  <p>Copyright © 2023 Michael Wilson Limited.</p>
                  <p>Built with love in the United Kingdom.</p>
              </div>
              <div className="footer__links">
                  <h5>Quick Links</h5>
                  <ul>
                      <li>
                          <a href="#">Portfolio</a>
                      </li>
                      <li>
                          <a href="https://github.com/michaelpwilson">Github</a>
                      </li>
                  </ul>
              </div>
              <div className="footer__links">
                  <h5>Say Hello</h5>
                  <ul>
                      <li>
                          <a href="mailto:admin@example.com">Email: admin@example.com</a>
                      </li>
                      <li>
                          <a href="tel:01957485123">Phone: 01957485123</a>
                      </li>
                  </ul>
              </div>
          </div>
        </footer>
      </Provider>
    </>
  );
}

export default CustomApp;
