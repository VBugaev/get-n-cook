import React, { Component } from 'react'

import {
    Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal, ModalBody, ModalHeader
} from 'reactstrap';

import AddCartForm from './addCartForm';

import { Link } from 'react-router-dom';

import classnames from 'classnames';

import dayjs from 'dayjs';

import { values } from 'lodash';

import { normalizeArray } from '../../utils/arrayUtils.js';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            id: '',
            role: '',
            userData: {},
            carts: {},
            recipes: {},
            userRecipes: {},
            activeTab: '1',
            cartModal: false,
            cartDetailsModal: false,
            cartDetailsData: {}
        }
    }
    componentDidMount = () => {
        fetch(`http://127.0.0.1:5000/api/user/${localStorage.getItem('id')}`)
            .then(res => {
                return res.json();
            })
            .then(values => {
                this.setState({ userData: values });
                this.setState({
                    id: localStorage.getItem('id'),
                    login: localStorage.getItem('login'),
                    role: localStorage.getItem('role')
                });
            });
        fetch(`http://127.0.0.1:5000/api/user-recipes/${localStorage.getItem('id')}`)
            .then(res => {
                return res.json();
            })
            .then(values => {
                this.setState({ userRecipes: normalizeArray(values) || {} });
            });
        fetch(`http://127.0.0.1:5000/api/carts/${localStorage.getItem('id')}`)
            .then(res => {
                return res.json();
            })
            .then(values => {
                this.setState({ carts: normalizeArray(values) || {} });
            });

    }

    signOut = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    toggleCartModal = () => {
        fetch(`http://127.0.0.1:5000/api/recipes`)
            .then(res => {
                return res.json();
            })
            .then(values => {
                this.setState({ recipes: normalizeArray(values) || {} });
                this.setState({
                    cartModal: !this.state.cartModal
                });
            });
    }

    toggleCartDetailsModal = (id) => {
        if (typeof id === 'string') {
        fetch(`http://127.0.0.1:5000/api/cart/${id}`)
            .then(res => {
                return res.json();
            })
            .then(values => {
                this.setState({ cartDetailsData: normalizeArray(values) || {} });
                this.setState({
                    cartDetailsModal: !this.state.cartDetailsModal
                });
            });
        } else {
            this.setState({
                cartDetailsModal: !this.state.cartDetailsModal
            });
        }
    }

    onCartSubmit = (values) => {
        let recipes = values.recipes;
        recipes = recipes.map(recipe => ({
            ...recipe,
            portionsCount: values[recipe.value]
        }));
        values.recipes = recipes;
        fetch('http://127.0.0.1:5000/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('id'), ...values
            })
        }).then(r => r.json())
            .then(data => {
                let updObj = this.state.carts;
                updObj[data.Id] = data;
                this.setState({ carts: updObj });
                this.toggleCartModal();
            })
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        let { login, userData, id, userRecipes, carts, cartDetailsData, recipes } = this.state;
        userRecipes = values(userRecipes);
        cartDetailsData = values(cartDetailsData);
        carts = values(carts);
        recipes = values(recipes).map(recipe => ({
            value: recipe.Id,
            label: `${recipe.Title} от автора ${recipe.Name}`
        }));
        return (
            <Container fluid={true}>
                {userData.Id ? (<Row>
                    <Col sm="12"><h3 className="display-4 p-3">Страница пользователя {userData.Login}</h3></Col>
                    <Col sm="4"><img width="100%" src={`http://127.0.0.1:5000/api/image/${id}`} alt={login} /></Col>
                    <Col sm="8">
                        <div>Имя: {userData.Name}</div>
                        <div>Фамилия: {userData.Surname}</div>
                        <div>Email: {userData.Email}</div>
                        <div>Роль: {userData.RoleTitle}</div>
                        <div>О себе: {userData.AboutSection}</div>
                        <div>Аккаунт создан: {dayjs(userData.CreatedAt).format('DD MMM YYYY HH:mm:ss')}</div>
                        <div>Аккаунт был последний раз обновлен: {dayjs(userData.UpdatedAt).format('DD MMM YYYY HH:mm:ss')}</div>
                        <div style={{ marginBottom: '15px', marginTop: '15px' }}><Link to="/create-recipe"><Button>Создать рецепт</Button></Link></div>
                        <div style={{ marginBottom: '15px' }}><Button onClick={this.toggleCartModal}>Cоздать карточку</Button></div>
                        <div style={{ marginBottom: '15px' }}><Button onClick={this.signOut}>Выйти</Button></div>
                    </Col>
                    <Col style={{ marginTop: '15px' }} sm="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Рецепты пользователя
                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Карточки пользователя
                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane style={{ marginBottom: '15px', paddingTop: '15px' }} tabId="1">
                                {userRecipes.map(recipe => (
                                    <Col style={{ marginBottom: '15px' }} key={recipe.Id} sm="12">
                                        <Card body>
                                            <Row>
                                                <Col sm="4">
                                                    <img width="100%" src={`http://127.0.0.1:5000/api/image/${recipe.Id}`} alt={recipe.title} />
                                                </Col>
                                                <Col sm="8">
                                                    <CardTitle>{recipe.Title}</CardTitle>
                                                    <CardText>{`Сложность: ${recipe.Difficulty}; Время приготовления: ${recipe.PreparationTime} минут; Рейтинг: ${recipe.RecipeRate ? recipe.RecipeRate : 'Не оценено'}`}</CardText>
                                                    <Link to={`/recipe/${recipe.Id}`}><Button>Подробнее</Button></Link>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>))}
                            </TabPane>
                            <TabPane style={{ marginBottom: '15px', paddingTop: '15px' }} tabId="2">
                                {carts.map(cart => (
                                    <Col style={{ marginBottom: '15px' }} key={cart.Id} sm="12">
                                        <Card body>
                                            <Row>
                                                <Col sm="12">
                                                    <CardTitle>{cart.Title}</CardTitle>
                                                    <CardText>{`Количество добавленных рецептов: ${+cart.RecipesCount}`}</CardText>
                                                    <Button onClick={() => { this.toggleCartDetailsModal(cart.Id) }}>Подробнее</Button>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>))}

                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>) : <div>Загрузка...</div>}

                <Modal isOpen={this.state.cartModal} toggle={this.toggleCartModal}>
                    <ModalHeader toggle={this.toggleCartModal}>Создать карточку</ModalHeader>
                    <ModalBody>
                        <AddCartForm recipes={recipes} onSubmit={this.onCartSubmit} />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.cartDetailsModal} toggle={this.toggleCartDetailsModal}>
                    <ModalHeader toggle={this.toggleCartDetailsModal}>Рецепты карточки</ModalHeader>
                    <ModalBody>
                        {cartDetailsData.map(data => (
                            <div key={data.Id}>{`Название: ${data.Title}, Количество порций: ${data.PortionsCount}`}</div>
                        ))}
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default ProfilePage;