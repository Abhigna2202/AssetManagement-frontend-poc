import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Jumbotron, Alert, Button, Col, Row, SplitButton } from 'react-bootstrap';
import styled from 'styled-components';
import Buy from './Buy';
import Sell from './Sell';
import Withdraw from './Withdraw';

const ScreenContent = styled.div`
    width: 90vw;
    height:100%;
    position : center;
`;
const Margin = styled.div`
margin-left: 5%;
`;

const StyledButton = styled(Button)`
    width: 18%;
    outline:0;
    border-shadow: none !important;
    height: 50%;
    background-color: #0091ea;
    border: none;
    padding: 10px 10px 10px 10px;
    border-radius:8px;
    margin-right: 10px;
    :hover{
      background-color: #64c1ff;
    }
    color:white;
    font-size: large;
    position : top;
    `;

type menuMapType = {
  [key: string]: React.FC
}

const Invest = () => {
  const [menuItems, setMenuItems] = useState("Buy");

  const menuMap: menuMapType = {
    "Buy": Buy,
    "Sell": Sell,
    "Withdraw" : Withdraw,
  }
  const SelectedComponent = menuMap[menuItems];
  return (
    <div><Margin> 
        <StyledButton onClick={() => setMenuItems('Buy')}>Buy</StyledButton>
        <StyledButton onClick={() => setMenuItems('Sell')}>Sell</StyledButton>
        <StyledButton onClick={() => setMenuItems('Withdraw')}>Withdraw</StyledButton> 
        </Margin>
      <ScreenContent>
        <SelectedComponent></SelectedComponent>
      </ScreenContent>
    </div>
  );
}
export default Invest;