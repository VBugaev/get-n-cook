import React, { Component } from 'react'

import {
    Container, Row, Col, ListGroup, ListGroupItem, Card, CardTitle, Button,
    Alert,
    CardText, Modal, ModalBody, ModalHeader
} from 'reactstrap';

import { getCategoryData, fetchRecipe } from './modules';
import { Link } from 'react-router-dom';

import LoginForm from './components/Forms/loginForm';
import RegisterForm from './components/Forms/registerForm';

import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import dayjs from 'dayjs';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            loginModal: false,
            loginError: '',
            registerError: '',
            registerModal: false
        };
    }

    registerSubmit = values => {
        let form = new FormData();
        form.append('login', values.login);
        form.append('email', values.email);
        form.append('password', values.password);
        form.append('name', values.name);
        form.append('surname', values.surname);
        form.append('about', values.about);
        form.append('avatar', values.avatar);

        fetch('http://127.0.0.1:5000/api/register', {
            method: 'POST',
            body: form
        }).then(r => r.json())
            .then(data => {
                if (data.id) {
                    localStorage.clear();
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('login', data.login || ' ');
                    localStorage.setItem('email', data.email || ' ');
                    localStorage.setItem('role', data.role);
                    this.setState({ registerError: '' });
                    this.setState({
                        id: localStorage.getItem('id'),
                        login: localStorage.getItem('login'),
                        role: localStorage.getItem('role')
                    });
                    this.toggleRegisterModal();
                } else {
                    this.setState({ registerError: data.error });
                }
            })
    }

    loginSubmit = values => {
        fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(r => r.json())
            .then(data => {
                if (data.id) {
                    localStorage.clear();
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('login', data.login || ' ');
                    localStorage.setItem('email', data.email || ' ');
                    localStorage.setItem('role', data.role);
                    this.setState({ loginError: '' });
                    this.setState({
                        id: localStorage.getItem('id'),
                        login: localStorage.getItem('login'),
                        role: localStorage.getItem('role')
                    });
                    this.toggleLoginModal();
                } else {
                    this.setState({ loginError: data.error });
                }
            })
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/api/recipes`)
            .then(res => {
                return res.json();
            })
            .then(values => {
                this.setState({ recipes: values });
                this.setState({
                    id: localStorage.getItem('id'),
                    login: localStorage.getItem('login'),
                    role: localStorage.getItem('role')
                });
            });
    }



    toggleLoginModal = () => {
        this.setState({ loginError: '' });
        this.setState({
            loginModal: !this.state.loginModal
        });
    }

    toggleRegisterModal = () => {
        this.setState({ registerError: '' });
        this.setState({
            registerModal: !this.state.registerModal
        });
    }

    signOut = () => {
        localStorage.clear();

        this.setState({
            id: localStorage.getItem('id'),
            login: localStorage.getItem('login'),
            role: localStorage.getItem('role')
        });
    }

    render() {
        const { recipes, loginError, registerError, id, login, role } = this.state;
        const authed = !!id;
        const isAdmin = role === 'Admin';
        return (
            <Container style={{ marginTop: '50px' }} fluid={true}>{
                recipes.length ? (<Row>
                    <Col sm="3">
                        { login && <h5>Привет, {login}!</h5>}
                        <ListGroup>
                            { !authed && <ListGroupItem onClick={this.toggleLoginModal} tag="button" action>Логин</ListGroupItem>}
                            { !authed && <ListGroupItem onClick={this.toggleRegisterModal} tag="button" action>Зарегистрироваться</ListGroupItem>}
                            { authed && <Link to="/create-recipe"><ListGroupItem tag="button" action>Создать рецепт</ListGroupItem></Link>}
                            { authed && <Link to="/profile"><ListGroupItem tag="button" action>Профиль</ListGroupItem></Link>}
                            { authed && isAdmin && <Link to="/admin-management"><ListGroupItem tag="button" action>Страница админа</ListGroupItem></Link>}
                            { authed && <ListGroupItem onClick={this.signOut} tag="button" action>Выйти</ListGroupItem>}
                        </ListGroup>
                    </Col>
                    <Col sm="9">
                        {recipes.map(recipe => (
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
                    </Col>
                </Row>) : <span>Загрузка...</span>}
                <Modal isOpen={this.state.loginModal} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Войти на сайт</ModalHeader>
                    {
                        loginError && <Alert color="danger">{loginError}</Alert>
                    }
                    <ModalBody>
                        <LoginForm onSubmit={this.loginSubmit} />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.registerModal} toggle={this.toggleRegisterModal}>
                    <ModalHeader toggle={this.toggleRegisterModal}>Зарегистрироваться</ModalHeader>
                    {
                        registerError && <Alert color="danger">{registerError}</Alert>
                    }
                    <ModalBody>
                        <RegisterForm onSubmit={this.registerSubmit} />
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default MainPage;