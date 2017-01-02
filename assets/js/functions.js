var token;
var statusField = document.getElementById("status");
var sendStatus;

function tokenRequest() {
    var request = new XMLHttpRequest();

    request.open("GET", "assets/php/tokenCreator.php", false);
    request.send();
    token = request.responseText;
}

function processContact() {
    var name, eMail, message;
    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var messageField = document.getElementById("message");
    var sendMail = new XMLHttpRequest();

    name = nameField.value;
    eMail = emailField.value;
    message = messageField.value;

    if (name == "" || eMail == "" || message == "") {
        statusField.style.color = "#FF9800";
        statusField.innerHTML = "Warning: All inputs are required.";
    } else if (eMail.search("@") == -1) {
        statusField.style.color = "#FF9800";
        statusField.innerHTML = "Warning: Email-adress is invalid.";
    } else {
        sendMail.open("POST", "assets/php/mail.php", true);
        sendMail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        sendMail.send("name=" + name + "&email=" + eMail + "&message=" + message + "&token=" + token);
    }

    sendMail.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 1) {
                statusField.style.color = "#4CAF50";
                statusField.innerHTML = "Sucess: Email has been send!";
                nameField.value = "";
                emailField.value = "";
                messageField.value = "";
            } else {
                statusField.style.color = "#F44336";
                statusField.innerHTML = "Error: Email could not been send!";
            }
            sendStatus = 1;
        }
    }
}

function validate(input) {

}

function resetStatus() {
    if (sendStatus == 1) {
        statusField.innerHTML = "";
    }
}