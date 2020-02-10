import React, { useState, useEffect } from 'react';
import { getAssetPrice } from '../../actions/Query/AssetManagement';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import CompanyList from '../CompanyList/CompanyList';

const StyledButton = styled(Button)`
    width: 10%;
    height:5%;
    background-color: skyblue;
    border-radius:8px;
    border: none;
    padding: 10px 10px 10px 10px;
    font-size: small;
    position : center;
    `;

export default () => {
    const [queryPrice, setQueryPrice] = useState('');
    const [stockKey, setStockKey] = useState('');
    const [tempKey, setTempKey] = useState('');

    useEffect(() => {
        if (tempKey !== '') {
            getAssetPrice(stockKey).then(result => {
                setQueryPrice('Share price is ' + (parseInt(result) / Math.pow(10, 18)).toString());
            }
            );
        }
    }, [stockKey]);

    return (
        <div>
            <CompanyList setTempKey={setTempKey} QPrice={queryPrice} />
            <StyledButton onClick={() => setStockKey(tempKey)}>Get Price</StyledButton>
            <h4>{queryPrice}</h4>
        </div>
    )
}