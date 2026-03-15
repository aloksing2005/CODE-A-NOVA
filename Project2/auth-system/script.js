let form = document.getElementById("authForm")
let title = document.getElementById("formTitle")
let msg = document.getElementById("msg")

let isSignup = true

function toggleForm(){

isSignup = !isSignup

if(isSignup){
title.innerText="Signup"
document.getElementById("name").style.display="block"
document.getElementById("confirmPassword").style.display="block"
}else{
title.innerText="Login"
document.getElementById("name").style.display="none"
document.getElementById("confirmPassword").style.display="none"
}

msg.innerText=""

}

form.addEventListener("submit",function(e){

e.preventDefault()

let name = document.getElementById("name").value.trim()
let email = document.getElementById("email").value.trim()
let password = document.getElementById("password").value.trim()
let confirmPassword = document.getElementById("confirmPassword").value.trim()

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(isSignup){

if(name==""){
msg.innerText="Name required"
msg.style.color="red"
return
}

}

if(email==""){
msg.innerText="Email required"
msg.style.color="red"
return
}

if(!emailPattern.test(email)){
msg.innerText="Enter valid email"
msg.style.color="red"
return
}

if(password.length<6){
msg.innerText="Password must be at least 6 characters"
msg.style.color="red"
return
}

if(isSignup && password!==confirmPassword){
msg.innerText="Passwords do not match"
msg.style.color="red"
return
}

msg.style.color="green"

if(isSignup){
msg.innerText="Signup successful"
}else{
msg.innerText="Login successful"
}

})