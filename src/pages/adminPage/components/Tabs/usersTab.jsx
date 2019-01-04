import React, { Component } from 'react'
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { normalizeArray } from '../../../../utils/arrayUtils.js';
import { Table, TabPane, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';

import FileUpload from '../../../../components/FormComponents';

import UsersAdminForm from '../Forms/userAdminForm';

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            normalizedUsers: [],
            roles: []
        };
    }

    componentDidMount() {
        fetch('/api/users')
            .then(res => {
                return res.json();
            })
            .then(values => {
                let normalizedUsers = normalizeArray(values);
                console.log(normalizedUsers);
                this.setState({ users: values });
                this.setState({ normalizedUsers });
            });
    }

    onSubmit = values => {
        console.log(values);
        console.log(values.userAvatar);
        let form = new FormData();
        form.append('image', values.userAvatar);
        fetch('api/images', {
            method: 'POST',
            body: form
        }).then(r => r.json())
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { users } = this.state;
        const { tabId } = this.props;
        return (
            <TabPane tabId={tabId}>
                <Row>
                    <Col sm="12">
                        <h3 className="display-4 p-3">Users management</h3>
                    </Col>
                    <Col sm="6">
                        <Table>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Login</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Role</th>
                                    <th>Last update</th>
                                </tr>
                                {users.map(user => {
                                    return (
                                        <tr key={user.Id}>
                                            <td title={user.RoleTitle}>{user.RoleTitle && <FontAwesomeIcon icon={user.RoleTitle === 'Admin' ? 'user-cog' : 'user'} />}</td>
                                            <td>{user.Login}</td>
                                            <td>{user.Name}</td>
                                            <td>{user.Surname}</td>
                                            <td>{user.RoleTitle}</td>
                                            <td>{user.UpdatedAt && dayjs(user.UpdatedAt).format('DD MMM YYYY HH:mm:ss')}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm="6">
                        <FileUpload onSubmit={this.onSubmit} />
                    </Col>
                </Row>
            </TabPane>
        );
    }
}

export default UsersTab;
