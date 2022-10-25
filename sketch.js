
// some comments are for a different version of 

// get the height from the bitlen let H = 25; // 400 height divided by 8  400/8
let sz; // 1536 divided by 256
let rr = 1 // pascal row not starting at zero
let maxrow = 36
let pascal2 = [
  [0, 0],
  [0, 1, 0]
]; // a few rows of the

function newRow(oldRow) {
  let new_row = [];
  for (let i = 0; i < oldRow.length - 1; i++) {
    new_row[i] = oldRow[i] + oldRow[i + 1];  // the new row is the sum of neighbors of the old row

  }
  new_row.push(0);  // put a zero on the back
  new_row.unshift(0); // put a zero on the front

  return new_row;  
}

function makeTriangle(n) {

  for (let i = 1; i < n; i++) { // need to start with the second index to form the triangle
    pascal2[i + 1] = newRow(pascal2[i]);

  }

}

function setup() {
  createCanvas(800, 800);
  noStroke()
  background(0);  // don't need this
  makeTriangle(maxrow)
  console.log(pascal2)
  textSize(15)
  mouseReleased();

}

function mouseReleased(){
  background(0)
  sz=20
  drawN(rr%maxrow)
  fill(0,255,0)
  text(rr%maxrow+":: "+pascal2[rr%maxrow], 10,770);
  rr++
}

function drawN(r){
  
  let x =0;
  for (let i = 0; i < pascal2[r].length; i++) {          // 
    binSlice(x,pascal2[r][i], 32); // make a 32bit number
    x+=sz; // move the x pos by width set global W
  }
  
  
  
}



function binConvert(a, bitLen) {
  // takes in a decimal and a bit length and returns a list of ones and zeros binary for that number

  let b = a.toString(2); // converts it to binary but leading zeros, not 8 bits eg. 3 = "11"
  let mask = "0".repeat(bitLen); // a mask to get the extra zeros
  let c = mask.slice(0, bitLen - b.length); // slice to get the right number of zeros
  // eg. if b = "11" then c = "000000"
  let binstring = c + b; // binary string so 3 will give 00000011 8 bits

  let binArray = int(binstring.split("")); // is an aray of ints so [0,0,0,0,0,0,1,1]
  return binArray;
}

function binSlice(x, Dnum, bitLen) {
  // takes an x position, decimal number, and a bitLen of the largest number in the sequence
  
  // takes in a x location on canvas and a decimal number
  // calls the convert function
  let binA = binConvert(Dnum, bitLen);
  // only need an x because y is determined by list length and size
  let y = 0;
  for (const element of binA) {
    if (element == 0) {
      fill(0);
      rect(x, y, sz,sz);
    } else {
      fill(0, 255, 0);
      rect(x, y, sz, sz);
    }
    y += sz;
  }
}


