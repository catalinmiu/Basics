import axios from 'axios'

const API_URL = 'http://localhost:8081'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

     executeSignUp(password, firstName, lastName, email) {
            const data = {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password
                };
                console.log(data);
                //e.preventDefault();
                //console.log(this.state);
                var config = {
                  headers: {
                    "Access-Control-Allow-Origin": true,
                    "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
                    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
                    //Authorization: AuthenticationService.getToken(),
                  },
                };
                /*const headers = {
                  "Access-Control-Allow-Origin": true,
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
                  "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
                };*/
                return axios
                  .post("http://localhost:8081/users", data, config);


            //return axios.post(`${API_URL}/users`,
            //    { headers: { authorization: this.createBasicAuthToken(username, password) } })
        }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem("token", this.createBasicAuthToken(username, password))
        //this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.setItem("token", null)
    }

    setUpRoles(username) {

            var roles = []
            var config = {
                    headers: {'Access-Control-Allow-Origin': true,
                               'Access-Control-Allow-Methods': "OPTIONS,GET,PUT,POST,DELETE",
                               'Access-Control-Allow-Headers': "X-Requested-With, Content-Type",
                               'Authorization': this.getToken()}
                };
            axios
            .get(`${API_URL}/users/getRole/${username}`, config)
            .then(response => {roles = response.data.roles;
             sessionStorage.setItem("roles", roles);});

        }
    getRoles() {
              let roles = sessionStorage.getItem("roles")
                      if (roles === null) return ''
                      return roles
            }

    isAdmin() {
        if(this.getRoles().includes("ADMIN")) {
            return true;
        }
        return false;
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    getToken() {
            let token = sessionStorage.getItem("token")
            if (token === null) return ''
            return token
        }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    console.log('intercepted!');
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()