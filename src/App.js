import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

function App() {
  const supplyChainAddress = '0x2b06A4A08D0039f1e21FfF20C6Fc52D2151E1dF4';
  const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "origin",
				"type": "string"
			}
		],
		"name": "LocalOriginAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "origin",
				"type": "string"
			}
		],
		"name": "LocalOriginRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum SupplyChain.State",
				"name": "state",
				"type": "uint8"
			}
		],
		"name": "ProductStateChange",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			}
		],
		"name": "TrustfulProductAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			}
		],
		"name": "TrustfulProductRemoved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_origin",
				"type": "string"
			}
		],
		"name": "addLocalOrigin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			}
		],
		"name": "addTrustfulProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "origin",
						"type": "string"
					},
					{
						"internalType": "enum SupplyChain.State",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isTrustful",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.Product[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLocalOrigins",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "origin",
						"type": "string"
					},
					{
						"internalType": "enum SupplyChain.State",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isTrustful",
						"type": "bool"
					}
				],
				"internalType": "struct SupplyChain.Product",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProductHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum SupplyChain.State",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct SupplyChain.ProductHistory[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTrustfulProducts",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			}
		],
		"name": "isInformationTrustful",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "isProductLocal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "localOriginKeys",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "localOrigins",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "productCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "productHistories",
		"outputs": [
			{
				"internalType": "enum SupplyChain.State",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "enum SupplyChain.State",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isTrustful",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_origin",
				"type": "string"
			}
		],
		"name": "registerProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_origin",
				"type": "string"
			}
		],
		"name": "removeLocalOrigin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			}
		],
		"name": "removeTrustfulProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "trustfulProductKeys",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "trustfulProducts",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "enum SupplyChain.State",
				"name": "_state",
				"type": "uint8"
			}
		],
		"name": "updateProductState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

  const [productName, setProductName] = useState('');
  const [productOrigin, setProductOrigin] = useState('');
  const [productId, setProductId] = useState(0);
  const [newOwner, setNewOwner] = useState('');
  const [localOrigin, setLocalOrigin] = useState('');
  const [trustfulProduct, setTrustfulProduct] = useState('');
  const [productDetails, setProductDetails] = useState({});
  const [productHistory, setProductHistory] = useState([]);
  const [isTrustful, setIsTrustful] = useState(null);
  const [isLocal, setIsLocal] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [localOrigins, setLocalOrigins] = useState([]);
  const [trustfulProducts, setTrustfulProducts] = useState([]);

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setCurrentAccount(address);
        const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
        const owner = await contract.owner();
        setIsOwner(address.toLowerCase() === owner.toLowerCase());
        fetchAllData();
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("Please install MetaMask to use this DApp.");
    }
  }

  async function changeWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setCurrentAccount(address);
        const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
        const owner = await contract.owner();
        setIsOwner(address.toLowerCase() === owner.toLowerCase());
        fetchAllData();
        alert("Wallet changed successfully.");
      } catch (error) {
        console.error("Error changing wallet:", error);
        alert("Failed to change wallet. Please try again.");
      }
    } else {
      alert("Please install MetaMask to use this DApp.");
    }
  }

  async function fetchAllData() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
      const products = await contract.getAllProducts();
      setAllProducts(products.map(product => ({
        id: product.id.toNumber(),
        name: product.name,
        origin: product.origin,
        state: product.state,
        owner: product.owner,
        isTrustful: product.isTrustful
      })));
      const origins = await contract.getLocalOrigins();
      setLocalOrigins(origins);
      const trustful = await contract.getTrustfulProducts();
      setTrustfulProducts(trustful);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function addLocalOrigin() {
    if (!localOrigin) {
      alert("Please enter a valid origin.");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const transaction = await contract.addLocalOrigin(localOrigin);
      await transaction.wait();
      alert(`Local origin added: ${localOrigin}`);
      setLocalOrigin('');
      fetchAllData();
    } catch (error) {
      console.error("Error adding local origin:", error);
      alert("Failed to add local origin. Please check the console.");
    }
  }

  async function removeLocalOrigin() {
    if (!localOrigin) {
      alert("Please enter a valid origin.");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const transaction = await contract.removeLocalOrigin(localOrigin);
      await transaction.wait();
      alert(`Local origin removed: ${localOrigin}`);
      setLocalOrigin('');
      fetchAllData();
    } catch (error) {
      console.error("Error removing local origin:", error);
      alert("Failed to remove local origin. Please check the console.");
    }
  }

  async function addTrustfulProduct() {
    if (!trustfulProduct) {
      alert("Please enter a valid product name.");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const transaction = await contract.addTrustfulProduct(trustfulProduct);
      await transaction.wait();
      alert(`Trustful product added: ${trustfulProduct}`);
      setTrustfulProduct('');
      fetchAllData();
    } catch (error) {
      console.error("Error adding trustful product:", error);
      alert("Failed to add trustful product. Please check the console.");
    }
  }

  async function removeTrustfulProduct() {
    if (!trustfulProduct) {
      alert("Please enter a valid product name.");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const transaction = await contract.removeTrustfulProduct(trustfulProduct);
      await transaction.wait();
      alert(`Trustful product removed: ${trustfulProduct}`);
      setTrustfulProduct('');
      fetchAllData();
    } catch (error) {
      console.error("Error removing trustful product:", error);
      alert("Failed to remove trustful product. Please check the console.");
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function registerProduct() {
    if (!productName || !productOrigin) {
      alert("Please enter both product name and origin.");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const transaction = await contract.registerProduct(productName, productOrigin);
      await transaction.wait();
      alert(`Product registered successfully: ${productName}, ${productOrigin}`);
      setProductName('');
      setProductOrigin('');
      fetchAllData();
    } catch (error) {
      console.error("Error registering product:", error);
      alert("Failed to register product. Please check the console.");
    }
  }

  async function fetchProduct() {
    if (!productId || productId <= 0) {
      alert("Please enter a valid product ID.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
      const product = await contract.getProduct(productId);
      setProductDetails({
        id: product.id.toNumber(),
        name: product.name,
        origin: product.origin,
        state: product.state,
        owner: product.owner,
        isTrustful: product.isTrustful
      });
      const history = await contract.getProductHistory(productId);
      setProductHistory(history.map(event => ({
        state: event.state,
        owner: event.owner,
        timestamp: event.timestamp.toNumber()
      })));
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to fetch product details. Please check the console.");
    }
  }

  async function checkInformationTrustful() {
    if (!productId || productId <= 0) {
      alert("Please enter a valid product ID.");
      return;
    }
    if (typeof window.ethereum === 'undefined') {
      alert("Please install MetaMask to use this DApp.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
      const trustful = await contract.isInformationTrustful(productId);
      setIsTrustful(trustful);
    } catch (error) {
      console.error("Error checking information trustfulness:", error);
      alert("Failed to check trustfulness. Please check the console.");
    }
  }

  async function checkProductLocal() {
    if (!productId || productId <= 0) {
      alert("Please enter a valid product ID.");
      return;
    }
    if (typeof window.ethereum === 'undefined') {
      alert("Please install MetaMask to use this DApp.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(supplyChainAddress, ABI, provider);
      const local = await contract.isProductLocal(productId);
      setIsLocal(local);
    } catch (error) {
      console.error("Error checking if product is local:", error);
      alert("Failed to check if product is local. Please check the console.");
    }
  }

  async function transferProductOwnership() {
    if (!productId || productId <= 0 || !newOwner) {
      alert("Please enter a valid product ID and new owner address.");
      return;
    }
    if (!ethers.utils.isAddress(newOwner)) {
      alert("Invalid Ethereum address for new owner.");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const transaction = await contract.transfer(productId, newOwner);
      await transaction.wait();
      alert("Product ownership transferred successfully.");
      setNewOwner('');
      fetchProduct();
      fetchAllData();
    } catch (error) {
      console.error("Error transferring product ownership:", error);
      alert("Transfer failed. Please check the console for details.");
    }
  }

  async function purchaseProduct() {
    if (!productId || productId <= 0) {
      alert("Please enter a valid product ID.");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(supplyChainAddress, ABI, signer);
      const product = await contract.getProduct(productId);
      if (product.state === 3) {
        alert("Error: This product has already been sold.");
        return;
      }
      const transaction = await contract.purchase(productId);
      await transaction.wait();
      alert("Product purchased successfully.");
      fetchProduct();
      fetchAllData();
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Failed to purchase the product. Please check the console.");
    }
  }

  useEffect(() => {
    if (currentAccount) {
      fetchAllData();
    }
  }, [currentAccount]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Supply Chain DApp</h1>
        {!currentAccount ? (
          <div className="button-group">
            <button onClick={connectWallet} className="form-button">Connect Wallet</button>
          </div>
        ) : (
          <div className="account-info">
            <p>Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</p>
            <p className={isOwner ? "owner-status owner" : "owner-status not-owner"}>
              Status: {isOwner ? "Contract Owner" : "Regular User"}
            </p>
            <div className="button-group">
              <button onClick={changeWallet} className="form-button">Change Wallet</button>
            </div>
          </div>
        )}
      </header>
      <main className="App-main">
        <div className="column-left">
          {isOwner && (
            <section className="product-section admin-panel">
              <h2>Admin Panel</h2>
              <div className="form-container">
                <h3>Manage Local Origins</h3>
                <input
                  type="text"
                  value={localOrigin}
                  onChange={(e) => setLocalOrigin(e.target.value)}
                  placeholder="Local Origin (e.g., Italy)"
                  className="form-input"
                />
                <div className="button-group">
                  <button onClick={addLocalOrigin} className="form-button">Add Local Origin</button>
                  <button onClick={removeLocalOrigin} className="form-button">Remove Local Origin</button>
                </div>
              </div>
              <div className="form-container">
                <h3>Manage Trustful Products</h3>
                <input
                  type="text"
                  value={trustfulProduct}
                  onChange={(e) => setTrustfulProduct(e.target.value)}
                  placeholder="Trustful Product (e.g., Wine)"
                  className="form-input"
                />
                <div className="button-group">
                  <button onClick={addTrustfulProduct} className="form-button">Add Trustful Product</button>
                  <button onClick={removeTrustfulProduct} className="form-button">Remove Trustful Product</button>
                </div>
              </div>
            </section>
          )}

          <section className="product-section">
            <h2>Register Product</h2>
            <div className="form-container">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
                className="form-input"
              />
              <input
                type="text"
                value={productOrigin}
                onChange={(e) => setProductOrigin(e.target.value)}
                placeholder="Product Origin"
                className="form-input"
              />
              <div className="button-group">
                <button onClick={registerProduct} className="form-button">Register Product</button>
              </div>
            </div>
          </section>

          <section className="product-section">
            <h2>Get Product Details</h2>
            <div className="form-container">
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(Number(e.target.value))}
                placeholder="Product ID"
                className="form-input"
              />
              <div className="button-group">
                <button onClick={fetchProduct} className="form-button">Fetch Product</button>
              </div>
            </div>
            {productDetails.id && (
              <div className="product-info">
                <p><strong>ID:</strong> {productDetails.id}</p>
                <p><strong>Name:</strong> {productDetails.name}</p>
                <p><strong>Origin:</strong> {productDetails.origin}</p>
                <p><strong>State:</strong> {['Produced', 'Processed', 'Distributed', 'Sold'][productDetails.state]}</p>
                <p><strong>Owner:</strong> {productDetails.owner}</p>
                <p className={productDetails.isTrustful ? "trustful" : "not-trustful"}>
                  <strong>Trustful:</strong> {productDetails.isTrustful ? 'Yes' : 'No'}
                </p>
              </div>
            )}
          </section>

          <section className="product-section">
            <h2>Check Product Status</h2>
            <div className="form-container">
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(Number(e.target.value))}
                placeholder="Product ID"
                className="form-input"
              />
              <div className="button-group">
                <button onClick={checkInformationTrustful} className="form-button">Check Trustful</button>
                <button onClick={checkProductLocal} className="form-button">Check Local</button>
              </div>
            </div>
            {isTrustful !== null && (
              <p className={isTrustful ? 'trustful' : 'not-trustful'}>
                Information is {isTrustful ? 'Trustful' : 'Not Trustful'}
              </p>
            )}
            {isLocal !== null && (
              <p className={isLocal ? 'local' : 'not-local'}>
                Product is {isLocal ? 'Local' : 'Not Local'}
              </p>
            )}
          </section>

          <section className="product-section">
            <h2>Purchase Product</h2>
            <div className="form-container">
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(Number(e.target.value))}
                placeholder="Product ID"
                className="form-input"
              />
              <div className="button-group">
                <button onClick={purchaseProduct} className="form-button">Purchase Product</button>
              </div>
            </div>
          </section>

          <section className="product-section">
            <h2>Transfer Product</h2>
            <div className="form-container">
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(Number(e.target.value))}
                placeholder="Product ID"
                className="form-input"
              />
              <input
                type="text"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                placeholder="New Owner Address"
                className="form-input"
              />
              <div className="button-group">
                <button onClick={transferProductOwnership} className="form-button">Transfer Product</button>
              </div>
            </div>
          </section>

          {productHistory.length > 0 && (
            <section className="product-section product-history">
              <h2>Product History</h2>
              <ul>
                {productHistory.map((event, index) => (
                  <li key={index}>
                    <p><strong>State:</strong> {['Produced', 'Processed', 'Distributed', 'Sold'][event.state]}</p>
                    <p><strong>Owner:</strong> {event.owner}</p>
                    <p><strong>Timestamp:</strong> {new Date(event.timestamp * 1000).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="column-right">
          <section className="product-section product-lists">
            <h2>Product Information</h2>
            <div className="list-container">
              <h3>All Products</h3>
              {allProducts.length > 0 ? (
                <ul>
                  {allProducts.map((product, index) => (
                    <li key={index} className={product.isTrustful ? 'trustful' : ''}>
                      ID: {product.id}, Name: {product.name}, Origin: {product.origin}, 
                      State: {['Produced', 'Processed', 'Distributed', 'Sold'][product.state]}, 
                      Trustful: {product.isTrustful ? 'Yes' : 'No'}, 
                      Local: {localOrigins.includes(product.origin) ? 'Yes' : 'No'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products registered yet.</p>
              )}
            </div>
            <div className="list-container">
              <h3>Local Origins</h3>
              {localOrigins.length > 0 ? (
                <ul>
                  {localOrigins.map((origin, index) => (
                    <li key={index} className="local">{origin}</li>
                  ))}
                </ul>
              ) : (
                <p>No local origins registered.</p>
              )}
            </div>
            <div className="list-container">
              <h3>Trustful Products</h3>
              {trustfulProducts.length > 0 ? (
                <ul>
                  {trustfulProducts.map((product, index) => (
                    <li key={index} className="trustful">{product}</li>
                  ))}
                </ul>
              ) : (
                <p>No trustful products registered.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
