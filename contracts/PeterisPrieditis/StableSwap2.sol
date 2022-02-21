// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StableSwap2 is Ownable, ReentrancyGuard {
    uint256 public supply;
    IERC20[] public underlying;
    mapping(address => bool) public hasUnderlying;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public approvals;

    function mint(uint256[] memory amounts)
        public
        nonReentrant
        returns (uint256)
    {
        uint256 totalSupply;
        uint256 totalBalanceNorm;
        uint256 totalInNorm;
        uint256 amountToMint;
        IERC20 token;
        uint256 has;
        uint256 preBalance;
        uint256 postBalance;
        uint256 deposited;
        
        totalSupply = supply;

        for (uint256 i = 0; i < underlying.length; i++)
        {
            token = underlying[i];

            preBalance = token.balanceOf(address(this));
            has = token.balanceOf(msg.sender);
            if (amounts[i] > has) amounts[i] = has;
            token.transferFrom(msg.sender, address(this), amounts[i]);

            postBalance = token.balanceOf(address(this));
            deposited = postBalance - preBalance;
            totalBalanceNorm += preBalance;
            totalInNorm += deposited;
        }
        if (totalSupply == 0)
        {
            amountToMint = totalInNorm;
        }
        else
        {
            amountToMint = (totalInNorm * totalSupply) / totalBalanceNorm;
        }
        supply += amountToMint;
        balances[msg.sender] += amountToMint;
        return amountToMint;
    }

    function burn(uint256 amount) public nonReentrant {
        require(balances[msg.sender] >= amount, "burn/low-balance");
        uint256 haveBalance;
        uint256 sendBalance;
        for (uint256 i = 0; i < underlying.length; i++) {
            haveBalance = underlying[i].balanceOf(address(this));
            sendBalance = (haveBalance * amount) / supply;

            underlying[i].transfer(msg.sender, sendBalance);
        }
        supply -= amount;
        balances[msg.sender] -= amount;
    }

    function donate(uint256 amount) public nonReentrant {
        require(balances[msg.sender] >= amount, "donate/low-balance");
        require(amount > 0, "donate/zero-amount");
        supply -= amount;
        balances[address(msg.sender)] -= amount;
    }

    function swap(
        address src,
        uint256 srcAmt,
        address dst
    ) public nonReentrant {
        require(hasUnderlying[src], "swap/invalid-src");
        require(hasUnderlying[dst], "swap/invalid-dst");

        uint256 preBalance;
        uint256 postBalance;
        uint256 input;
        uint256 sent;

        IERC20 srcToken = IERC20(src);
        IERC20 dstToken = IERC20(dst);

        preBalance = srcToken.balanceOf(address(this));
        srcToken.transferFrom(msg.sender, address(this), srcAmt);
        postBalance = srcToken.balanceOf(address(this));
        input = ((postBalance - preBalance) * 997) / 1000;

        preBalance = dstToken.balanceOf(address(this));
        dstToken.transfer(msg.sender, input);
        postBalance = dstToken.balanceOf(address(this));
        sent = preBalance - postBalance;
        require(sent <= input, "swap/bad-token");
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "transfer/low-balance");
        unchecked {
            balances[msg.sender] -= amount;
            balances[to] += amount;
        }
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        require(approvals[from][msg.sender] >= amount,"transferFrom/low-approval");
        require(balances[from] >= amount, "transferFrom/low-balance");
        approvals[from][msg.sender] -= amount;
        balances[from] -= amount;
        balances[to] += amount;
        return true;
    }

    function approve(address who, uint256 amount) public returns (bool) {
        approvals[msg.sender][who] = amount;
        return true;
    }

    function totalValue() public view returns (uint256) {
        uint256 value = 0;
        for (uint256 i = 0; i < underlying.length; i++)
        {
            value += underlying[i].balanceOf(address(this));
        }
        return value;
    }

    function addCollateral(address collateral) public onlyOwner {
        underlying.push(IERC20(collateral));
        hasUnderlying[collateral] = true;
    }
}
