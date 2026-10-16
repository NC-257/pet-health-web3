// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hello {
    string public message = "Environment siap";

    function setMessage(string memory _msg) public {
        message = _msg;
    }
}