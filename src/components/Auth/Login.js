import React from "react";
import firebase from "../../firebase";
import '../App.css';


import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false,
    };


    displayErrors = errors =>
        errors.map((error, i) => <Message error key={i}>{error.message}</Message>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true })
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((signedInUser) => {
                    console.log(signedInUser)
                })
                .catch((err) => {
                    console.error(err)
                    this.setState({ loading: false, errors: this.state.errors.concat(err) })
                })
        }
    };

    isFormValid = ({ email, password }) => email && password


    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    render() {
        const {
            email,
            password,
            errors,
            loading
        } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
            Login to Dev Community
          </Header>
                    {errors.length > 0 && (
                        this.displayErrors(errors)
                    )}
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>

                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                className={this.handleInputError(errors, 'email')}
                                onChange={this.handleChange}
                                value={email}
                                type="email"
                            />

                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, 'password')}
                                value={password}
                                type="password"
                            />

                            <Button disabled={loading === true} className={loading ? 'loading' : ''} color="violet" fluid size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>

                    <Message>
                        Don't have an account ? <Link to="/register">Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;

