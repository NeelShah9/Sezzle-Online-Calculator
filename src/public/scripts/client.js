$(document).ready(onReady);

let operator;
let expressionArray = [];
let stringNumber = '';

function onReady() {
	$('.num-btn').on('click', insertNumbers);
  $('#submit').on('click', addNum);
  $('#clearButton').on('click', clearAll);
  $('.operator-btn').on('click', addOperators);
  $('#negative').on('click', turnNegative);
  $('#percentage').on('click', percentageButton);
  getNum()
}


function turnNegative() {
	stringNumber = '-' + stringNumber;

	//Empty out id appending-number then append to DOM
	$('#appending-number').empty();
	$('#appending-number').append(stringNumber);
}


function percentageButton() {
	stringNumber = stringNumber * 0.01;
	$('#appending-number').empty();
	$('#appending-number').append(stringNumber);
}

function addNum() {
  // Send the equasion to the server on click 
  let objectToSend = {
    enter1: expressionArray[0],
    operator:expressionArray[1],
    enter2: stringNumber
  } 
if(objectToSend.enter1==undefined||objectToSend.enter2==undefined)
{      alert('please write a valid equasion');

} else{ 
$.ajax({
    type: 'POST',
    url: '/numbers',
    data: objectToSend
  }).then(function (response) {
    console.log('back from POST:', response); {
      getNum()
      clearAll()
    }

  }).catch(function (err) {
    console.log(err);
    alert('please fill all inputs');
  })
}
expressionArray = []

}

function getNum() {
  // ajax GET to server for inventory
  $.ajax({
    type: 'GET',
    url: '/numbers'
 
	 }).then(function (response) {
 let ans1 = $('#ans');
    ans1.empty();
ans1.append(`<h1>${ response[0].answer}</h1>`)
    let his = $('#history');
    his.empty();

    for (let i = 0; i < response.length; i++) {
      his.append(`<li>${ response[i].equation.enter1 } ${ response[i].equation.operator }
                ${ response[i].equation.enter2 } = ${ response[i].answer }<br><br></li>`)
    } //end for
 }).catch(function (err) {
    console.log(err);
  })
}

function clearAll() {
  // Clear all input fields 
	$('#appending-number').empty();
	$('#current').empty();
  stringNumber = '';
   let answer1 = $('#ans');
    answer1.empty();
}

function addOperators(event) {
  expressionArray = []
  $('#appending-number').empty();
	$('#current').empty();

	let operand = event.target.value;

	expressionArray.push(stringNumber);
	expressionArray.push(operand);

	stringNumber = '';

	//Empty DOM for appending  
	$('#appending-number').empty();
  $('#current').empty();
  	
	//Append to DOM for id current using for loop
	for(let item of expressionArray) {
		$('#current').append(`${item} `);
	}
}

function insertNumbers(event) {
	// Holds the first value of the equasion in a string
	stringNumber += event.target.value;

	$('#appending-number').empty();
	$('#appending-number').append(stringNumber);
}

