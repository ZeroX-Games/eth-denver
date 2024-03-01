// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title EventDriven
 * A fundamental implementation of the Event-Driven standard.
 */
contract EventDriven is AccessControl {
    /////////////////////////////////////////
    //                                     //
    //                ROLES                //
    //                                     //
    /////////////////////////////////////////

    bytes32 public constant ZEROX_NODE_ROLE = keccak256("ZEROX_NODE_ROLE");
    bytes32 public constant DOMAIN_OWNER_ROLE = keccak256("DOMAIN_OWNER_ROLE");

    // CREATE3 proxy contract will be the deployer so we cannot use msg.sender
    constructor(address defaultAdmin) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(ZEROX_NODE_ROLE, defaultAdmin);
        _setRoleAdmin(ZEROX_NODE_ROLE, DEFAULT_ADMIN_ROLE);
    }

    /////////////////////////////////////////
    //                                     //
    //               STORAGE               //
    //                                     //
    /////////////////////////////////////////

    // Domain ID => Domain Owner address
    mapping(uint256 => address) private domainOwner;
    // Domain ID => Domain Info URL
    mapping(uint256 => string) private domainInfo;
    // Domain ID => NFT collection address => bool
    mapping(uint256 => mapping(address => bool)) private domainRegisteredNft;
    // Domain ID => NFT collection address array
    mapping(uint256 => address[]) private domainRegisteredAllNfts;

    // Unique domainId iterator
    uint256 private domainIdIterator = 1;

    /////////////////////////////////////////
    //                                     //
    //                EVENTS               //
    //                                     //
    /////////////////////////////////////////

    // Event for domain registration
    event DomainRegistered(
        uint256 indexed domainId,
        address indexed domainOwnerAddr
    );
    // Event for NFT collection registration
    event NftAddressRegistered(
        uint256 indexed domainId,
        address indexed nftAddr
    );
    // Event for tokens update
    event TokensUpdate(uint256 indexed domainId, string url);

    /////////////////////////////////////////
    //                                     //
    //              MODIFIERS              //
    //                                     //
    /////////////////////////////////////////

    // Modifier for domain owner for a specific domainId
    modifier onlyDomainOwner(uint256 _domainId) {
        require(
            isDomainOwner(_domainId, msg.sender),
            "Caller is not a domain owner for this domain id"
        );
        _;
    }

    /////////////////////////////////////////
    //                                     //
    //             REGISTRATIONS           //
    //                                     //
    /////////////////////////////////////////

    /**
     * @dev Register a new domain and assigns a unique domainId to it.
     * @param _domainInfoUrl URL containing information about the domain.
     * @return The assigned domainId.
     */
    function registerNewDomain(string memory _domainInfoUrl)
        external
        returns (uint256)
    {
        uint256 newDomainId = domainIdIterator++;

        domainOwner[newDomainId] = msg.sender;
        domainInfo[newDomainId] = _domainInfoUrl;

        _grantRole(DOMAIN_OWNER_ROLE, msg.sender);
        emit DomainRegistered(newDomainId, msg.sender);
        return newDomainId;
    }

    /**
     * @dev Register a NFT address for a domain.
     * @param _domainId The unique identifier of the domain with which the NFT is to be registered.
     * @param _nftAddr The NFT collection address to be registered.collection.
     */
    function registerNft(uint256 _domainId, address _nftAddr)
        public
        onlyRole(DOMAIN_OWNER_ROLE)
        onlyDomainOwner(_domainId)
    {
        require(
            !isNftRegistered(_domainId, _nftAddr),
            "NFT already registered with this domain id"
        );

        domainRegisteredAllNfts[_domainId].push(_nftAddr);
        domainRegisteredNft[_domainId][_nftAddr] = true;

        emit NftAddressRegistered(_domainId, _nftAddr);
    }

    /**
     * @dev Register a NFT address for a domain in batch by calling registerNft().
     * @param _domainId The unique identifier of the domain with which the NFT is to be registered.
     * @param _nftAddresses Array of NFT collection addresses to be registered.
     */
    function batchRegisterNfts(
        uint256 _domainId,
        address[] calldata _nftAddresses
    ) external onlyRole(DOMAIN_OWNER_ROLE) onlyDomainOwner(_domainId) {
        for (uint256 j = 0; j < _nftAddresses.length; j++) {
            registerNft(_domainId, _nftAddresses[j]);
        }
    }

    /////////////////////////////////////////
    //                                     //
    //               UPDATES               //
    //                                     //
    /////////////////////////////////////////

    /**
     * @dev Emiting an update event for NFT collections in a domain.
     * @param _domainId The identifier of the domain.
     * @param _updateUrl The url points to the information of the updates.
     */
    function updateTokens(uint256 _domainId, string calldata _updateUrl)
        external
        onlyRole(ZEROX_NODE_ROLE)
    {
        emit TokensUpdate(_domainId, _updateUrl);
    }

    /**
     * @dev Emiting an update event for NFT collections in multiple domains.
     * @param _domainIds The identifiers of the domains.
     * @param _updateUrls The urls points to the information of the updates.
     */
    function updateTokens(
        uint256[] calldata _domainIds,
        string[] calldata _updateUrls
    ) external onlyRole(ZEROX_NODE_ROLE) {
        require(
            _domainIds.length == _updateUrls.length,
            "Array length mismatch"
        );
        for (uint256 i = 0; i < _domainIds.length; i++) {
            emit TokensUpdate(_domainIds[i], _updateUrls[i]);
        }
    }

    /////////////////////////////////////////
    //                                     //
    //                VIEWS                //
    //                                     //
    /////////////////////////////////////////

    /**
     * @dev Check if an address is a domain owner for a specific domain id.
     * @param _domainId The domain id to check against.
     * @param _addr Address to check.
     * @return True if the address is a domain owner for the specified domain id.
     */
    function isDomainOwner(uint256 _domainId, address _addr)
        public
        view
        returns (bool)
    {
        return domainOwner[_domainId] == _addr;
    }

    /**
     * @dev Retrieve the information of a domain.
     * @param _domainId The identifier of the domain.
     * @return The url points to the information of the domain.
     */
    function getDomainInfo(uint256 _domainId)
        external
        view
        returns (string memory)
    {
        require(
            bytes(domainInfo[_domainId]).length > 0,
            "The domain id is invalid or the domain info is not set."
        );
        return domainInfo[_domainId];
    }

    /**
     * @dev Check if a NFT is registered for a domain.
     * @param _domainId The unique identifier of the domain.
     * @param _addr The NFT collection address to be checked.
     * @return True if the NFT is registered for the domain.
     */
    function isNftRegistered(uint256 _domainId, address _addr)
        public
        view
        returns (bool)
    {
        return domainRegisteredNft[_domainId][_addr];
    }

    /**
     * @dev Retrieve the NFT collection address array for a domain.
     * @param _domainId The unique identifier of the domain.
     * @return The NFT collection address array.
     */
    function getNftAddresses(uint256 _domainId)
        external
        view
        returns (address[] memory)
    {
        return domainRegisteredAllNfts[_domainId];
    }
}