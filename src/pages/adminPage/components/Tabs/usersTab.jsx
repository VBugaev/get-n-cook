import React, { Component } from 'react'
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { getUsers, getRoles, createUserByAdmin, openUpdateUserModal, toggleUsersUpdateModal, updateUserByAdmin } from '../../actions.js';
import { getUsersData, getUserFormError, getIsUserModalOpened } from '../../selectors.js';

import { Table, Row, Col, Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import UsersAdminForm from '../Forms/userAdminForm';
import UsersAdminUpdateForm from '../Forms/userAdminUpdateForm';

const mapStateToProps = (state) => ({
    users: getUsersData(state),
    error: getUserFormError(state),
    isModalOpened: getIsUserModalOpened(state)
});

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    getRoles: () => dispatch(getRoles()),
    toggleModal: () => dispatch(toggleUsersUpdateModal()),
    openUpdModal: (id) => dispatch(openUpdateUserModal(id)),
    updateUser: (values, id) => dispatch(updateUserByAdmin(values, id)),
    createUser: values => dispatch(createUserByAdmin(values))
})

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updId: ''
        };
    }
    componentDidMount() {
        this.props.getUsers();
    }


    openUpdModal = (id) => {
        this.setState({ updId: id });
        this.props.openUpdModal(id);
    }

    toggleUpdModal = () => {
        this.setState({ updId: '' });
        this.props.toggleModal();
    }

    onUpdateUserSubmit = values => {
        this.props.updateUser(values, this.state.updId);
    }

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
                                        <td><Button onClick={() => this.openUpdModal(user.Id)}><FontAwesomeIcon icon="edit" /></Button></td>
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
            <Modal isOpen={this.props.isModalOpened} toggle={this.toggleUpdModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleUpdModal}>Обновить информацию о пользователе</ModalHeader>
                <ModalBody>
                    <UsersAdminUpdateForm onSubmit={this.onUpdateUserSubmit} />
                </ModalBody>
            </Modal>
        </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
