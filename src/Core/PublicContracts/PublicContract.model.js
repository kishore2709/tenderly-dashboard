import {NetworkApiToAppTypeMap} from "../../Common/constants";

class PublicContract {
    constructor(data) {
        /** @type string */
        this.id = data.ID;

        /** @type string */
        this.name = data.contract_name;

        /** @type string */
        this.address = data.deployment_information.address;

        /** @type string */
        this.network = NetworkApiToAppTypeMap[data.deployment_information.network_id];

        /** @type Date */
        this.lastEventAt = data.last_event_occurred_at;

        /** @type number */
        this.eventCount = data.number_of_exceptions;

        if (data.source) {
            /** @type string */
            this.source = data.source;

            /** @type string */
            this.solidity = PublicContract.getSolidityVersion(data.source);
        }
    }

    /**
     * @returns {PublicContract}
     */
    update() {
        return this;
    }

    /**
     * @param {string} source
     * @returns {string|null}
     */
    static getSolidityVersion(source) {
        if (!source) {
            return null;
        }

        const versionRegex = /solidity \^(.*);/g;

        const matches = versionRegex.exec(source);

        return matches[1];
    }

    /**
     * @param {Object} responseData
     * @returns {PublicContract}
     */
    static responseTransformer(responseData) {
        return new PublicContract(responseData);
    }
}

export default PublicContract;
