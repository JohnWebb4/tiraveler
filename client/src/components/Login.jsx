import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      submittedPassword: '',
      submittedEmail: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
      submittedPassword: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
      submittedEmail: e.target.value,
    });
  }

  handleSubmit() {
    console.log(this.state.submittedEmail, this.state.submittedPassword);
    let { submittedPassword, submittedEmail } = this.state;
    this.setState({
      password: '',
      email: '',
    });
    axios.post('/user/login', {
      email: submittedEmail,
      password: submittedPassword
    })
    .then((signInSuccess) => {
      console.log(signInSuccess);
    })
    .catch((err) => console.error(err) )
  }

  render() {
    const { password, email } = this.state;
    return (
      <div>
        <div className="ui center aligned basic segment">
          <Form onSubmit={this.handleSubmit} style={{ display: 'inline-block' }}>
            <Form.Group>
              <Form.Input placeholder="Email" name="email" value={email} onChange={this.handleEmailChange} />
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handlePasswordChange}
              />
            </Form.Group>
            <Form.Button content="Submit" />
          </Form>
          <div className="ui horizontal divider">
            Or
          </div>
          <a href="/login/twitter" onClick={this.props.twitterLogin}>
            <div className="ui big blue labeled icon button">
              <Icon className="twitter" />
              Sign in with Twitter
            </div>
          </a>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  twitterLogin: PropTypes.func.isRequired,
};

export default Login;
