
console.log("hello, world");

// Read from our node.js backend

// Wrong:
//let response = fetch("http://localhost:8080/")
//console.log(response);




// Write to our node.js backend

const sendClicked = () => {
    
    const inputMessageElement = document.getElementById("input-message");
    
    const SEND_URL = "http://localhost:8080/write_message?message=";
    const encodedMessage = encodeURI(inputMessageElement.value);
    const url = `${SEND_URL}${encodedMessage}`;
    
    console.log(url);
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
