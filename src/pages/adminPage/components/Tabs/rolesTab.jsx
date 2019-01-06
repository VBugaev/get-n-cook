import React, { Component } from 'react'

import { connect } from 'react-redux';
import { getRoles } from '../../actions.js';
import { getRolesData } from '../../selectors.js';

import { Table, Row, Col } from 'reactstrap';

const mapStateToProps = (state) => ({
    roles: getRolesData(state)
});

const mapDispatchToProps = dispatch => ({
    getRoles: () => dispatch(getRoles())
})

class RolesTab extends Component {
    componentDidMount() {
        this.props.getRoles();
    }

    render() {
        const { roles } = this.props;
        return (<>
            <Row>
                <Col sm="12">
                    <h3 className="display-4 p-3">Данные о ролях</h3>
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
            </Row>
        </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesTab);