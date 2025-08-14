// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCoraSecurityToken is ERC20, Ownable {
    mapping(address => bool) public isWhitelisted;

    constructor() ERC20("MyCora Security Token", "MCST") {}

    function whitelist(address user) external onlyOwner {
        isWhitelisted[user] = true;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(isWhitelisted[to], "User not whitelisted");
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        require(isWhitelisted[to], "Recipient not whitelisted");
        super._beforeTokenTransfer(from, to, amount);
    }
}