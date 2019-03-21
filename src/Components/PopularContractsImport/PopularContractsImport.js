import React, {Component} from 'react';
import Blockies from 'react-blockies';
import {Redirect} from "react-router-dom";

import {EtherscanLinkTypes, NetworkTypes} from "../../Common/constants";
import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Icon, Card} from "../../Elements";
import EtherscanLink from "../EtherscanLink/EtherscanLink";

import './PopularContractsImport.css';

const PopularContractSlugs = {
    MAKER_DAU: 'maker_dao',
    CRYPTO_KITTIES: 'crypto_kitties',
};

const PopularContracts = {
    [PopularContractSlugs.MAKER_DAU]: {
        slug: PopularContractSlugs.MAKER_DAU,
        address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        name: 'Maker DAO',
        network: NetworkTypes.MAIN,
    },
    [PopularContractSlugs.CRYPTO_KITTIES]: {
        slug: PopularContractSlugs.CRYPTO_KITTIES,
        address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
        name: 'Crypto Kitties',
        network: NetworkTypes.MAIN,
    },
};

const PopularContract = ({slug, onClick, contractBeingImported = {}}) => {
    const contract = PopularContracts[slug];

    if (!contract) {
        return null;
    }

    console.log(contractBeingImported);

    return (
        <Card className="PopularContract" onClick={() => onClick(contract)}>
            <Blockies
                seed={contract.address}
                size={8}
                scale={5}
                className="ContractBlockie"
            />
            <div className="ContractInfo">
                <h5 className="ContractName">{contract.name}</h5>
                <div className="ContractAddress">
                    <EtherscanLink onClick={event => event.stopPropagation()} network={contract.network} type={EtherscanLinkTypes.ADDRESS} value={contract.address}>
                        {generateShortAddress(contract.address, 8, 6)}
                    </EtherscanLink>
                </div>
            </div>
            <div className="ContractActionWrapper">
                <div className="ContractAction">
                    <Icon icon="download" className="ActionIcon"/>
                    <span>Import Contract</span>
                </div>
            </div>
        </Card>
    )
};

class PopularContractsImport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            importingContract: false,
            contract: null,
            createdProject: null,
        };
    }

    handleContractClick = (contract) => {
        console.log('asd', contract);
        this.setState({
            importingContract: true,
            contract,
        });
    };

    render() {
        const {importingContract, createdProject, contract} = this.state;

        if (createdProject) {
            return <Redirect to={`/project/${createdProject.id}`}/>
        }

        return (
            <div className="PopularContractsImport">
                <h2>Popular Contracts</h2>
                {Object.values(PopularContractSlugs).map(slug =>
                    <PopularContract key={slug}
                                     slug={slug}
                                     onClick={this.handleContractClick}
                                     contractBeingImported={contract}
                                     disabled={importingContract}/>
                )}
            </div>
        );
    }
}

export default PopularContractsImport;
