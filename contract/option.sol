// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/1d2e15fbd7314f4f60b47d97d9b852aacd5404f7/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/1d2e15fbd7314f4f60b47d97d9b852aacd5404f7/contracts/utils/math/SafeMath.sol";
import "./Feed.sol";

contract Option {
    //Overflow safe operators
    using SafeMath for uint256;
    //PriceFeed interfaces
    IFeed internal ftFeed;
    //Interface for FT token functions
    IERC20 internal FT;
    //Precomputing hash of strings
    address payable contractAddr;
    address owner;
    uint256 lockAmount;
    uint256 fee = 1 * 10**14; // 0.0001 ether
    uint256 week = 60 * 60 * 24 * 7 * 1000;
    //Options stored in arrays of struct
    struct option {
        uint256 targetPrice; //Price in USD (18 decimal places) option allows buyer to purchase tokens at
        uint256 optionPrice; //Fee in contract token that option writer charges
        uint256 expiry; //Unix timestamp of expiration time
        uint256 amount; //Amount of tokens the option contract is for
        bool exercised; //Has option been exercised
        uint256 id; //Unique ID of option, also array index
        uint256 initPrice; //Helper to show last updated cost to exercise
        address payable writer; //Issuer of option
        address payable buyer; //Buyer of option
    }
    option[] public ftOpts;

    //Kovan feeds: https://docs.chain.link/docs/reference-contracts
    constructor(address feed, address erc20) {
        //FT/USD Kovan feed
        ftFeed = IFeed(feed);
        //FT token address on Kovan
        FT = IERC20(erc20);
        contractAddr = payable(address(this));
        owner = msg.sender;
    }

    function getOptsLength() public view returns (uint256) {
        return ftOpts.length;
    }

    //Returns the latest FT price
    function getFTPrice() public view returns (uint256) {
        uint256 price = ftFeed.getPrice();
        return uint256(price);
    }

    function getFTAmplitude() public view returns (uint256) {
        uint256 _amplitude = ftFeed.getAmplitude();
        return uint256(_amplitude);
    }

    function requestOption(uint256 tknAmt) public payable {
        uint256 ftPrice = getFTPrice();
        uint256 amplitude = getFTAmplitude();
        writeOption(
            ftPrice.sub(amplitude).sub(fee),
            fee,
            block.timestamp + 60 * 60 * 24 * 7,
            tknAmt
        );
    }

    //Allows user to write a covered call option
    //Takes which token, a targetPrice price(USD per token w/18 decimal places), premium(same unit as token), expiration time(unix) and how many tokens the contract is for
    function writeOption(
        uint256 targetPrice,
        uint256 optionPrice,
        uint256 expiry,
        uint256 tknAmt
    ) public payable {
        uint256 setPrice = getFTPrice();
        require(
            address(this).balance > targetPrice,
            "contract doesn't have enough ether"
        );
        lockAmount = lockAmount.add(targetPrice);
        ftOpts.push(
            option(
                targetPrice,
                optionPrice,
                expiry,
                tknAmt,
                false,
                ftOpts.length,
                setPrice,
                payable(msg.sender),
                payable(address(0))
            )
        );
    }

    function unlockAmount(uint256 ID) public {
        require(ftOpts[ID].expiry < block.timestamp, "Option is not expired");
        lockAmount = lockAmount.sub(ftOpts[ID].targetPrice);
    }

    //Purchase a call option, needs desired token, ID of option and payment
    function setOptionPrice(uint256 ID, uint256 newPrice) public payable {
        require(
            ftOpts[ID].expiry > block.timestamp,
            "Option is expired and cannot be bought"
        );
        require(ftOpts[ID].buyer == msg.sender, "You do not own this option");
        ftOpts[ID].optionPrice = newPrice;
    }

    //Purchase a call option, needs desired token, ID of option and payment
    function buyOption(uint256 ID) public payable {
        // updatePrices();
        require(
            ftOpts[ID].expiry > block.timestamp,
            "Option is expired and cannot be bought"
        );
        //Transfer optionPrice payment from buyer to writer
        require(
            ftOpts[ID].optionPrice >= msg.value,
            "have to send enough ether"
        );
        ftOpts[ID].buyer = payable(msg.sender);
    }

    //Exercise your call option, needs desired token, ID of option and payment
    function exercise(uint256 ID) public payable {
        //If not expired and not already exercised, allow option owner to exercise
        //To exercise, the targetPrice value*amount equivalent paid to writer (from buyer) and amount of tokens in the contract paid to buyer
        require(ftOpts[ID].buyer == msg.sender, "You do not own this option");
        require(!ftOpts[ID].exercised, "Option has already been exercised");
        require(ftOpts[ID].expiry > block.timestamp, "Option is expired");
        //Buyer exercises option, exercise cost paid to writer
        require(
            FT.transferFrom(msg.sender, address(this), ftOpts[ID].amount),
            "Incorrect FT amount sent to exercise"
        );
        //Pay buyer contract amount of FT
        require(
            payable(msg.sender).send(ftOpts[ID].targetPrice),
            "Error: buyer was not paid"
        );
        ftOpts[ID].exercised = true;
    }

    function withdraw() public payable {
        require(msg.sender == owner, "only owner can withdraw");
        payable(owner).transfer(owner.balance.sub(lockAmount));
    }

    receive() external payable {}
}
