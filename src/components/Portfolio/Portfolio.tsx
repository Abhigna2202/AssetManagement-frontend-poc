import React, { useState, useEffect } from 'react';
import History from '../History/History';
import Chart from '../../actions/Charts/chart'
import styled from 'styled-components';
// import QueryAssetPrice from '../QueryAssetPrice/QueryAssetPrice';
import { getInvestmentAccount, createInvestmentAccount } from '../../actions/Query/AssetManagement';
declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}

const Button = styled.button`{
  width: 100%;
  background-color: #0091ea;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
:hover {
  background-color: #64c1ff;
}
:disabled {
  background-color: gainsboro;}`;

export default () => {
  const [accountflag, setAccountflag] = useState('')
  useEffect(() => {
    if (window.ethereum) {
      getInvestmentAccount(window.ethereum).then(conAddr => {
        console.log(conAddr);
        if (conAddr !== '0x0000000000000000000000000000000000000000') {
          console.log('====='+conAddr+'=====');
          setAccountflag('true');
        }
        else {setAccountflag('false');  }
      })
    }
  }, []);

  const createAccount = async () => {
    console.log("createAccount is called")
    const conAddr = await getInvestmentAccount(window.ethereum)
    console.log("==InvestmentAccount==", conAddr)
    if (conAddr === '0x0000000000000000000000000000000000000000') {
      console.log("=====Account Addr=====", window.ethereum.selectedAddress);
      const result = await createInvestmentAccount(window.ethereum)
      console.log(result)
      setAccountflag('true');
    }
    else {
      alert("InvestmentAccount already exists !!")
    }
  }

  if (accountflag == 'true') {
    return (
      <div>
        <h2 font-family ="verdana, sans-serif">Welcome there!.</h2>
    <h4 font-family ="verdana, sans-serif">Here is your Account Summary. </h4>
        <Chart />
        <br />
        <History />
      </div>
    )
  } else if (accountflag == 'false') {
    return (
      <div>
        <h2 font-family ="verdana, sans-serif">Welcome there!.</h2>
        <h4 font-family ="verdana, sans-serif">Please create your investment account by clicking below button</h4>
        <Button onClick={createAccount}>Create Account</Button>
      </div>
    )
  }
  else {
    return (
      <div>
      </div>
    )
  }
}