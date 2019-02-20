import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from 'classnames';

import MixPanel from "../../Utils/MixPanel";
import {OSTypes} from "../../Common/constants";
import * as projectActions from "../../Core/Project/Project.actions";
import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Dialog, DialogHeader, DialogBody, Button, Icon} from "../../Elements";

import './ProjectSetupGuide.css';

class ProjectSetupGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: props.open,
            currentStep: 1,
            verifying: false,
            verifyAttempted: false,
            finishedSetup: false,
        }
    }

    componentDidMount() {
        const {actions, project} = this.props;
        const {dialogOpen} = this.state;

        if (dialogOpen) {
            MixPanel.track('Viewed Initial Project Setup Guide');

            if (!project.setupViewed) {
                actions.setProjectSetupViewed(project);
            }
        }
    }

    handleDialogClose = () => {
        MixPanel.track(`Project Setup Guide - Close Dialog`);

        this.setState({
            dialogOpen: false,
        });
    };

    openDialog = () => {
        const {actions, project} = this.props;

        if (!project.setupViewed) {
            actions.setProjectSetupViewed(project);
        }

        MixPanel.track('Viewed Project Setup Guide via Button');

        this.setState({
            dialogOpen: true,
            currentStep: 1,
            verifying: false,
            verifyAttempted: false,
            finishedSetup: false,
        });
    };

    nextStep = () => {
        MixPanel.track(`Project Setup Guide - Next Step: ${this.state.currentStep + 1}`);

        this.setState({
            currentStep: this.state.currentStep + 1,
        });
    };

    verifyProjectPush = async () => {
        const {project, actions, eventActions, contractActions} = this.props;

        this.setState({
            verifying: true,
        });

        MixPanel.track('Project Setup Guide - Verify Setup');

        const fetchedProject = await actions.fetchProject(project.id);

        const projectSetup = !!fetchedProject.lastPushAt;

        if (projectSetup) {
            MixPanel.track('Project Setup Guide - Verification success');

            eventActions.fetchEventsForProject(project.id, 1);
            contractActions.fetchContractsForProject(project.id);
        } else {
            MixPanel.track('Project Setup Guide - Verification failed');
        }

        setTimeout(() => {
            this.setState({
                verifying: false,
                verifyAttempted: true,
                finishedSetup: projectSetup,
            });

            if (projectSetup) {
                setTimeout(() => {
                    this.handleDialogClose();
                }, 3000);
            }
        }, 1000);
    };

    render() {
        const {dialogOpen, currentStep, verifying, finishedSetup, verifyAttempted} = this.state;
        const {label, color, size, outline, project, os} = this.props;

        return (
            <Fragment>
                <Button outline={outline} onClick={this.openDialog} size={size} color={color}>
                    <span>{label}</span>
                </Button>
                <Dialog open={dialogOpen} onClose={this.handleDialogClose} className="SetupProjectDialog" overlayClose={false}>
                    <DialogHeader>
                        {currentStep === 1 && <Fragment>
                            <Icon icon="archive"/>
                            <h3>Let's get the right tools</h3>
                        </Fragment>}
                        {currentStep === 2 && <Fragment>
                            <Icon icon="settings"/>
                            <h3>Now to setup the project</h3>
                        </Fragment>}
                        {currentStep === 3 && <Fragment>
                            <Icon icon="upload-cloud"/>
                            <h3>Start monitoring</h3>
                        </Fragment>}
                    </DialogHeader>
                    <DialogBody>
                        <div className="DialogStepsWrapper">
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": currentStep > 1,
                                    "Active": currentStep === 1,
                                }
                            )}>
                                <div className="StepContent">
                                    {os !== OSTypes.WINDOWS && <p>To get started, we need to first get the Tenderly CLI tool. You can install it via the following command from your terminal.</p>}
                                    {os === OSTypes.WINDOWS && <Fragment>
                                        <p>To get started, we need to first get the Tenderly CLI tool.</p>
                                        <p>You can install it by going to the the <a target="_blank" rel="noopener noreferrer" href={"https://github.com/Tenderly/tenderly-cli/releases"}>GitHub Releases</a> page and downloading the latest binary for Windows and putting in the inside your $PATH.</p>
                                    </Fragment>}
                                    {os === OSTypes.MAC && <code>brew tap tenderly/tenderly && brew install tenderly</code>}
                                    {(os === OSTypes.UNIX || os === OSTypes.LINUX) && <code>curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sh</code>}
                                    <p>After installing the CLI you need to authenticate via your account email and password.</p>
                                    <code>tenderly login</code>
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button onClick={this.nextStep} color="secondary">
                                        <span>Next step</span>
                                    </Button>
                                </div>
                            </div>
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": currentStep > 2,
                                    "Active": currentStep === 2,
                                    "Next": currentStep < 2,
                                }
                            )}>
                                <div className="StepContent">
                                    <p>Go to the root of your smart contract project. Tenderly uses the Truffle framework to track where your contracts have been deployed.</p>
                                    <code>cd {project.id}</code>
                                    <p>Use the init command to link your local project with the dashboard.</p>
                                    <code>tenderly init</code>
                                    <p>You can read more about <a target="_blank" rel="noopener noreferrer" href="https://docs.tenderly.app/#/how-tenderly-integrates">how Tenderly integrates with Truffle</a> in this link.</p>
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button onClick={this.nextStep} color="secondary">
                                        <span>Next</span>
                                    </Button>
                                </div>
                            </div>
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Active": currentStep === 3,
                                    "Next": currentStep < 3,
                                }
                            )}>
                                <div className="StepContent">
                                    <p>In order to track your contracts and map failed transactions to a specific line of code, we need you to provide us with the contract source code and where the contracts are deployed for the specified network.</p>
                                    <code>tenderly push</code>
                                    <p>You can read more about pushing contracts in the <a rel="noopener noreferrer" href="https://docs.tenderly.app/#/commands/push" target="_blank">push command</a> documentation page.</p>
                                    {!verifying && verifyAttempted && !finishedSetup && <div className="ActionMessage Warning">
                                        <span>Whooops! Seems that your contracts have not been uploaded yet.</span>
                                    </div>}
                                    {finishedSetup && <div className="ActionMessage Success">
                                        Success. Your contracts have been uploaded and are being tracked!
                                    </div>}
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Do this later</span>
                                    </Button>
                                    <Button onClick={this.verifyProjectPush} color="secondary" disabled={verifying || finishedSetup}>
                                        {verifying && <Icon icon="circle" className="VerifyIcon"/>}
                                        {verifying && <span>Verifying</span>}
                                        {!verifying && <span>Finish setup</span>}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="DialogStepProgress">
                            <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 1,})}/>
                            <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 2,})}/>
                            <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 3,})}/>
                        </div>
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

ProjectSetupGuide.defaultProps = {
    open: false,
    label: 'Setup Project',
    size: 'default',
    color: 'primary',
    outline: true,
};

const mapStateToProps = state => {
    return {
        os: state.app.os,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
        eventActions: bindActionCreators(eventActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectSetupGuide);
