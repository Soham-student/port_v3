import Header from './Header.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <div className="page-enter" id="main">
        <main>{children}</main>
        <Contact />
        <Footer />
      </div>
    </>
  );
}
