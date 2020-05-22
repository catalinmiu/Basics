import React, { Component } from "react";
import AuthenticationService from '../service/AuthenticationService.js';
import axios from 'axios'


class UserProfile extends Component {
  state = {
    User: {},
    isLoading: true,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(`${id}`);

    var config = {
            headers: {'Access-Control-Allow-Origin': true,
                       'Access-Control-Allow-Methods': "OPTIONS,GET,PUT,POST,DELETE",
                       'Access-Control-Allow-Headers': "X-Requested-With, Content-Type",
                       'Authorization': AuthenticationService.getToken()}
        };


        axios.get(`http://localhost:8081/users/${id}`, config).then(response => {
                                               this.setState({isLoading: false, User: response.data })
                                  }
                     );
  }

  render() {
    const { User, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {
          <div key={User.id}>
            {User.firstName} {User.lastName} {User.email} {User.roles[0].title}
          </div>
        }
      </div>
    );
  }
}

export default UserProfile;
