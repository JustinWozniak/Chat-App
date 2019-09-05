// Read from our node.js backend

// Wrong:
//let response = fetch("http://localhost:8080/")
//console.log(response);




// Write to our node.js backend


let userName = "No Name Entered"



function sendClickedName() {

    const usernameFromForm = document.getElementById("userName").value

        return usernameFromForm

}

const sendClicked = () => {
    
    const inputMessageElement = document.getElementById("input-message");
    const usernameFromForm = document.getElementById("userName").value
    
    const SEND_URL = "http://localhost:8080/write_message?message=";
    const encodedMessage = usernameFromForm + ": " + encodeURI(inputMessageElement.value);
    const url = `${SEND_URL}${encodedMessage}`;
    
    // console.log(url);
    fetch(url);
    
}

function repeatedCode() {
    fetch("http://localhost:8080/read_message")
    .then(
        (response) => {
            return response.text();
        }
    )
    .then(
        (text) => {
            let messageElement = document.getElementById("received-message");
            let decodedMessage = decodeURI(text);
            messageElement.innerHTML = decodedMessage;
        }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    )
}

setInterval(repeatedCode);
