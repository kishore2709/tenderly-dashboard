export const FETCH_PUBLIC_CONTRACTS_ACTION = 'FETCH_PUBLIC_CONTRACTS';
export const FETCH_PUBLIC_CONTRACT_ACTION = 'FETCH_PUBLIC_CONTRACT';

/**
 * @param {string} network
 * @param {number} page
 */
export const fetchPublicContracts = (network, page) => {
    return dispatch => {
        // @TODO Replace with API call...
        const contracts = [
            {
                id: 'k1',
                network: 'kovan_testnet',
                address: '0x0a97094c19295E320D5121d72139A150021a2702',
                name: 'CryptoMinerToken',
                compilerVersion: 'v0.4.25',
            },
            {
                id: 'k2',
                network: 'kovan_testnet',
                address: '0x296eaae0c8d9216a46bf6520d37b96058b14d03d',
                name: 'EnaToken',
                compilerVersion: 'v0.4.25',
            },
            {
                id: 'k3',
                network: 'kovan_testnet',
                address: '0x7026c4a7cf1fffa16d69efe5239192269203673a',
                name: 'ClubTransferContract',
                compilerVersion: 'v0.4.24',
            },
        ];

        dispatch({
            type: FETCH_PUBLIC_CONTRACTS_ACTION,
            contracts,
            page,
            network,
        });
    }
};

/**
 *
 * @param {number} id
 */
export const fetchPublicContract = (id) => {
    return dispatch => {
        // @TODO Replace with API call...
        const contract = {
            id: id,
            network: 'kovan_testnet',
            address: '0x0a97094c19295E320D5121d72139A150021a2702',
            name: 'CryptoMinerToken',
            compilerVersion: 'v0.4.25',
            events: [
                {
                    id: 'e1',
                    name: 'Dummy error number 1',
                },
                {
                    id: 'e2',
                    name: 'Dummy error number 2',
                },
                {
                    id: 'e3',
                    name: 'Dummy error number 3',
                },
            ]
        };

        dispatch({
            type: FETCH_PUBLIC_CONTRACT_ACTION,
            contract,
            events: contract.events,
        });
    }
};
