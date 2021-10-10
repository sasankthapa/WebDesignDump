const form=document.getElementById('form')
const username=document.getElementById('username')
const email=document.getElementById('email')
const password=document.getElementById('password')
const password2=document.getElementById('password2')
const date=document.getElementById('date');
//show input error message
function showError(input, message){
    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small=formControl.querySelector('small');
    small.innerText=message;
}

//show success message
function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

//check email
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, 'Email is not valid');
    }
}

//check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim()===''){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input)
        }
    });
}

function checkLength(input, min,max){
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} must be atleast ${min} characters`);
    }else if(input.value.length>max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`);
    }else{
        showSuccess(input)
    }
}

//Check password
function checkPasswordMatch(input1, input2){
    if(input1.value!==input2.value){
        showError(input2,"Passwords don't match.")
    }
}

function getFieldName(input){
    return input.id.toUpperCase().charAt(0)+input.id.slice(1);
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    navigator.geolocation.getCurrentPosition((position)=>alert(position),()=>alert('help'))
    checkRequired([username, email, password, password2]);
    console.log(typeof date.value)
    checkLength(username,3,15);
    checkLength(password,6,16);
    checkEmail(email);
})