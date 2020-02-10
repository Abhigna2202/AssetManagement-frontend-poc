import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AssetPortfolio from './AssetPortfolio';
import CompanyList from '../CompanyList/CompanyList';
import {
  getAccountBalance,
  getAssetPrice,
  sellAssets,
  getAssetPortfolio
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

const Sell = () => {
  const [stockKey, setStockKey] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [queryPrice, setQueryPrice] = useState('');
  const [error, setError] = useState('');
  const [price, setPrice] = useState(0.0);
  const [amount, setAmount] = useState('0');
  const [noOfShares, setNoOfShares] = useState<any>(0.0);
  const [noOfSharesHold, setNoOfSharesHold] = useState<any>(0.0);
  const [ethInstance, setEthereumInstance] = React.useState<any>(false);

  useEffect(() => {
    if (window.ethereum) {
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
      getAssetPortfolio(window.ethereum).then(result => {
        result.map((Details: any) => {
          if (Details.shareName == stockKey) {
            setNoOfSharesHold(Details.numberOfUnits)
          }
        })
      })
    }
  }, [stockKey]);

  const SellShares = async () => {
    let sellReceipt = await sellAssets(noOfShares.toString(), stockKey, amount, ethInstance)
    console.log(sellReceipt)
    getAccountBalance(window.ethereum).then(result => {
      console.log(result);
      setAccountBalance((parseFloat(result) / Math.pow(10, 18)).toString() + ' ETH');
      })
  }

  const handleChange = (evt: any) => {
    setNoOfShares(Math.round(parseFloat(parseFloat(evt.target.value).toFixed(4)) * 10000));
    setAmount((parseFloat(parseFloat(evt.target.value).toFixed(4)) * Math.pow(10, 18) * price).toString());
    console.log('==noOfSharesHold==',noOfSharesHold)
    setError(parseFloat(evt.target.value) > parseFloat(noOfSharesHold) || parseFloat(evt.target.value) < 0 ?
      'Enter units less than or equal to that you hold' :
      '')
  }

  const validateInput = () => {
    return (error !== '' || stockKey.length < 1 || parseFloat(noOfShares) <= 0)
  }


  return (
    <div>
      <ScreenContent>
          <br></br>
          <h4>Account Balance is {parseFloat(accountBalance).toFixed(4)}</h4>
          <div>Select the share you want to sell</div>
          <CompanyList setStockKey={setStockKey} />
          <br></br>
          <div>Enter the number of units you want to sell</div>
          <Input placeholder="Enter units" onChange={handleChange} />
          <br></br>
          {(error === '') ? 'Amount to be credited is :' + (parseFloat(amount)/Math.pow(10,18)).toFixed(4) : error}<br />
          <Button onClick={SellShares} disabled={validateInput()}>Sell Shares</Button>
        <h4>Current holdings : </h4>
        <AssetPortfolio />
      </ScreenContent>

    </div>
  );
}
export default Sell;