document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let subject = document.getElementById("subject").value.trim();
let message = document.getElementById("message").value.trim();

let msg = document.getElementById("msg");

let emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if(name === ""){
msg.innerHTML = "Name is required";
msg.style.color = "red";
return;
}

if(email === ""){
msg.innerHTML = "Email is required";
msg.style.color = "red";
return;
}

if(!emailPattern.test(email)){
msg.innerHTML = "Enter valid Gmail (example: name123@gmail.com)";
msg.style.color = "red";
return;
}

if(subject === ""){
msg.innerHTML = "Subject is required";
msg.style.color = "red";
return;
}

if(message === ""){
msg.innerHTML = "Message is required";
msg.style.color = "red";
return;
}

msg.innerHTML = "Message sent successfully!";
msg.style.color = "green";

});