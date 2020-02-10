import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    getContractBalance,
    withdrawAmount,
    getInvestmentAccountBal
} from '../../actions/Query/AssetManagement';


const Button = styled.button`
    width: 15%;
    background-color:steelblue;
    border-radius:10px;
    Margin-top: 5px;
    padding:10px;
    border-shadow: none;
    border:none;
    color:white;
    font-family: Verdana,sans-serif, monospace;
    position: right;
    cursor: pointer;
}
:hover {
  background-color: #f37a17;
}
:disabled {
  background-color: gainsboro;}
`;

const Input = styled.input`
    width: 35%;
    text-align: Left;
    border-radius:8px;
    font-family: Verdana,sans-serif, monospace;
    border: solid 2px steelblue;
    padding: 10px;
    margin-bottom: 10px;
`;
const Text = styled.div`
    font-family: Verdana,sans-serif, monospace;
    font-weight: medium;
    margin-bottom: 8px;
`;
const Select = styled.select`
    width: 35%;
    text-align: Left;
    border-radius:8px;
    font-family: 'Courier New', Courier, monospace;
    border: solid 2px steelblue;
    padding: 10px;
    margin-bottom: 10px;
`;

const Content = styled.div`
    width: 90vw;
    height:100%;
    position:center;
`;
export default () => {
    const [withdrawAmt, setWithdrawAmount] = useState('0');
    const [ethInstance, setEthereumInstance] = React.useState<any>(false);
    const [error, setError] = useState('');
    const [amount, setAmount] = useState('0');
    const [currBal, setCurrBal] = useState('0');

    useEffect(() => {
        setInterval(() => {
        if (window.ethereum) {
            console.log("ethInstance is set")
            setEthereumInstance(window.ethereum);
        } else {
            setEthereumInstance(false)
        }
        getInvestmentAccountBal(window.ethereum).then(result => {
            console.log(result, "invest bal");
            setCurrBal((parseFloat(result) / Math.pow(10, 18)).toString());
        })
    },2000)
    }, [])

const withdrawAmnt = async () => {
    withdrawAmount((parseFloat(amount) * Math.pow(10, 18)).toString(), ethInstance)
}

const handleChange = (evt: any) => {
    setAmount(evt.target.value)
    setError(parseFloat(evt.target.value) > parseFloat(currBal) || parseFloat(evt.target.value) < 0 ?
        'Enter amount less than or equal to what your contract has' :
        '')
    
}

const validateInput = () => {
    return ((error||parseFloat(amount) === 0)? true: false)
}

return (
    <Content>
        <Text> Your current investment account balance is {currBal} ETH</Text><br />

        <Text>Withdrawal Amount</Text>
        
        <Input placeholder="Enter Amount" onChange={handleChange} /><br></br>        
        {(error === '') ? '' : error}<br />
        <Button onClick={withdrawAmnt} disabled={validateInput()}>Withdraw</Button>
    </Content>
)
}