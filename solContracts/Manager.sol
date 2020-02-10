pragma solidity ^0.5.0;
import './helpers/SafeMath.sol';
import './InvestmentAccount.sol';
import {usingBandProtocol, Oracle} from 'band-solidity/contracts/Band.sol';
pragma experimental ABIEncoderV2;

contract Manager is usingBandProtocol{
    using SafeMath for *;

     mapping  (address => InvestmentAccount) public InvestmentAccounts;

    function createInvestmentAccount() public payable{
        InvestmentAccount InvestmentAccountContract = new InvestmentAccount();
        InvestmentAccounts[msg.sender] = InvestmentAccountContract;
    }

    function query(string memory _shareName) public payable returns(uint256){
        return FINANCIAL.querySpotPrice(_shareName);
    }

    function sellAssets(uint _debitVal, string memory _shareName, uint256 _amount) public payable {
        InvestmentAccounts[msg.sender].deductFromAssets(_shareName,_debitVal,_amount,msg.sender);
    }

    function withdrawAmount(uint _amount) public payable {
        InvestmentAccounts[msg.sender].withdrawAmount(msg.sender,_amount);
    }

    function buyAssets(uint _creditVal, string memory _shareName, uint256 _amount) public payable {
        InvestmentAccounts[msg.sender].addToAssets.value(msg.value)(_shareName,_creditVal);
        require(msg.value == _amount, "Amount is should be equal to passed msg.value");
    }

    function getAssetPortfolio() public view returns (InvestmentAccount.AssetDetail[] memory){
        return  InvestmentAccounts[msg.sender].getAssetPortfolio();
    }

    function getContractBalance() public view returns (uint256){
        return InvestmentAccounts[msg.sender].getContractBalance();
    }

    function getInvestmentAccount() public view returns (InvestmentAccount){
        return InvestmentAccounts[msg.sender];
    }

   function getTransactionsHistory() public view returns (InvestmentAccount.TransactionDetail[] memory){
        return InvestmentAccounts[msg.sender].getTransactionsHistory();
    }

    function getInvestmentAccountBalance() public view returns (uint256){
        return InvestmentAccounts[msg.sender].InvestAccountBalance();
    }
}
