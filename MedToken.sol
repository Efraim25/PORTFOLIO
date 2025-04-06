// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MedToken is ERC20 {
    constructor() ERC20("MedToken", "MTKN") {
        _mint(msg.sender, 1000 * 10**18); // Initial supply of 1000 tokens
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}
