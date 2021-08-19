// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFeed {
    function getPrice() external view returns (uint256);

    function getAmplitude() external view returns (uint256);
}

contract Feed is IFeed {
    // ETH/FT 2ether
    function getPrice() public pure override returns (uint256) {
        return 2 * 10**16;
    }

    function getAmplitude() public pure override returns (uint256) {
        return 1 * 10**15; // 5% of 0.002 ether
    }
}
