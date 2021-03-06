// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Reader {

    uint internal booksLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;


// declaring the struct for the comment
     struct Comment {
        uint256 postId;
        address commenterAddress;
        string commentMessage;
    }

// declaring the struct for the book
    struct Book {
        address payable owner;
        string author;
        string title;
        string cover;
        string description;
        uint numberOfcomment;
      
    }

    mapping (uint => Book) internal books; //mapping books
    mapping (uint => Comment[]) internal commentsMap;// mapping comments

   
   // adding a new book to the mapping
    function addBook(
        string memory _author,
        string memory _title,
        string memory _cover,
        string memory _description

    ) public {
        uint _numberOfcomment = 0;
        
        books[booksLength] = Book(
            payable(msg.sender),
            _author,
            _title,
            _cover,
            _description,
            _numberOfcomment
           
        );
        booksLength++;
    }

// getting book from the mapping
    function getBook(uint _index) public view returns (
        address payable,
        string memory, 
        string memory, 
        string memory, 
        string memory, 
        uint,
        Comment[] memory
    ) {
        Book memory b = books[_index];
        Comment[] memory comments = commentsMap[_index];
        return (
            b.owner,
            b.author, 
            b.title, 
            b.cover, 
            b.description, 
            b.numberOfcomment,
            comments
        );
    }


      // function to add a comment to a book
   function addComment(uint _index, string memory _comment) public{
    commentsMap[_index].push(Comment(_index, address(msg.sender), _comment));
    books[_index].numberOfcomment++;
  }
   
     // function to get comments
   function getComments(uint _index) public view returns(Comment[] memory){
    return(commentsMap[_index]);
  }
    // function to donate to the owner of a book 
   function donate(uint _index, uint _price) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            books[_index].owner,
            _price
          ),
          "Transfer failed."
        );

    }
    // getting the length of books
    function getBooksLength() public view returns (uint) {
        return (booksLength);
    }
// getting the length of comments 
    function getcommentsLength(uint _index) public view returns (uint) {
        return commentsMap[_index].length;
    }
}