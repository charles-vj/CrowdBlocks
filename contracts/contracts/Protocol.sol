//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Protocol {
    uint256 THRESHOLD = 200;
    uint256 BASIS = 10000;

    struct Project {
        uint256 id;
        address owner;
        string name;
        string description;
        uint256 repScore;
        uint256 funds;
        uint256 tier;
    }

    struct Rating {
        uint256 totalCount;
        mapping(uint256 => address) idToAddress;
        mapping(uint256 => uint256) idToRating;
        uint256 sumOfReviews;
        uint256 average;
    }

    uint256 public projectCount;

    fallback() external payable {}

    mapping(uint256 => Project) public idToProject;
    mapping(uint256 => Rating) public idToReviews;

    function createProject(
        string memory _name,
        string memory _description
    ) public {
        idToProject[projectCount].id = projectCount;
        idToProject[projectCount].owner = msg.sender;
        idToProject[projectCount].name = _name;
        idToProject[projectCount].description = _description;
        projectCount = projectCount + 1;
    }

    function lockFunds(uint256 _id, uint256 _amount) public payable {
        idToProject[_id].funds = idToProject[_id].funds + amount;
    }

    function distributeFunds(uint256 _id) public {
        (bool success, ) = idToProject[_id].owner.call{
            value: idToProject[_id].funds
        }("");
        require(success, "Failed to send Ether");
        idToProject[_id].funds = 0;
    }

    function addReview(uint256 _id, uint256 _rating) public {
        idToReviews[_id].idToAddress[totalCount] = msg.sender;
        idToReviews[_id].idToRating[totalCount] = _rating;
        totalCount += 1;
        idToReviews[_id].sumOfReviews += _rating;
        idToReviews[_id].average =
            idToReviews[_id].sumOfReviews /
            idToReviews[_id].totalCount;
    }

    function initialEval(uint256 _id) public {}
}
