class Auth {
  constructor() {
    this._baseUrl = "https://login-page-server.herokuapp.com";
  }

  async login(username, password) {
    try {
      // FETCH POST LOGIN CREDENTIALS
      const rawRes = await fetch(
        // `https://login-page-server.herokuapp.com/login`,
        this._baseUrl + "/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      // CONVERT JSON TO JS
      const res = await rawRes.json();

      // CHECK STATUS MESSAGE
      // USER UNREGISTERED
      if (res.statusMessage === "UNREGISTERED") {
        throw new Error("Incorrect password or username");
      }
      // USER REGISTERED
      if (res.statusMessage === "SUCCESS") {
        sessionStorage.setItem("token", res.token);
        return res.token;
      }
    } catch (err) {
      throw err;
    }
  }

  logout(cb) {
    sessionStorage.removeItem("token");
    if (cb) return cb();
  }

  async register({ username, password, email }) {
    try {
    const res = await fetch(
      this._baseUrl + '/register',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      }
    );

    const resJson = await res.json();

    if (resJson.statusMessage === "SUCCESS")
      return (window.location.hash = "/login");
    else if (resJson.statusMessage === "UNAVAILABLE")
      throw new Error("Username or Email is not available");
    } catch (err) {
      throw err;
    }
  }

  isAuthenticated() {
    const token = sessionStorage.getItem("token");
    return token !== undefined && token !== null;
  }

  async getCredentials() {
    const token = sessionStorage.getItem("token");
    try {
      // FETCH CREDENTIALS WITH TOKEN
      const rawRes = await fetch(this._baseUrl + "/credentials", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      // CONVERT TO JSON
      const res = await rawRes.json();

      // CHECK STATUS MESSAGE
      // UNREGISTERED
      if (res.statusMessage === "UNREGISTERED") {
        throw new Error("Account not found");
      } else {
        return res;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateProfile(dataToSubmit) {
    const token = sessionStorage.getItem("token");

    try {
      const rawRes = await fetch(this._baseUrl + '/credentials', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          credentials: dataToSubmit,
        }),
      });

      const res = await rawRes.json();

      if (res.statusMessage === 'UNREGISTERED') {
        throw new Error('Update failed, try again later or re-login to your account');
      }
      if (res.statusMessage === 'SUCCESS') {
        return res.credentials;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new Auth();
