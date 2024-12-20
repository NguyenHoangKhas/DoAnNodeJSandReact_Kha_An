import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { DataProvider } from './Provider/dataProvider';
import React from 'react';
function App() {
  return (
    <>
      <DataProvider>
        <Header />
        <Footer />
      </DataProvider>
    </>
  );
}
export default App;
