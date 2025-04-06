// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BloccMed {
    struct PatientRecord {
        string name;
        uint256 age;
        uint256 height;
        uint256 weight;
        string diagnosis;
        string treatment;
        address createdBy;
        uint256 timestamp;
    }

    PatientRecord[] public records;

    function addRecord(
        string memory _name,
        uint256 _age,
        uint256 _height,
        uint256 _weight,
        string memory _diagnosis,
        string memory _treatment
    ) public {
        records.push(PatientRecord(_name, _age, _height, _weight, _diagnosis, _treatment, msg.sender, block.timestamp));
    }

    function getRecord(uint256 index) public view returns (PatientRecord memory) {
        require(index < records.length, "Record does not exist");
        return records[index];
    }

    function getRecordsCount() public view returns (uint256) {
        return records.length;
    }
}
