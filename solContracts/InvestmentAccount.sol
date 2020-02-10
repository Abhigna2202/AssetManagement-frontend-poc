pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract InvestmentAccount{
    address payable public ManagerAddress;
    address payable public AccountId;
    uint256 public NetUserInvestedAmount;
    uint256 public InvestmentAccountBalance;

    struct TransactionDetail{
        string shareName;
        uint NumOfUnits;
        string action;
        uint Date;
        string Status;
        uint256 amount;
    }

    struct AssetDetail{
        string shareName;
        uint numberOfUnits;
    }

    TransactionDetail[] public TransactionHistory;
    AssetDetail[] public AssetPortfolio;

    constructor() public{
        ManagerAddress = msg.sender;
        AccountId = address(this);
        NetUserInvestedAmount = 0;
        InvestmentAccountBalance = 0;
    }


    modifier onlyManager(address){
            require(msg.sender == ManagerAddress, "Invalid Authentication");
        _;
    }

    function addToAssets(string memory _shareName, uint _insertVal) public payable{
        bool updateFlag = false;
        for (uint i = 0; i < AssetPortfolio.length; i++ )
        {
            if( keccak256(abi.encodePacked(AssetPortfolio[i].shareName)) == keccak256(abi.encodePacked(_shareName)))
            {
                AssetPortfolio[i].numberOfUnits = AssetPortfolio[i].numberOfUnits + _insertVal;
                updateFlag = true;
            }
        }
        if(!updateFlag)
        {
            AssetPortfolio.push(AssetDetail({shareName:_shareName, numberOfUnits:_insertVal}));
        }
        TransactionHistory.push(TransactionDetail({
                shareName: _shareName,
                NumOfUnits: _insertVal,
                action: "Buy",
                Date: now,
                Status: "Success",
                amount: msg.value
            }));
    }

    function deductFromAssets(string memory _shareName, uint _deductVal,uint256 _amount,address payable _receiver) public payable{
        require(_deductVal >= 0, 'Value should be greater than zero');
        for (uint i = 0; i < AssetPortfolio.length; i++ )
        {
            if(keccak256(abi.encodePacked(AssetPortfolio[i].shareName)) == keccak256(abi.encodePacked(_shareName)) &&
            AssetPortfolio[i].numberOfUnits >= _deductVal)
            {
                AssetPortfolio[i].numberOfUnits = AssetPortfolio[i].numberOfUnits - _deductVal;
                InvestmentAccountBalance = InvestmentAccountBalance + _amount;
               // _receiver.transfer(_amount);//Should be commented if withdraw functionality exists
                if (AssetPortfolio[i].numberOfUnits == 0)
                {
                    AssetPortfolio[i] = AssetPortfolio[AssetPortfolio.length-1];
                    AssetPortfolio.length--;
                }
            }
        }
        TransactionHistory.push(TransactionDetail({
                shareName: _shareName,
                NumOfUnits: _deductVal,
                action: "Sell",
                Date: now,
                Status: "Success",
                amount: _amount
            }));
    }


    //To withdraw funds
    function withdrawAmount(address payable _receiver, uint _amount) public payable {
        require(InvestmentAccountBalance >= _amount, 'Entered amount should be less than contract balance');
        _receiver.transfer(_amount);
        InvestmentAccountBalance = InvestmentAccountBalance - _amount;
    }

    function getTransactionsHistory() public view onlyManager(ManagerAddress) returns (TransactionDetail[] memory){
       return  TransactionHistory;
    }

    function getAssetPortfolio() public view onlyManager(ManagerAddress) returns (AssetDetail[] memory){
       return  AssetPortfolio;
    }

    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

     function InvestAccountBalance() public view returns (uint256){
        return InvestmentAccountBalance;
    }

    function() external payable{
        NetUserInvestedAmount += msg.value;
    }
}