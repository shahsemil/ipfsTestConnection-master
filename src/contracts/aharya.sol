pragma experimental ABIEncoderV2;
pragma solidity  ^0.6.0; 
 
 contract evidence{
     //smart contract code 
     string[] evidenceHash;
     uint[][] location; 
     string[] return_hash;
     uint temphash;
     uint returnhashPointer=0;
     uint256 pointer=0;
     uint256 pointer_uniqueId=0;
     //write function
     function set(string memory _evidenceHash) public returns(uint256) {
         pointer=pointer+1;
         evidenceHash[pointer] = _evidenceHash;
         return pointer;
     }
     //read function
     function get(uint _uniqueId) public returns(string[] memory){
         for(uint j=0;j<1000;j++)
         {
             if(location[j][0]==_uniqueId)
             {
                for(uint i=1;i<50;i++)
                {
                    if(location[j][i]!=123456)
                    {
                    temphash=location[j][i];
                    return_hash[returnhashPointer]=evidenceHash[temphash];
                    returnhashPointer=returnhashPointer+1;
                    }
                    else{
                        break;
                    }
                }
                break;
             }
         }
        returnhashPointer=0;
        return return_hash;
     }
     function done(uint[] memory _uniqueId)public{
         location[pointer_uniqueId][0]=_uniqueId[0];
         for(uint i=1;i<=50;i++)
         {
             if(_uniqueId[i]!=123456)
             {
                 location[pointer_uniqueId][i]=_uniqueId[i];
             }else{
                 break;
             }
         }
         pointer_uniqueId=pointer_uniqueId+1;
     }
 }