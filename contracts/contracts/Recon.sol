//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Protocol {
    uint256 THRESHOLD = 5000;
    uint256 BASIS = 10000;

    function decay(
        uint256 _lockedAmount,
        uint256 _daysPassed
    ) public returns (uint256) {
        uint256 newAmount = _lockedAmount *
            pow((THRESHOLD / BASIS), _daysPassed);
        return newAmount;
    }
}
