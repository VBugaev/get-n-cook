import React, { Component } from 'react'

import { Table, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import classnames from 'classnames';

import UsersTab from './components/Tabs/usersTab';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
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
    fetch('/api/roles')
      .then(res => {
        return res.json();
      })
      .then(values => {
        this.setState({ roles: values });
      });
  }


  render() {
    const { roles } = this.state;
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
                    Пользователи
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Категории
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Роли
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => { this.toggle('4'); }}
                  >
                    Ингредиенты
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '5' })}
                    onClick={() => { this.toggle('5'); }}
                  >
                    Логи
                </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <UsersTab />
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
                      <Form>
                        <FormGroup>
                          <h5 className="display-5">Create Role</h5>
                          <Input name="title" placeholder="type role's title" />
                        </FormGroup>
                        <Button block>Create role</Button>
                      </Form>
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

export default AdminPage;