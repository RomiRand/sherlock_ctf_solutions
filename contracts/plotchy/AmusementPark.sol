//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import 'hardhat/console.sol';

//max 200 LoC
contract AmusementPark {

    /*
    The Amusement Park is designed to be navigated however the user wants, meaning there are several permutations available.
    Each ride is designed to take the user onto another ride,
    and the user wins the CTF challenge if they can complete each ride and leave the park with a Big Smile :)
    If the user is able to leave the park without riding each of the rides, that would be an unforeseen vulnerability.
    */

    address payable attacker;
    address parkInstance;
    bool Carousel = false;
    bool BumperCars = false;
    bool Rollercoaster = false;
    bool HouseOfMirrors = false;

    bool public BigSmile = false; //This is the flag for this challenge. Set it to true to win.

    constructor() {
        parkInstance = address(this);
    }

    modifier insidePark() {
        require(msg.sender == parkInstance, "Only customers can ride these rides!");
        _;
    }

    modifier rodeAllRides() {
        require(Carousel && BumperCars && Rollercoaster && HouseOfMirrors, "Ride all the rides before leaving!");
        _;
    }

    function parkEntrance(bytes calldata ticket) public {
        attacker = payable(msg.sender);
        address(this).call(ticket);
    }

    function _Carousel(bytes calldata ticket) external insidePark {
        console.log("Carousel");

        bytes memory nextRide;
        for(uint s = ticket.length; s > 0; s--) {
            nextRide = bytes.concat(nextRide, ticket[s-1]);
        }

        Carousel = true;
        address(this).call(nextRide);
        Carousel = false;
    }

    function _BumperCars(bytes calldata blueCar, uint40 redCar, bytes calldata yellowCar) external insidePark {
        console.log("BumperCars");
        bytes memory nextRide;

        require(keccak256(blueCar) == keccak256("blue"));
        require(redCar == uint40(bytes5(bytes.concat("255", "0", "0"))));
        bytes memory crash = abi.encodePacked(blueCar, redCar, yellowCar);

        (, bytes memory _rainbowCar) = abi.decode(crash, (uint256, bytes));
        nextRide = abi.encodePacked(_rainbowCar);
        
        BumperCars = true;
        address(this).call(nextRide);
        BumperCars = false;
    }

    enum ride { UP, DOWN, LEFT, RIGHT, LOOPdeLOOP, EXIT }

    function _Rollercoaster(bytes[] memory ticket) external insidePark {
        console.log("Rollercoaster");
        ride[8] memory rideFeatures = [ride.UP, ride.LEFT, ride.UP, ride.DOWN, ride.LOOPdeLOOP, ride.RIGHT, ride.DOWN, ride.EXIT];

        uint256 cartChain = uint256(bytes32(ticket[0]));
        for (uint256 count = 0; count < 8; count++) {
            uint256 singleCart = cartChain & 7;
            require(uint256(rideFeatures[count]) == singleCart, "failed!");
            cartChain >>= 3;
        }
        bytes memory nextRide = ticket[1];
        Rollercoaster = true;
        address(this).call(nextRide);
        Rollercoaster = false;
    }



    uint8 first = 0;        // 9
    uint8 second = 0;       // 5
    uint8 third = 0;        // 8
    // can't increase first faster than second... just one way:
    // wrap - no.. no unchecked :(
    function _HouseOfMirrors(bytes[] calldata houseLayout) external insidePark {
        console.log("Mirrors");

        if (uint256(bytes32(houseLayout[0])) >= 2)
        {
            attacker.call("");
        }
        else
        {
            first++;
            if (first > 6)
            {
                second++;
                if (second != 4)
                {
                    attacker.call("");
                }
                else if (third < 3)
                {
                    third++;
                    attacker.call("");
                }
                else
                {
                    third++;
                    if (uint256(bytes32(houseLayout[0])) < 1)
                    {
                        second++;
                    }
                    first++;
                    require(first % third++ != second);
                    third++;
                    second++;
                }
            }
            else
            {
                if (uint256(bytes32(houseLayout[0])) < 1)
                {
                    second++;
                }
                first++;
                require(first % third++ != second);
                third++;
                second++;
            }
        }


        if (uint256(bytes32(houseLayout[1])) <= 2)
        {
            // NOOP
        }
        else if (uint256(bytes32(houseLayout[2])) == 0)
        {
            first++;
            second++;
            if (first != second)
            {
                third++;
                if (uint256(bytes32(houseLayout[2])) != third)
                {
                    first--;
                    second--;
                    third--;
                    attacker.call("");
                }
            }
        }
        else
        {
            third++;
            if (uint256(bytes32(houseLayout[2])) != third)
            {
                first--;
                second--;
                third--;
                attacker.call("");
            }
        }



        require((first == 9 && second == 5 && third == 8) || BigSmile);
        console.log("DONEEEEEEEEEEEEEEEEEEEE");
        bytes memory nextRide = houseLayout[3];
        HouseOfMirrors = true;
        address(this).call(nextRide);
        first = 0;
        second = 0;
        third = 0;
        HouseOfMirrors = false;
    }


    function _leavePark() external insidePark rodeAllRides {
        BigSmile = true;
    }

    fallback() external {
        console.log("FALLBACK");
    }
}