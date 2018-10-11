pragma solidity ^0.4.24;

contract ERC20 {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract MarketMaker
{
    address public KHAN;
    address public GW;
    
    event exchange(address indexed from, uint inputToken,uint outputToken, string fromToken, string toToken);
    
    // KHAN; GW
    //"0xfAB9D5b3504Fa717cB87A61534240503b60b0F92","0x27F5BB4edEeAD3854A89e9fe6ac2467A1aB5cbD4"
    constructor (address token1, address token2) public {
        KHAN = token1;  //0xfAB9D5b3504Fa717cB87A61534240503b60b0F92;
        GW = token2;   //0x27F5BB4edEeAD3854A89e9fe6ac2467A1aB5cbD4;
    }
    
    function exchangeKHANtoGW( uint khanAmount ) public {
        
        if( khanAmount > 50000000000000000000) {
            revert();
        }
        
        uint gwToTransfer = khanAmount * getGWAmount() / getKHANAmount();

        ERC20(KHAN).approve(address(this), khanAmount );
        
        ERC20(KHAN).transferFrom(msg.sender, address(this), khanAmount);
        
        ERC20(GW).transfer(msg.sender, gwToTransfer);
        
        emit exchange( msg.sender, khanAmount, gwToTransfer, "KHAN", "GW" );

    }
    
    function exchangeGWToKHAN( uint gwAmount ) public {
        
        if( gwAmount > 50000000000000000000) {
            revert();
        }
        
        uint khanToTransfer = gwAmount * getKHANAmount() / getGWAmount();
        
        ERC20(GW).approve(address(this), gwAmount );
        
        ERC20(GW).transferFrom(msg.sender, address(this), gwAmount);
        
        ERC20(KHAN).transfer(msg.sender, khanToTransfer);
        
        emit exchange( msg.sender, gwAmount, khanToTransfer, "GW", "KHAN" );
    }
    
    function getMarketMakerAddress () public view returns   (address){
        return address(this);
    }
    
    function getGWAmount() public view returns (uint) {
        return  ERC20(GW).balanceOf(address(this)) ;
    }
   
    function getKHANAmount() public view returns (uint) {
        return  ERC20(KHAN).balanceOf(address(this)) ;
    }
}