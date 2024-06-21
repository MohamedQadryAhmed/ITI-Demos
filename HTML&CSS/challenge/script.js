function isPalindrome (text) {
    return text == text.split('').reverse().join('');
}

function checkindex(text) {
    if(!isPalindrome(text)){
        for (let i = 0; i < Math.floor(text.length / 2); i++) {
            if (text[i] !== text[text.length - 1 - i]) {
                if (isPalindrome(text.substring(0, i) + text.substring(i + 1))) {
                    return i;
                } else if (isPalindrome(text.substring(0, text.length - 1 - i) + text.substring(text.length - i))) {
                    return text.length - 1 - i;
                } else {
                    return -1;
                }
                
            }
        }
    }else {
        return -1
    }
}
