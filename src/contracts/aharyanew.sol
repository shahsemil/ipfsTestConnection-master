// SPDX-License-Identifier: MIT

pragma solidity  ^0.6.0; 
 
 contract evidence{
     
    //smart contract code 
    IpfsStorage[] public ipfsDatabase;
    mapping (string => uint256) public ipfsID;
     
    struct IpfsStorage {
        uint256 id;
        string name;
        string hash;
    }
 
    //write function
    function set(string memory _evidenceHash,string memory _name) public returns(uint256) {
        ipfsDatabase.push(IpfsStorage({
            id: ipfsDatabase.length,
            name : _name,
            hash: _evidenceHash
        }));
        ipfsID[_name] = ipfsDatabase.length-1;
        return ipfsDatabase.length-1;
    }
 }