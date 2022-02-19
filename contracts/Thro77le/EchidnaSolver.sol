pragma solidity 0.8.4;

import './Contract.sol';

contract EchidnaSolver {
    bytes32 bytecode;
    address constant hardhat_factory = 0xa16E02E87b7454126E5E10d957A927A7F5B5d2be;
    address constant ctf_factory = 0xFD4f30C20dA65a37fd74d55B257442a08469e6A6;
    constructor () public {
        bytecode = keccak256(type(Test).creationCode);
    }
    bool done;
    function test(uint i) public {
        address result = computeAddress(bytes32(i), bytecode, ctf_factory);
        done = isForbidden(result);
    }

    function echidna_test_address() public returns (bool) {
        return !done;
    }

    function isForbidden(address _addr) internal view returns (bool) {
        bytes20 addr = bytes20(_addr);
        bytes20 id   = hex"00000000000000000000000000000000000f0b1d";
        bytes20 mask = hex"00000000000000000000000000000000000fffff";

        for (uint256 i; i != 30; ++i) {
            if (addr & mask == id) {
                return true;
            }
            mask <<= 4;
            id <<= 4;
        }

        return false;
    }

    function computeAddress(
        bytes32 salt,
        bytes32 bytecodeHash,
        address deployer
    ) internal pure returns (address) {
        bytes32 _data = keccak256(abi.encodePacked(bytes1(0xff), deployer, salt, bytecodeHash));
        return address(uint160(uint256(_data)));
    }
}