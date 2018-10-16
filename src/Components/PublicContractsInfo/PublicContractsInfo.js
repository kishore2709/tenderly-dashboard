import React from 'react';

import EtherscanLink from "../EtherscanLink/EtherscanLink";

import './PublicContractsInfo.css';

const PublicContractsInfo = ({network}) => {
    console.log(network);

    return (
        <div className="PublicContractsInfo">
            <h2>Public Contracts</h2>
            <p><EtherscanLink network={network} path={"contractsVerified"}>verified contracts</EtherscanLink></p>
        </div>
    )
};

export default PublicContractsInfo;
