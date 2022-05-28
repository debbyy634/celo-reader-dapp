
import './App.css';

import { NavigationBar } from './components/NavigationBar';
import { AddBook } from './components/addbook';
import { useState, useEffect, useCallback } from "react";


import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";


import reader from "./contracts/reader.abi.json";
import IERC from "./contracts/IERC.abi.json";
import { Books } from './components/books';


const ERC20_DECIMALS = 18;
const donationPrice = "2";



const contractAddress = "0x7084e7125e08b0BBAe2e1DD1ff4Fd421D3880BDF";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";



function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [bookks, setBooks] = useState([]);
  const [coms, setComs] = useState([]);


  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Error Occurred");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(reader, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);



  const getBooks = useCallback(async () => {
    const booksLength = await contract.methods.getBooksLength().call();
    const books = [];
    for (let index = 0; index < booksLength; index++) {
      let _books = new Promise(async (resolve, reject) => {
      let book = await contract.methods.getBook(index).call();

        resolve({
          index: index,
          owner: book[0],
          author: book[1],
          title: book[2],
          cover: book[3],
          description: book[4],
          numberOfcomment: book[5],
          comments: book[6]   
        });
      });
      books.push(_books);
    }


    const _books = await Promise.all(books);
    setBooks(_books);
  }, [contract]);


  const addBook = async (
    _author,
    _title,
    _cover,
    _description,
  ) => {
    try {
      await contract.methods
        .addBook(_author, _title, _cover, _description)
        .send({ from: address });
      getBooks();
    } catch (error) {
      alert(error);
    }
  };

  const addComment = async (
    _index,
    _comment
  ) => {
    try {
      await contract.methods
        .addComment(_index, _comment)
        .send({ from: address });
      getBooks();
    } catch (error) {
      alert(error);
    }
  };

  const Donate = async (_index) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
      const cost = new BigNumber(donationPrice)
        .shiftedBy(ERC20_DECIMALS)
        .toString();
      await cUSDContract.methods
        .approve(contractAddress, cost)
        .send({ from: address });
      await contract.methods.donate(_index, cost).send({ from: address });
      getBooks();
      getBalance();
      alert("you have successfully donated to the writer");
    } catch (error) {
      alert(error);
    }};


  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);

  useEffect(() => {
    if (contract) {
      getBooks();
    }
  }, [contract, getBooks]);
  
  return (
    <div className="App">
      <NavigationBar cUSDBalance={cUSDBalance} />
      <Books userWallet={address} bookks={bookks} addComment={addComment} donate={Donate} coms={coms}/>
      <AddBook addBook={addBook} />
    </div>
  );
}

export default App;
