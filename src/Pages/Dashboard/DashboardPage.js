import React, {Component} from 'react';

import {Page, Container} from "../../Elements";
import {DashboardProjectsList} from "../../Components";

class DashboardPage extends Component {
    render() {
        return (
            <Page>
                <Container>
                    <DashboardProjectsList/>
                </Container>
            </Page>
        )
    }
}

export default DashboardPage;
