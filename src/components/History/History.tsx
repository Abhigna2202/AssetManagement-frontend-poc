import React, { useEffect, useState } from 'react';
// import InvestmentHistory from '../../contracts/InvestmentHistory.json';
import styled from 'styled-components';
import { getTransactionsHistory } from '../../actions/Query/AssetManagement';
import { getCompanyName } from '../CompanyList/CompanyList'

const Table = styled.table`
  width:75%;
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

const History = () => {
  const [tranHist, setTranHist] = useState([{
    shareName: "",
    NumOfUnits: "",
    amount: "",
    action: "",
    Date: '0',
    Status: ""
  }])

  useEffect(() => {
    getTransactionsHistory(window.ethereum).then(result =>
      setTranHist(result))
  }, [])

  return (

    <div>
      <Table>
        <TrHeader>
          <TdHeader>Company</TdHeader>
          <TdHeader>NumberOfUnits</TdHeader>
          <TdHeader>Amount</TdHeader>
          <TdHeader>Action</TdHeader>
          <TdHeader>Date</TdHeader>
          <TdHeader>Status</TdHeader>
        </TrHeader>
        {tranHist.map((Details) => {
          return (
            (Details.shareName !== "") ?
              <TrBody>
                <TdBody>{getCompanyName(Details.shareName)}</TdBody>
                <TdBody> {parseFloat(Details.NumOfUnits) / 10000}</TdBody>
                <TdBody> {parseFloat(Details.amount) / Math.pow(10, 18)}</TdBody>
                <TdBody> {Details.action}</TdBody>
                <TdBody> {new Date(parseInt(Details.Date) * 1000).toUTCString()}</TdBody>
                <TdBody> {Details.Status}</TdBody>
              </TrBody>
              : ""

          );
        })
        }
      </Table>
    </div>
  )
}
export default History;