onSignIn = (googleUser) => {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

      console.log('ID_TOKEN: ', googleUser.getAuthResponse().id_token)
      //loginAgainstBackend(googleUser.getAuthResponse().id_token)
}

const signOut = () => {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
            console.log('User signed out.');
      });
}

const loginAgainstBackend = (id_token) => {
      fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token })
      })
}

