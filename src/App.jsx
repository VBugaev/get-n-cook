import React, { Component } from 'react';
import dayjs from 'dayjs';
import './fontAwesomeLibrary.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      users: [],
      roles: []
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => {
        return res.json();
      })
      .then(values => {
        this.setState({ users: values });
      });
    fetch('/api/roles')
      .then(res => {
        return res.json();
      })
      .then(values => {
        this.setState({ roles: values });
      });
  }

  render() {
    const { users, roles } = this.state;
    return (
      <div className="App">
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Users
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Categories
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Roles
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => { this.toggle('4'); }}
                  >
                    Recipes
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '5' })}
                    onClick={() => { this.toggle('5'); }}
                  >
                    Ingredients
            </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
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
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="6">

                    </Col>
                    <Col sm="6">

                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <h3 className="display-4 p-3">Roles management</h3>
                    </Col>
                    <Col sm="6">
                      <Table>
                        <tbody>
                          <tr>
                            <th>Title</th>
                          </tr>
                          {roles.map(role => {
                            return (
                              <tr key={role.Id}>
                                <td>{role.Title}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Col>
                    <Col sm="6">

                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
