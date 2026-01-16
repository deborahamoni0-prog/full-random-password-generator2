const resultEl =document.getElementById('result');
const lengthEl =document.getElementById('length');
const lengthValueEl=document.getElementById('length-value');
const uppercaseEl =document.getElementById('uppercase');
const lowercaseEl =document.getElementById('lowercase');
const numbersEl =document.getElementById('numbers');
const symbolsEl =document.getElementById('symbols');
const generateEl =document.getElementById('generate');
const clipboardEl=document.getElementById('clipboard');
const strengthBar =document.querySelector('.strength-bar');
const strengthText =document.getElementById('strength-value');
//update length display
lengthEl.addEventListener('input', () => {
  lengthValueEl.textContent = lengthEl.value;
  
});
//generate password
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
const hasUpper = uppercaseEl.checked;
const hasNumber = numbersEl.checked;
const hasSymbol = symbolsEl.checked;
const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
resultEl.textContent = password;
 updateStrength(password);
});
//copy to clipboard
clipboardEl.addEventListener('click', () => {
const password = resultEl. textContent;
if (!password) return;
navigator.clipboard.writeText(password)
.then(() => {
const original = clipboardEl.innerHTML;
clipboardEl.innerHTML = '<svg viewBox="0 0 24 24"> <path d="m9 16.17L4,83 121.1.42 1.41L9 19 21 7l.1.41.1.41L9 16.17z"/></svg>';
setTimeout(() => {
    clipboardEl.innerHTML = original;
}, 2000);
});
    
});
//password generator function
function generatePassword(lower, upper, number, symbol, length) {
    let generated = '';
    const types = [{
        lower
    },{
        upper
    }, {
        number
    }, {
        symbol
    }].filter(t => Object.values(t)[0]);
    if (types.length === 0) return '';
    for (let i = 0; i < length; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const func = Object.keys(type)[0];
        generated += randomFunc[func]();

    }
    return generated;
} 
const randomFunc ={
    lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
    upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
    number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
    symbol: () => '!@#$%^&*()_+-=/,.[]<>,'.charAt(Math.floor(Math.random() * 18))
};
//password strength meter
function updateStrength(password) {
    let strength = 0;
    if (!password) {
        strength = 0;
    } else{
        //length contributes up to 50%
        strength += Math.min(password.length / 32 * 50, 50);
        //character variety contributes up to 50%
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^a-zA-Z0-9]/.test(password);
        const variety = [hasLower, hasUpper, hasNumber, hasSymbol]
        .filter(Boolean).length;
        strength += (variety / 4) * 50;
    }
    //update UI
    strengthBar.style.setProperty('--strength', `${strength}%`);
    if (strength < 40) {
        strengthBar.style.backgroundColor = '#cf6679';
        strengthText.textContent = 'weak';
    } else if (strength < 70) {
        strengthBar.style.backgroundColor = '#ffb74d';
        strengthText.textContent = 'medium'
    } else{
        strengthBar.style.backgroundColor = '#03dac6';
      strengthText.textContent = 'strong';

    }
    }