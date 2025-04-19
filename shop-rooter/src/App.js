import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './assets/css/style.css';

import Product from './Product';
import Home from './Home';
import Main from './Main';
import Terms from './Terms';
import Policy from './Policy';
import AboutUs from './AboutUs';
import WorkWithUs from './WorkWithUs';
import Wallet from './Wallet';
import AddMoney from './component/AddMoney';
import { GlobalProvider } from './contextApi/contextProvider';


function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route element={<Main/>}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/terms-and-condition" element={<Terms/>} />
          <Route path="/privacy=policy" element={<Policy/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/work-with-us" element={<WorkWithUs/>} />
          </Route>
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/addmoney" element={<AddMoney />} />
        </Routes>
    </Router>
    </GlobalProvider>
    
  );
}

export default App;
