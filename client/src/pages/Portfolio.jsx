import { useEffect } from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import Work from '../components/Work.jsx';
import Stack from '../components/Stack.jsx';
import Experience from '../components/Experience.jsx';
import About from '../components/About.jsx';

export default function Portfolio() {
  useEffect(() => {
    document.title = 'Soham Dengale — Full-stack developer';
  }, []);

  return (
    <Layout>
      <Hero />
      <Work />
      <Stack />
      <Experience />
      <About />
    </Layout>
  );
}
