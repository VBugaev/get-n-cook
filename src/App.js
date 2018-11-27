import React, { Component } from 'react';
import dayjs from 'dayjs';
import './fontAwesomeLibrary.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Table } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount(prevProps, prevState) {
    fetch('/api/users')
    .then(res => {
      return res.json();
    })
    .then(values => {
      this.setState({ users: values });
    });
  }
  
  render() {
    const { users } = this.state;
    return (
      <div className="App">
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
        {users.map(user => { return (
          <tr key={user.Id}>
            <td title={user.RoleTitle}>{user.RoleTitle && <FontAwesomeIcon icon={user.RoleTitle === 'Admin' ? 'user-cog' : 'user'} />}</td>
            <td>{user.Login}</td>
            <td>{user.Name}</td>
            <td>{user.Surname}</td>
            <td>{user.RoleTitle}</td>
            <td>{user.UpdatedAt && dayjs(user.UpdatedAt).format('DD MMM YYYY HH:mm:ss')}</td>
          </tr>
        ); })}
        </tbody>
      </Table>
      </div>
    );
  }
}

export default App;
