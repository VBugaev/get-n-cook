import React, { Component } from 'react'

import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import UsersTab from './components/Tabs/usersTab';
import RolesTab from './components/Tabs/rolesTab';
import CategoriesTab from './components/Tabs/categoriesTab';
import IngredientsTab from './components/Tabs/ingredientsTab';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
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
<<<<<<< HEAD
    fetch('/api/roles')
=======
    fetch('http://127.0.0.1:5000/api/roles')
>>>>>>> parent of a533285... delete FE at all
      .then(res => {
        return res.json();
      })
      .then(values => {
        this.setState({ roles: values });
      });
  }


  render() {
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
<<<<<<< HEAD
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '5' })}
                    onClick={() => { this.toggle('5'); }}
                  >
                    Логи
                </NavLink>
                </NavItem>
=======
>>>>>>> parent of a533285... delete FE at all
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <UsersTab />
                </TabPane>
                <TabPane tabId="2">
                  <CategoriesTab />
                </TabPane>
                <TabPane tabId="3">
                  <RolesTab />
                </TabPane>
                <TabPane tabId="4">
                  <IngredientsTab />
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