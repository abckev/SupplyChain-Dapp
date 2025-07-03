// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;contract SupplyChain {

    enum State { Produced, Processed, Distributed, Sold }struct Product {
        uint256 id;
        string name;
        string origin;
        State state;
        address owner;
        bool isTrustful;
    }

    struct ProductHistory {
        State state;
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => ProductHistory[]) public productHistories;
    mapping(string => bool) public trustfulProducts; // Map to store trustful products by name
    mapping(string => bool) public localOrigins; // Map to store local origins
    string[] public localOriginKeys; // Array to store keys of local origins
    string[] public trustfulProductKeys; // Array to store keys of trustful products
    uint256 public productCounter;

    address public owner; // Contract owner for administrative functions

    event ProductStateChange(uint256 id, State state);
    event LocalOriginAdded(string origin);
    event LocalOriginRemoved(string origin);
    event TrustfulProductAdded(string productName);
    event TrustfulProductRemoved(string productName);

    // Modifier to restrict functions to contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // Set the deployer as the contract owner
    }

    // Function to add a local origin (only contract owner)
    function addLocalOrigin(string memory _origin) public onlyOwner {
        require(!localOrigins[_origin], "Origin already exists");
        localOrigins[_origin] = true;
        localOriginKeys.push(_origin);
        emit LocalOriginAdded(_origin);
    }

    // Function to remove a local origin (only contract owner)
    function removeLocalOrigin(string memory _origin) public onlyOwner {
        require(localOrigins[_origin], "Origin does not exist");
        localOrigins[_origin] = false;
        // Remove from localOriginKeys (inefficient but functional for small arrays)
        for (uint256 i = 0; i < localOriginKeys.length; i++) {
            if (keccak256(abi.encodePacked(localOriginKeys[i])) == keccak256(abi.encodePacked(_origin))) {
                localOriginKeys[i] = localOriginKeys[localOriginKeys.length - 1];
                localOriginKeys.pop();
                break;
            }
        }
        emit LocalOriginRemoved(_origin);
    }

    // Function to add a trustful product (only contract owner)
    function addTrustfulProduct(string memory _productName) public onlyOwner {
        require(!trustfulProducts[_productName], "Product already marked as trustful");
        trustfulProducts[_productName] = true;
        trustfulProductKeys.push(_productName);
        emit TrustfulProductAdded(_productName);
    }

    // Function to remove a trustful product (only contract owner)
    function removeTrustfulProduct(string memory _productName) public onlyOwner {
        require(trustfulProducts[_productName], "Product not marked as trustful");
        trustfulProducts[_productName] = false;
        // Remove from trustfulProductKeys (inefficient but functional for small arrays)
        for (uint256 i = 0; i < trustfulProductKeys.length; i++) {
            if (keccak256(abi.encodePacked(trustfulProductKeys[i])) == keccak256(abi.encodePacked(_productName))) {
                trustfulProductKeys[i] = trustfulProductKeys[trustfulProductKeys.length - 1];
                trustfulProductKeys.pop();
                break;
            }
        }
        emit TrustfulProductRemoved(_productName);
    }

    // Register a new product
    function registerProduct(string memory _name, string memory _origin) public {
        productCounter++;
        bool trustful = trustfulProducts[_name];
        products[productCounter] = Product(
            productCounter,
            _name,
            _origin,
            State.Produced,
            msg.sender,
            trustful
        );
        productHistories[productCounter].push(
            ProductHistory({state: State.Produced, owner: msg.sender, timestamp: block.timestamp})
        );
        emit ProductStateChange(productCounter, State.Produced);
    }

    // Update product state (e.g., Processed, Distributed, Sold)
    function updateProductState(uint256 _id, State _state) public {
        require(products[_id].owner == msg.sender, "Only the product owner can update the state");
        require(_id <= productCounter && _id > 0, "Invalid product ID");
        products[_id].state = _state;
        productHistories[_id].push(
            ProductHistory({state: _state, owner: msg.sender, timestamp: block.timestamp})
        );
        emit ProductStateChange(_id, _state);
    }

    // Transfer ownership (e.g., to distributor or retailer)
    function transferOwnership(uint256 _id, address _newOwner) public {
        require(products[_id].owner == msg.sender, "Only the product owner can transfer ownership");
        require(_id <= productCounter && _id > 0, "Invalid product ID");
        require(_newOwner != address(0), "Invalid new owner address");
        products[_id].owner = _newOwner;
        productHistories[_id].push(
            ProductHistory({state: products[_id].state, owner: _newOwner, timestamp: block.timestamp})
        );
        // Nota: Non emettiamo un evento specifico per il trasferimento qui, ma possiamo aggiungerlo se necessario
    }

    // Retrieve product details
    function getProduct(uint256 _id) public view returns (Product memory) {
        require(_id <= productCounter && _id > 0, "Invalid product ID");
        return products[_id];
    }

    // Retrieve product history
    function getProductHistory(uint256 _id) public view returns (ProductHistory[] memory) {
        require(_id <= productCounter && _id > 0, "Invalid product ID");
        return productHistories[_id];
    }

    // Check if the product is local
    function isProductLocal(uint256 _id) public view returns (bool) {
        require(_id <= productCounter && _id > 0, "Invalid product ID");
        Product memory product = products[_id];
        return localOrigins[product.origin];
    }

    // Check if product information is trustful
    function isInformationTrustful(uint256 _productId) public view returns (bool) {
        require(_productId <= productCounter && _productId > 0, "Invalid product ID");
        Product memory product = products[_productId];
        return product.isTrustful;
    }

    // Function to show all registered products
    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCounter);
        for (uint256 i = 1; i <= productCounter; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }

    // Function to purchase a product
    function purchase(uint256 _id) public {
        require(_id <= productCounter && _id > 0, "Invalid product ID");
        require(products[_id].state != State.Sold, "Product is already sold");
        products[_id].owner = msg.sender;
        products[_id].state = State.Sold;
        productHistories[_id].push(
            ProductHistory({state: State.Sold, owner: msg.sender, timestamp: block.timestamp})
        );
        emit ProductStateChange(_id, State.Sold);
        // Nota: La logica del pagamento non è implementata qui; può essere aggiunta con un valore `payable` se necessario
    }

    // Function to transfer the product to another user
    function transfer(uint256 _id, address _newOwner) public {
        require(_id <= productCounter && _id > 0, "Invalid product ID");
        require(products[_id].owner == msg.sender, "Only the owner can transfer the product");
        require(products[_id].state != State.Sold, "Cannot transfer product in 'Sold' state");
        require(_newOwner != address(0), "Invalid new owner address");
        products[_id].owner = _newOwner;
        products[_id].state = State.Distributed;
        productHistories[_id].push(
            ProductHistory({state: State.Distributed, owner: _newOwner, timestamp: block.timestamp})
        );
        emit ProductStateChange(_id, State.Distributed);
    }

    // Function to get all local origins
    function getLocalOrigins() public view returns (string[] memory) {
        return localOriginKeys;
    }

    // Function to get all trustful products
    function getTrustfulProducts() public view returns (string[] memory) {
        return trustfulProductKeys;
    }
}