import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Jumbotron, Alert, Button, Col, Row, SplitButton } from 'react-bootstrap';
import styled from 'styled-components';
import Portfolio from '../Portfolio/Portfolio';
import Invest from '../Invest/Invest';
import Withdraw from '../../components/Invest/Withdraw';
import Account from '../Account/Account';

const AssetManagementMenu = styled.div`
    display: flex;
    justify-content: space-between ;
    align-items: start;
    padding: 2%;
    height:50%;
    & > * {
        margin-right: 2%;
    }
`;

const NavSelection = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    background-color: #0091ea;
    width:20vw;
    height:100%; 
    & > * {
        width: 100%;
    }
`;

const ScreenContent = styled.div`
    width: 90vw;
    height:100%;
    position:center;
`;

const StyledButton = styled(Button)`
    margin-top: 5px;
    width: 100%;
    height: 50%;
    background-color: white;
    border: none;
    padding: 10px 10px 10px 10px;
    outline:0;
    box-shadow: none !important;
    border-radius: 0px;
    font-size: large;
    position : center;
    text-align: left;
    font-family: verdana, sans-serif;    
    `;

const StyledButtonChild = styled(Button)`
    margin-left: 5px;
    width: 100%;
    height: 100%;
    background-color: white;
    :hover{
        background-color: white;
    }
    :focus{
        background-color: white;
    }
    outline:0;
    box-shadow:none !important;
    border: none;
    padding: 10px 10px 10px 10px;
    border-radius: 0px;
    margin-right: 8px;
    font-size: medium;
    position : right;
    text-align : left;
    font-family: verdana, sans-serif, monospace;
    `;

type menuMapType = {
    [key: string] : React.FC
}

const AssetMenu = () => {
    const [menuItems, setMenuItems] = useState("Portfolio");

    const menuMap: menuMapType = {
        "Portfolio": Portfolio,
        "Invest": Invest
    }
    const SelectedComponent = menuMap[menuItems];
    return (
        <AssetManagementMenu>
            <NavSelection>
                <StyledButton>MENU</StyledButton>
                <StyledButtonChild onClick={() => setMenuItems('Portfolio')}>Portfolio</StyledButtonChild>
                <StyledButtonChild onClick={() => setMenuItems('Invest')}>Invest</StyledButtonChild>
            </NavSelection>
            <ScreenContent>
                <SelectedComponent></SelectedComponent>
            </ScreenContent>
        </AssetManagementMenu>
    );
}
export default AssetMenu;