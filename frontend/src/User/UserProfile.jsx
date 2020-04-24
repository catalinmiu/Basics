import React, { Component } from "react";

class UserProfile extends Component {
  state = {
    User: {},
    isLoading: true,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    // console.log(`${id}`);
    const response = await fetch(`/users/${id}`);
    const body = await response.json();
    this.setState({ User: body, isLoading: false });
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
