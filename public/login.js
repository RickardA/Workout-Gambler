function handleCredentialResponse (response) {
      console.log("Encoded JWT ID token: " + response.credential);
}
window.onload = function () {
      google.accounts.id.initialize({
            client_id: "385996968425-0asav67051ro7oe509l603jvm7p88t1s.apps.googleusercontent.com",
            callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
}

onSignIn = (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

      console.log('ID_TOKEN: ', googleUser.getAuthResponse().id_token)
      loginAgainstBackend(googleUser.getAuthResponse().id_token)
}

const signOut = () => {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
            console.log('User signed out.');
      });
}

// Get current JWT console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token)

const loginAgainstBackend = (id_token) => {
      fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token })
      })
}

// 385996968425-0asav67051ro7oe509l603jvm7p88t1s.apps.googleusercontent.com