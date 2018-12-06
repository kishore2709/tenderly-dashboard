import React, {Component} from 'react';

import MixPanel from "../../Utils/MixPanel";

import {Button, Icon} from "../../Elements";

class ProjectEventActions extends Component {
    handlePreviousEventsPage = () => {
        const {page} = this.props;

        MixPanel.track('Project Events - Previous Page', {
            currentPage: page,
        });
    };

    handleNextEventsPage = () => {
        const {page} = this.props;

        MixPanel.track('Project Events - Next Page', {
            currentPage: page,
        });
    };

    handleRefreshPage = () => {
        const {onRefresh, page} = this.props;

        MixPanel.track('Project Events - Refresh Page', {
            currentPage: page,
        });

        onRefresh();
    };

    render() {
        const {projectId, page} = this.props;

        return (
            <div className="ProjectEventActions">
                <Button outline size="small" onClick={this.handleRefreshPage}>
                    <Icon icon="refresh-cw"/>
                </Button>
                <div className="PaginationControls">
                    <Button outline size="small" to={{
                        pathname: `/project/${projectId}/events`,
                        search: `?page=${page - 1}`
                    }} onClick={this.handlePreviousEventsPage}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <Button outline size="small" to={{
                        pathname: `/project/${projectId}/events`,
                        search: `?page=${page + 1}`
                    }} onClick={this.handleNextEventsPage}>
                        <Icon icon="arrow-right"/>
                    </Button>
                </div>
            </div>
        );
    }
}

ProjectEventActions.defaultProps = {
    onRefresh: () => {},
};

export default ProjectEventActions;
