const combinations = [["a", "b", "c"],["d", "e", "f"],["g", "h", "i"],["a", "d", "g"],["b", "e", "h"],["c", "f", "i"],["a", "e", "i"],["c", "e", "g"]];

options = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

let infos = {user:'',computer:''};
let user = [];
let computer = [];
gameOn = true;
userturn = true;

function controls(clicked_id){
  if (clicked_id === 'x'){
    infos.user = 'X';
    infos.computer = 'O';
  } else if (clicked_id === 'o') {
    infos.user = 'O';
    infos.computer = 'X';
  }
  $('.first').addClass('over');
  $('.buttonX').removeClass('over');
  $('.buttonO').removeClass('over');
  $('.reset').removeClass('over');    $('.button' + infos.computer).addClass('disabled');
}
function makeachoice (clicked_id){
    $('#' + clicked_id).html(infos.user).attr('disabled','disabled');
    user.push(clicked_id);
    for(let i = options.length - 1; i >= 0; i--) {
    if(options[i] === clicked_id) {
       options.splice(i, 1);
    }
}
  $('.button' + infos.user).addClass('disabled');
$('.button' + infos.computer).removeClass('disabled');
  winnerU();
    
}
function sortOptions(array) {
  for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  return array;   
}
function computerchoice(){
  if (gameOn === true) {
  setTimeout(function() {
  options = sortOptions(options);  
  let random = options[Math.floor(Math.random()*options.length)];
$('#' + random).html(infos.computer).attr('disabled','disabled');
    computer.push(random);
    for(let i = options.length - 1; i >= 0; i--) {
   if(options[i] === random) {
       options.splice(i, 1);
    }
}
$('.button' + infos.user).removeClass('disabled');
$('.button' + infos.computer).addClass('disabled');
winnerC();
  }, 1000);}
}

function winnerU(){
//Check if user is a winner
  if (user.length === 3 || user.length === 4) {
    for (let i=0;i<combinations.length;i++){
      if(Array.from(new Set(user)).length == Array.from(new Set(user.concat(combinations[i]))).length) { 
        $('#' + combinations[i][0]).addClass("winner").removeAttr('disabled','disabled');
        $('#' + combinations[i][1]).addClass("winner").removeAttr('disabled','disabled');
        $('#' + combinations[i][2]).addClass("winner").removeAttr('disabled','disabled');
        $('.game-over').removeClass('over').html('You won..');
        $('.buttonX').addClass('disabled');
$('.buttonO').addClass('disabled');
        gameOn = false;
        setTimeout(function() {restart()}, 2000);
      }
      } 
    }
  else
    if (user.length === 5) {
    for (let j=0;j<combinations.length;j++){
      if(Array.from(new Set(user)).length == Array.from(new Set(user.concat(combinations[j]))).length){
      $('#' + combinations[j][0]).addClass("winner").removeAttr('disabled','disabled');
        $('#' + combinations[j][1]).addClass("winner").removeAttr('disabled','disabled');
        $('#' + combinations[j][2]).addClass("winner").removeAttr('disabled','disabled');
        $('.game-over').removeClass('over').html('You won..');  
        $('.buttonX').addClass('disabled');
$('.buttonO').addClass('disabled');
        gameOn = false;
        setTimeout(function() {restart()}, 2000);
        break;
    } else  {
      $('.game-over').removeClass('over').html('It was a draw..');  
        $('.buttonX').addClass('disabled');
$('.buttonO').addClass('disabled');
        gameOn = false;
        setTimeout(function() {restart()}, 2000); }
      }
    } 
      computerchoice();
    
  }     
function winnerC (){
  //Check if computer is a winner
 if (computer.length === 3 || computer.length === 4) {
    for (let k=0;k<combinations.length;k++){
      if(Array.from(new Set(computer)).length == Array.from(new Set(computer.concat(combinations[k]))).length){
      $('#' + combinations[k][0]).addClass("winner").removeAttr('disabled','disabled');
        $('#' + combinations[k][1]).addClass("winner").removeAttr('disabled','disabled');
        $('#' + combinations[k][2]).addClass("winner").removeAttr('disabled','disabled');
        $('.game-over').removeClass('over').html('You lost..');    
        $('.buttonX').addClass('disabled');
$('.buttonO').addClass('disabled');
        setTimeout(function() {restart()}, 2000);
      }
      }
    }
}

function restart(){
  options = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  user = [];
  computer = [];
  userturn = true
  for (let i=0;i<options.length;i++){
    $('#' + options[i]).empty().removeAttr('disabled','disabled').removeClass('winner');
  }
   $('.button' + infos.user).removeClass('disabled');
  $('.game-over').empty().addClass('over');
    gameOn = true;
}

function reset(){
  $('.first').removeClass('over');
  $('.buttonX').addClass('over');
  $('.buttonO').addClass('over');
  $('.reset').addClass('over');
  $('.button' + infos.computer).removeClass('disabled');
  restart();
}
