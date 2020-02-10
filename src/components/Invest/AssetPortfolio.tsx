import React, { useEffect, useState } from 'react';
// import InvestmentAssetPortfolio from '../../contracts/InvestmentAssetPortfolio.json';
import styled from 'styled-components';
import { getAssetPortfolio } from '../../actions/Query/AssetManagement';
import {getCompanyName} from '../CompanyList/CompanyList'

const Table = styled.table`
  width:65%;
  border:1px solid #EEEEEE;
  height:45vh;
  `
const TrHeader = styled.tr`
    display:flex;
    width:100%;
    background:#000;
    padding:15px 0;
  `
const TdHeader = styled.td`
    color:white;
    flex: 1 1 20%;
    text-align:center;
  `
const TrBody = styled.tr`
    display:flex;
    width:100%;
    padding:15px 0;
    
    &:nth-of-type(odd) {
      background:#EEEEEE;
    }
  `

const TdBody = styled.td`
    flex: 1 1 20%;
    text-align:center;
  `

const AssetPortfolio = () => {
    const [assetPortfolio, setAssetPortfolio] = useState([{
        shareName: "",
        numberOfUnits: ""
    }])

    useEffect(() => {
        setInterval( () => {
            getAssetPortfolio(window.ethereum).then(result =>
                setAssetPortfolio(result))
          },1000)
        
    }, [])

    return (

        <div>
            <Table>
                <TrHeader>
                    <TdHeader>Company</TdHeader>
                    <TdHeader>NumberOfUnits</TdHeader>
                </TrHeader>
                {assetPortfolio.map((Details) => {
                    return (
                        <TrBody>
                            <TdBody>{getCompanyName(Details.shareName)}</TdBody>
                            <TdBody> {Details.numberOfUnits !== "" ? parseFloat(Details.numberOfUnits) / 10000:""}</TdBody>
                        </TrBody>
                    );
                })
                }
            </Table>
        </div>
    )
}
export default AssetPortfolio;