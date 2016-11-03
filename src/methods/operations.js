// Reusable Methods not required to be owned by components

//adds commas to numbers and returns a string representation
function prettyNumber(num) {
  let value= [];
  const numLength = num.toString().length;
  if (numLength < 4) return num;
  let counter = 0;
  for(let i = numLength - 1; i >= 0; i--){
    if(counter % 3 === 0 && counter !== 0){
      value.unshift(',');
      value.unshift(num.toString().charAt(i))
      counter++;
    } else {
      value.unshift(num.toString().charAt(i))
      counter++;
    }
  }
  return value.join('')
}

export{prettyNumber};
