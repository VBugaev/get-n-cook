import React, { Component } from 'react'
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { getUsers, getRoles, createUserByAdmin } from '../../actions.js';
import { getUsersData, getUserFormError } from '../../selectors.js';

import { Table, Row, Col, Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import UsersAdminForm from '../Forms/userAdminForm';

import './_usersTab.scss';

const mapStateToProps = (state) => ({
    users: getUsersData(state),
    error: getUserFormError(state)
});

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    getRoles: () => dispatch(getRoles()),
    createUser: values => {
        return dispatch(createUserByAdmin(values));
    }
})

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getRoles();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    // onSubmit = values => {
    //     console.log(values);
    //     console.log(values.userAvatar);
    //     let form = new FormData();
    //     form.append('image', values.userAvatar);
    //     fetch('api/images', {
    //         method: 'POST',
    //         body: form
    //     }).then(r => r.json())
    //         .then(data => {
    //             if (data.error) {
    //                 this.setState({ error: data.error });
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    render() {
        const { users, error } = this.props;
        return (<>
            <Row>
                <Col sm="12">
                    <h3 className="display-4 p-3">Управление пользователями</h3>
                </Col>
                <Col sm="8">
                    <Table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Логин</th>
                                <th>Email</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Роль</th>
                                <th>Последнее обновление</th>
                                <th></th>
                            </tr>
                            {users.map(user => {
                                return (
                                    <tr key={user.Id}>
                                        <td title={user.RoleTitle}>{user.RoleTitle && <FontAwesomeIcon icon={user.RoleTitle === 'Admin' ? 'user-cog' : 'user'} />}</td>
                                        <td>{user.Login}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.Name}</td>
                                        <td>{user.Surname}</td>
                                        <td>{user.RoleTitle}</td>
                                        <td>{user.UpdatedAt && dayjs(user.UpdatedAt).format('DD MMM YYYY HH:mm:ss')}</td>
                                        <td><Button onClick={this.toggle}><FontAwesomeIcon icon="cog" /></Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col sm="4">
                    {
                        error && <Alert color="danger">{error}</Alert>
                    }
                    <UsersAdminForm onSubmit={this.props.createUser} />
                </Col>
            </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Обновить информацию о пользователе</ModalHeader>
                <ModalBody>
                    <UsersAdminForm onSubmit={() => {}} />
                </ModalBody>
            </Modal>
        </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
