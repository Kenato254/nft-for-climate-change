//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  string public name = "SimpleStorage";
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}