function handleCredentialResponse (response) {
      console.log("Encoded JWT ID token: " + response.credential);
      loginAgainstBackend(response.credential)
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

const loginAgainstBackend = async (id_token) => {
      fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token })
      }).then(response => {
            console.log('Logged in ', response)
            window.location.href = response.url
      })
      .catch(error => {
            console.info('Could not login ', error)
      })
}