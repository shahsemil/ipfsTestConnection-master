import React, { Component } from 'react';
import './App.css';
import web3 from 'web3';
import evidence from '../abis/evidence.json';
// Added this new Library ipfs-api
const ipfsAPI = require('ipfs-api');
const ethers = require('ethers')



// New code according to ipfs-api
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
var memeHash="";
var memeHashVideo="";
var memeHashImage="";
var memeHashes=[];
var evidenceLinkImage=[];
var evidenceLinkVideo=[];
var noFiles=0;
/******** you need to take a unique id which would be given to us whenever someone is redirected to website****** */
var unique_id=0;//store that unique id here
memeHashes[0]=unique_id;
//var pointer_memeHashes=1;//this pointer is for memeHashes array
var uid = '';


// Blockchain Connection
// Configure blockchain
// Address : 0xc599CC35B2207e2e6E6Ca02845E39dbBbFB05417
// PK :  97145712ceda47b7886ba94a55f76038bb95ddb41f43fbb42189866878f453ae
// ContractTX : https://rinkeby.etherscan.io/tx/0xf9224a6abfeec04122f99e20ec300c68c126cccdf2a0a14ac9767ff0d9059e15
const pk = "0x97145712ceda47b7886ba94a55f76038bb95ddb41f43fbb42189866878f453ae"
const provider = new ethers.getDefaultProvider("rinkeby")
const wallet = new ethers.Wallet(pk,provider) 

const aharyaContractAdd = "0x7560cf40c71ed503b7e3dd98cc753261b09f61bd"
const aharyaContractAbi = [ { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "ipfsDatabase", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "hash", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ipfsID", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_evidenceHash", "type": "string" }, { "internalType": "string", "name": "_name", "type": "string" } ], "name": "set", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" } ]


// Loading Main Contract
const aharyaContract = new ethers.Contract(aharyaContractAdd, aharyaContractAbi, wallet)
console.log(aharyaContract)

// Contract Functionality
async function addToBlockchain(uid,memehash) { 
  const databaseFetch = await aharyaContract.functions.set(memehash,uid);
  const from = databaseFetch.from
  const to = databaseFetch.to
  const hash = databaseFetch.hash
  console.log("FromAddress: "+from+" ToAddress: "+to+" rinkebyTXhash: "+hash) 
  alert("UID added succesfully please enter uid again in DONE field")
};

async function viewFromBlockchain(uid) { 
  console.log("reacing here")
  const databasePosFetch = await aharyaContract.functions.ipfsID(uid);
  const floatValue = ethers.utils.formatUnits(databasePosFetch,'wei');
  const EvidencePos = parseInt(floatValue);
  console.log(EvidencePos) 
  const databaseFetch = await aharyaContract.functions.ipfsDatabase(EvidencePos);
  const id = databaseFetch.id;
  const name = databaseFetch.name;
  const hash = databaseFetch.hash;
  console.log("ID: "+id+" Name/UID: "+name+" Hash: "+hash)
  if(!(hash.localeCompare(memeHash)))
  {
  LinktoDatabase(hash);
  alert("data succesfully recorded")
  }else{
    alert("please click on done again")
  }
};
function LinktoDatabase(hash)
{
  evidenceLinkImage=memeHashImage.split('/');
  for(var i=0;i<noFiles;i++)
  {
    evidenceLinkImage[i]=("http://ipfs.io/ipfs/").concat(evidenceLinkImage[i])
  }
  evidenceLinkVideo=memeHashVideo.split('/');
  for(var i=0;i<noFiles;i++)
  {
    evidenceLinkVideo[i]=("http://ipfs.io/ipfs/").concat(evidenceLinkVideo[i])
  }
  console.log(evidenceLinkImage)
  console.log(evidenceLinkVideo)
}

class App extends Component {

  constructor(props){
    super(props); 
    this.state ={
      account:'',
      buffer: null,
      contract:null,
    };
  }
  
  buttonEnterIdListner = (event) => {
    event.preventDefault()
    uid = document.getElementById('uname').value;
    // alert(uid)
    // Send UID and Hash
    memeHash=memeHashVideo.concat(memeHashImage)
    addToBlockchain(uid,memeHash);
    // Alert.alert(uname);
  }
  /*async loadWeb3(){
    if(window.ethereum){
      window.web3=new web3(window.ethereum)
      await window.ethereum.enable()
    }if (window.web3){
      window.web3 = new web3(window.web3.currentProvider)
    }else{
      window.alert('please use wallet');
    }
  }*/


  
  captureFileImage = (event)=>{
    event.preventDefault()
    //processing file for ipfs i.e converting into buffer
    const file=event.target.files[0]
    //console.log(file)
    const reader= new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = ()=>{
      this.setState({
        buffer:Buffer(reader.result)
      })
      const bufferfile= Buffer(reader.result)
      // Uploading File Code
      // Ive written code to upload file to the IPFS here itself
      ipfs.files.add(bufferfile, function (err, file) {
        if (err) {
          console.log(err);
        }
        noFiles=noFiles+1;
        alert("image added succesfully you can select other image if you want to add")
        // This will print the hash
        var temp;
        temp=file[0].hash.concat('/')
        memeHashImage=memeHashImage.concat(temp)
        console.log("click on submit")
      })
      
    }

  }
  ////////////video//////////////////
  captureFileVideo = (event)=>{
    event.preventDefault()
    //processing file for ipfs i.e converting into buffer
    const file=event.target.files[0]
    //console.log(file)
    const reader= new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = ()=>{
      this.setState({
        buffer:Buffer(reader.result)
      })
      const bufferfile= Buffer(reader.result)
      // Uploading File Code
      // Ive written code to upload file to the IPFS here itself
      ipfs.files.add(bufferfile, function (err, file) {
        if (err) {
          console.log(err);
        }
        noFiles=noFiles+1;
        alert("video added succesfully you can select other image if you want to add")
        // This will print the hash
        var temp;
        temp=file[0].hash.concat('/')
        memeHashVideo=memeHashVideo.concat(temp)
        console.log("click on submit")
      })
      
    }

  }
  
  /*on submit code*/
  onSubmitImage=(event)=>{
    event.preventDefault()
    console.log("click on done when all hashes are uploaded")
    console.log(memeHashImage)
    
    //you need to call set function smart contract where you will give memeHash in string 
    //and it will return index of that hash in Integer shore that in memehashes array
  }
  onSubmitVideo=(event)=>{
    event.preventDefault()
    console.log("click on done when all hashes are uploaded")
    console.log(memeHashVideo)
    
    //you need to call set function smart contract where you will give memeHash in string 
    //and it will return index of that hash in Integer shore that in memehashes array
  }
  onUsername=(event)=>{
    const form=document.forms['user'];
        event.preventDefault()
        const value =form.querySelector('input[type="text"]').value;
        console.log(value)
  }
  onDone=(event)=>{
    event.preventDefault();
      //here you have to give UID of which data we want to fetch
      uid = document.getElementById('uname').value;
      viewFromBlockchain(uid)
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            semil ipfs 
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrop d-none d-sm-none d-sm-block"></li>
            <small className="text-white">{this.state.account}</small>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h2>Upload Evidence</h2>
                <a>
                  <img src={'http://ipfs.io/ipfs/Qme8KvWTgE6bvBGMzR6pGXYaWN1FpMRgaw66FrNyp2mMzB'} className="App-logo" />
                </a>
                <p>&nbsp;</p>
                <form onSubmit={this.onSubmit}>
                  <div className="submit">
                     <div className="image">
                       <h3>Upload Image</h3>
                    <input type='file' onChange={this.captureFileImage} />
                    <input type='submit' onChange={this.onSubmitImage}/>
                    </div>
                    <div className="video">
                      <h3>Upload Video</h3>
                    <input type='file' onChange={this.captureFileVideo} />
                    <input type='submit' onChange={this.onSubmitVideo}/>
                     </div>
                   </div>
                </form>
                <div className="button">
                  <form id="user" onUsername={this.onUsername}>
                    {/* <input type="text" id="fname" name="fname"/> */}
                    {/* <input type="submit" id="uname" value="Enter your unique id" onChange={this.onUsername}/>  */}
                    <input placeholder="Enter your unique id" id="uname"/> 
                    <button onClick={this.buttonEnterIdListner} >Add UID</button>
                    <div className="submit">
                    <input placeholder="Enter your unique id" id="uname"/> 
                      <button type="submit" id="done" value="Submit" onClick={this.onDone}>DONE</button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
