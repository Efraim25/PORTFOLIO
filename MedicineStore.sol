// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineStore {
    // Mapping to track purchases (example)
    mapping(address => uint256) public purchases;

    // Function to purchase medicine
    function purchaseMedicine() public payable {
        require(msg.value == 1 ether, "You must send exactly 1 ETH");

        // Increment the purchase count for the buyer
        purchases[msg.sender] += 1;

        // Additional logic can go here (e.g., storing purchase details)
    }
}
