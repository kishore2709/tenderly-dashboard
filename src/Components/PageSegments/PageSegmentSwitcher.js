import React from 'react';
import classNames from "classnames";

import {Icon} from "../../Elements";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

import './PageSegmentSwitcher.css';

const PageSegmentSwitcherOption = ({option, onSelect, active}) => {
    return (
        <div className={classNames(
            "SwitchOption",
            {
                "Active": active,
            },
        )} onClick={() => {onSelect(option.value)}}>
            <div className="SwitchLabel">{option.label}</div>
            <div className="SwitchIconWrapper">
                <Icon icon="chevron-right" className="SwitchIcon"/>
            </div>
        </div>
    );
};

const PageSegmentSwitcher = ({options, onSelect, current}) => {
    return (
        <div className="PageSegmentSwitcher">
            {options.map(option => option.featureFlag ? <FeatureFlag flag={option.featureFlag} key={option.value}>
                <PageSegmentSwitcherOption option={option} onSelect={onSelect} active={option.value === current}/>
            </FeatureFlag> : <PageSegmentSwitcherOption option={option} onSelect={onSelect} active={option.value === current} key={option.value}/>)}
        </div>
    )
};

PageSegmentSwitcher.defaultProps = {
    onSelect: () => {},
};

export default PageSegmentSwitcher;
