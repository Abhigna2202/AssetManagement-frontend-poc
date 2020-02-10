import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AssetPortfolio from './AssetPortfolio';
import CompanyList from '../CompanyList/CompanyList';
import {
  getAccountBalance,
  getAssetPrice,
  buyAssets
} from '../../actions/Query/AssetManagement';

const ScreenContent = styled.div`
    width: 90vw;
    height:100%;
    position:center;
`;

const Input = styled.input`
    width: 10%;
    text-align: center;
    border-radius:8px;
    font-family: 'Courier New', Courier, monospace;
    border: solid 2px #048ABF;
    padding: 12px;
    margin-bottom: 10px;
`;

const Button = styled.button`{
  width: 20%;
  background-color: rgb(247, 184, 12);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
:hover {
  background-color: #f37a17;
}
:disabled {
  background-color: gainsboro;}`;

export default () => {
  const [stockKey, setStockKey] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [queryPrice, setQueryPrice] = useState('');
  const [error, setError] = useState('');
  const [price, setPrice] = useState(0.0);
  const [amount, setAmount] = useState('0');
  const [noOfShares, setNoOfShares] = useState<any>(0.0);
	const [ethInstance, setEthereumInstance] = React.useState<any>(false);

  useEffect(() => {
    if(window.ethereum) {
      console.log("ethInstance is set")
			setEthereumInstance(window.ethereum);
		} else {
			setEthereumInstance(false)
    }
    getAccountBalance(window.ethereum).then(result => {
      console.log(result);
      setAccountBalance((parseFloat(result) / Math.pow(10, 18)).toString() + ' ETH');
    })
    
    if (stockKey !== '') {
      getAssetPrice(stockKey).then(result => {
        setPrice((parseFloat(result) / Math.pow(10, 21)));
        setQueryPrice('Share price is ' + (parseInt(result) / Math.pow(10, 21)).toString() + ' ETH');
      })
    }
  }, [stockKey]);

  const InvestAmount = async() => {
    let receipt = await buyAssets(noOfShares.toString(),stockKey,amount,ethInstance)
    getAccountBalance(window.ethereum).then(result => {
      console.log(result);
      setAccountBalance((parseFloat(result) / Math.pow(10, 18)).toString() + ' ETH');
      })
    console.log(receipt)  
  }

  const handleChange = (evt: any) => {
    setAmount((parseFloat(parseFloat(evt.target.value).toFixed(4))*Math.pow(10, 18)).toString());
    setNoOfShares(price > 0 ? Math.round((parseFloat((parseFloat(evt.target.value) / (price)).toFixed(4))*10000)) : 0);
    setError(parseFloat(evt.target.value) > parseFloat(accountBalance) || parseFloat(evt.target.value) < 0 ?
      'Enter amount less than your account balance and greter than 0' :
      '')
  }

  const validateInput = () => {
    return (error !== '' || stockKey.length < 1 || parseFloat(amount) <= 0)
  }

  return (
    <div>
      <h4>Account Balance is {parseFloat(accountBalance).toFixed(4)}</h4>
      <ScreenContent>
        <div>Select the share you want to invest</div>
        <CompanyList setStockKey={setStockKey} />
        <br></br>
        {queryPrice}
        <div>Enter the amount you want to spend</div>
        <Input placeholder="Enter amount" onChange={handleChange} />
        <br></br>
        {(error === '') ? 'Number of Shares :' + (noOfShares/10000).toString() : error}<br />
        &nbsp;<Button onClick={InvestAmount} disabled={validateInput()}>Invest</Button>&nbsp;&nbsp;
        <h4>Current holdings : </h4>
        <AssetPortfolio/>
      </ScreenContent>
    </div>
  );
}