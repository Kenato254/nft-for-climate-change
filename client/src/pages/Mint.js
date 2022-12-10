import Web3 from 'web3';
import { useEffect, useState } from 'react';
import contract from '../contracts/ClimateNFT.json';


function Mint() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const ipfsData = JSON.parse(localStorage.getItem("ipfsData")) || [];

  const nft_name = ipfsData.length < 1  ? "" : ipfsData.name.slice(0, ipfsData.name.search(/\./g)).replace(/_/g, " ");
  const nft_ipfs_hash = ipfsData.length < 1 ? "" : ipfsData.ipfs_hash;

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {

        // Get network provider and web3 instance.
        const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545');

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        console.log("Network: ", await web3.eth.net.getId());
        const contractAddress = contract.networks[await web3.eth.net.getId()].address;
        const abi = contract.abi;

        // Create a contract instance
        const nftContract = new web3.eth.Contract(abi, contractAddress);
        console.log(nftContract);
        console.log("Initialize payment");

        let nftTxn = await nftContract.methods.mintCToken(nft_name, nft_ipfs_hash).send({ from: accounts[0], value: web3.utils.toWei("0.0001", "ether") }).on('receipt', function () {
          console.log('receipt')
          localStorage.clear();
          console.log("Cleared!")
          window.location.reload();
          console.log("Cleared!")
        });

        console.log("Mining...please wait");
        console.log("Mined: ", nftTxn.transactionHash);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className="my-5 w-full flex justify-center bg-green-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-lg cursor-pointer transition ease-in duration-300">
      Connect Wallet</button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="my-5 w-full flex justify-center bg-green-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-lg cursor-pointer transition ease-in duration-300">
      Mint NFT</button>
      )
  }
  
  useEffect(() => {
    checkWalletIsConnected()
  }, []);

  return (
    <div className='App'>
      <div className='main-app'>
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{ backgroundImage: "url(https://www.coindesk.com/resizer/uAcQrY4TkwR3dGCtcXo4zAyQfIA=/arc-photo-coindesk/arc2-prod/public/TA6CWB3BBNA5LFZZZBNRKMFQ5A.jpg)"}}>
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                Mint Now!
              </h2>
              <p className="mt-2 text-sm text-gray-400"></p>
            </div>
              {currentAccount ? mintNftButton() : connectWalletButton()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint;
