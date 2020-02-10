import React, { useState } from 'react';
import styled from 'styled-components';

const Select = styled.select`
    width: 15%;
    text-align: center;
    border-radius:8px;
    font-family: 'Courier New', Courier, monospace;
    border: solid 2px #048ABF;
    padding: 12px;
    margin-bottom: 10px;
`;

export const getCompanyName = (stockKey:string) => {
    var compList: { [id: string] : string; } = {};
    compList = {'FB':'Facebook',
    'GOOG':'Google',
    'AAPL':'Apple',
    'AMZN':'Amazon',
    'MSFT':'Microsoft',
    'NFLX':'Netflix',
    'ORCL':'Oracle' }
    return compList[stockKey]; 
}

export default (props:any) => {

    const handleChange = (evt: any) => {
        props.setStockKey(evt.target.value)
    }

    return(
        <Select id="Shares" name="Shares" onChange={handleChange}>
        <option value='Select'>Select company</option>
        <option value='FB'>Facebook</option>
        <option value='GOOG'>Google</option>
        <option value='AAPL'>Apple</option>
        <option value='AMZN'>Amazon</option>
        <option value='MSFT'>Microsoft</option>
        <option value='NFLX'>Netflix</option>
        <option value='ORCL'>Oracle</option>
      </Select>
    )
}