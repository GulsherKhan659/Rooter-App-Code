import React, { useEffect, useState } from 'react';
import WalletBalance from './component/WalletBalance';
import TransactionHistory from './component/TransactionHistory';
import ShopItems from './component/ShopItems';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wallet = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container bg-secondary p-4 rounded">
        <div className="d-flex align-items-center mb-3">
          <FaLongArrowAltLeft size={24} className="me-2" role="button" onClick={() => navigate(-1)} />
          <h2 className="mt-2">Rooter Wallet</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <WalletBalance /> 
            <ShopItems />
          </div>
          <div className="col-md-6">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
