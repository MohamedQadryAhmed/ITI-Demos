import { useState } from "react";
// import { BackToHome } from "../App";

const ChallengeOne = () => {
  const [inputText, setInputText] = useState("");
  const [index, setIndex] = useState();

  const isPalindrome = (str) => {
    return str === str.split("").reverse().join("");
  };

  const findPalindromeIndex = (text) => {
    let left = 0; //first index
    let right = text.length - 1; //last index
    while (left < right) {
      if (text[left] !== text[right]) {
        const leftRemoved = isPalindrome(text.slice(left + 1, right + 1));
        const rightRemoved = isPalindrome(text.slice(left, right));
        if (leftRemoved) {
          return left;
        } else if (rightRemoved) {
          return right;
        } else {
          return -1;
        }
      }
      left++;
      right--;
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    const palindromeIndex = findPalindromeIndex(inputText);
    setIndex(palindromeIndex);
  };

  return (
    <>
      {/* <BackToHome /> */}
      <h1 className="title is-1 has-text-white">Challenge 1</h1>
      <h2 className="subtitle has-text-white">
        Given a<code>string</code> of lowercase letters in the range ascii[a-z],
        determine the <code>index</code> of the one character that can be
        <code>removed</code> to make the string a palindrome. If the word is
        already a palindrome or there is no <code>"only one index"</code>{" "}
        solution, which means that we have to remove more than one, return{" "}
        <code>-1</code>. Otherwise, return the <code>index</code>
        of the character to remove.
      </h2>
      <h1 className="title is-1 has-text-white">Example</h1>
      <h2 className="subtitle has-text-white">
        <p>aaab</p>
        <p>acxycab</p>

        <p> Output </p>
        <p>3</p>
        <p>-1</p>
      </h2>
      {/*
      
        input to write the string in
        and a button to get the answer and show it

        Note: you can show the answer as just a simple text under them
      */}
      <input value={inputText} onChange={handleInputChange} />
      <button className="purpleButton" onClick={handleSubmit}>
        {" "}
        Submit{" "}
      </button>
      <span>{index !== 0 ? index : ""}</span>
    </>
  );
};

export default ChallengeOne;