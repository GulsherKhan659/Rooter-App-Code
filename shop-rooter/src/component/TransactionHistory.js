import React, { useContext, useState } from "react";
import { Tabs, Tab, Card, ListGroup } from "react-bootstrap";
import { WalletContext } from "../contextApi/contextProvider";

const TransactionHistory = () => {
  const { allTransactions } = useContext(WalletContext); 
  const [key, setKey] = useState("all");

  return (
    <Card className="bg-dark text-white p-3" style={{ height: 600 }}>
      <Card.Title>Transaction History</Card.Title>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 d-flex gap-3">
        <Tab eventKey="all" title="All Transactions">
          <div className="tab-content-body" style={{ maxHeight: "450px", overflowY: "auto" }}>
            <TransactionList transactions={allTransactions} />
          </div>
        </Tab>
        <Tab eventKey="wallet" title="Rooter Wallet">
          <div className="tab-content-body">
            <p>No wallet transactions yet.</p>
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
};

const TransactionList = ({ transactions }) => (
  <ListGroup variant="flush" >
    {transactions.length > 0 ? (
      transactions.map((txn) => (
        <ListGroup.Item style={{marginBottom:"10px"}} key={txn._id} className="bg-secondary text-white d-flex justify-content-between">
          <span>
            <strong>{txn.description}</strong> <br />
            Closing Balance: ₹{txn.balance || txn.amount}
          </span>
          <span className="fw-bold">₹{txn.amount}</span>
        </ListGroup.Item>
      ))
    ) : (
      <p className="text-center text-white">No transactions found</p>
    )}
  </ListGroup>
);

export default TransactionHistory;
