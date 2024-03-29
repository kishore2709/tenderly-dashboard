import React, {Component} from 'react';

import {Form, Input, Button} from "../../Elements";
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import {formatProjectSlug} from "../../Utils/Formatters";

import './CreateProjectForm.css';

class CreateProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creating: false,
            error: null,
        };

        initializeForm(this, {
            projectName: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = async () => {
        const {onSubmit} = this.props;
        const {formData} = this.state;

        this.setState({
            creating: true,
        });

        const response = await onSubmit(formData);

        if (!response.success) {
            this.setState({
                creating: false,
                error: response.data,
            });
        }
    };

    render() {
        const {formData: {projectName}, creating} = this.state;

        return (
            <Form onSubmit={this.handleFormSubmit} className="CreateProjectForm">
                <Input value={projectName} label="Project name" icon="single-project" field={"projectName"} onChange={this.handleFormUpdate} autoComplete="off" autoFocus/>
                <div className="SlugPreviewWrapper">
                    <div className="UrlLabel">Project URL Preview</div>
                    <div className="UrlPreview">https://dashboard.tenderly.dev/project/<span className="ProjectSlug">{formatProjectSlug(projectName)}</span></div>
                    <div className="UrlNote">* Slugs can not be changed later</div>
                </div>
                <div className="SubmitButtonWrapper">
                    <Button type="submit" disabled={!projectName || creating}>
                        <span>Create Project</span>
                    </Button>
                </div>
            </Form>
        );
    }
}

CreateProjectForm.defaultProps = {
    onSubmit: () => {},
};

export default CreateProjectForm;
