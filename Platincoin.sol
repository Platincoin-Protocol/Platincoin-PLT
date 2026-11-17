// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BEP20Token {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    address public owner;
    bool public paused;
    bool public mintable;
    bool public burnable;
    bool public pausable;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Paused(address account);
    event Unpaused(address account);

    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }
    modifier whenNotPaused() { require(!paused, "paused"); _; }

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply,
        address _owner,
        bool _mintable,
        bool _burnable,
        bool _pausable
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        mintable = _mintable;
        burnable = _burnable;
        pausable = _pausable;
        owner = _owner;
        totalSupply = _initialSupply;
        balanceOf[_owner] = _initialSupply;
        emit Transfer(address(0), _owner, _initialSupply);
        emit OwnershipTransferred(address(0), _owner);
    }

    function transfer(address to, uint256 value) public whenNotPaused returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public whenNotPaused returns (bool) {
        uint256 a = allowance[from][msg.sender];
        require(a >= value, "allowance");
        if (a != type(uint256).max) allowance[from][msg.sender] = a - value;
        _transfer(from, to, value);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "zero addr");
        uint256 b = balanceOf[from];
        require(b >= value, "balance");
        unchecked { balanceOf[from] = b - value; }
        balanceOf[to] += value;
        emit Transfer(from, to, value);
    }

    function mint(address to, uint256 value) external onlyOwner {
        require(mintable, "not mintable");
        require(to != address(0), "zero");
        totalSupply += value;
        balanceOf[to] += value;
        emit Transfer(address(0), to, value);
    }

    function burn(uint256 value) external {
        require(burnable, "not burnable");
        uint256 b = balanceOf[msg.sender];
        require(b >= value, "balance");
        unchecked { balanceOf[msg.sender] = b - value; }
        totalSupply -= value;
        emit Transfer(msg.sender, address(0), value);
    }

    function pause() external onlyOwner {
        require(pausable, "not pausable");
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyOwner {
        require(pausable, "not pausable");
        paused = false;
        emit Unpaused(msg.sender);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function renounceOwnership() external onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }
}

contract BEP20Factory {
    address public owner;
    address public feeWallet;
    uint256 public fee;
    uint256 public tokenCount;

    event TokenCreated(
        address indexed token,
        address indexed creator,
        string name,
        string symbol,
        uint8 decimals,
        uint256 totalSupply
    );
    event FeeUpdated(uint256 fee);
    event FeeWalletUpdated(address wallet);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }

    constructor(address _owner, address _feeWallet, uint256 _fee) {
        require(_owner != address(0) && _feeWallet != address(0), "zero");
        owner = _owner;
        feeWallet = _feeWallet;
        fee = _fee;
        emit OwnershipTransferred(address(0), _owner);
    }

    function createToken(
        string calldata name_,
        string calldata symbol_,
        uint8 decimals_,
        uint256 initialSupply_,
        bool mintable_,
        bool burnable_,
        bool pausable_
    ) external payable returns (address) {
        require(msg.value >= fee, "insufficient fee");
        (bool sent, ) = feeWallet.call{value: msg.value}("");
        require(sent, "fee transfer failed");
        BEP20Token token = new BEP20Token(
            name_, symbol_, decimals_, initialSupply_, msg.sender, mintable_, burnable_, pausable_
        );
        tokenCount += 1;
        emit TokenCreated(address(token), msg.sender, name_, symbol_, decimals_, initialSupply_);
        return address(token);
    }

    function setFee(uint256 _fee) external onlyOwner { fee = _fee; emit FeeUpdated(_fee); }
    function setFeeWallet(address w) external onlyOwner { require(w != address(0), "zero"); feeWallet = w; emit FeeWalletUpdated(w); }
    function transferOwnership(address n) external onlyOwner { require(n != address(0), "zero"); emit OwnershipTransferred(owner, n); owner = n; }
}
