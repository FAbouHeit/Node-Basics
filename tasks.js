
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */

let myList = []
let checkMyList = []

function onDataReceived(text) {
  
  let name = text.replace("\n", "")
   name = name.split(" ")
  //  console.log(name)
  let secondword = name[1];
  // console.log(secondword)
  let editText = []
  if( isNaN(secondword) && (name[0]== 'edit' || name[0]== 'edit\n')){
    
    for(let i=1; i<name.length;i++){
      editText.push(name[i])
    } 
    // console.log(secondword, editText)
  } else if(!isNaN(secondword) && (name[0]== 'edit' || name[0]== 'edit\n')){
    for(let i=2; i<name.length;i++){
      editText.push(name[i])
    } 
    // console.log(secondword, editText)
  }
  

// console.log(name)
  if (text === 'quit\n' || text ==='exit\n') {
    quit();
  }
  else if(name[0] === 'hello\n' || name[0]=== 'hello'){
    // console.log("hello\n")
    hello(secondword);
  }else if(text === 'hola\n'){
    hola();
  } else if(text === 'help\n'){
    listCommands();
  }else if(text === 'list\n'){
    list();
  }
  else if(text === 'add\n' || name[0]==='add'){
    add(secondword);
  }else if(text === 'remove\n' || name[0]==='remove'){
    if(!secondword){
    secondword=0}
    remove(parseInt(secondword));
  }
  else if(text === 'edit\n' || name[0]==='edit' ){
    if (isNaN(secondword) ) {secondword=0;}
    edit(secondword, editText);
  }else if(text === 'check\n' || name[0]==='check'){
    if(isNaN(secondword)){
      secondword = 0;
    }
    check(secondword);
  }else if(text === 'uncheck\n' || name[0]==='uncheck'){
    if(isNaN(secondword)){
      secondword = 0;
    }
    uncheck(secondword);
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}

/**
*prints the list of possible commands
*/
function listCommands(){
  console.log(" \n 'hello (optional: name)'\n 'list'\n 'remove (optional: number)'\n 'add (required: task name)'\n 'edit (optional: number) (required: text)'\n 'check (required: task number)'\n 'uncheck (required: task number)'\n 'hola' \n 'quit' or 'exit'");
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name){
  if(name == null || name == "" || name == undefined) {
    console.log("Hello!")
  } else {
  let printThis = `hello ${name}!`;
  printThis = printThis.replace("\n", "");
  console.log(`${printThis}`);
  }
}

/**
 * says hola
 */
function hola(){
  console.log('hola espanol amigo!')
}

/**
* Comment
*/
function list(){
  // console.log(myList)
  let index = 1;
  let check = ""
  if(myList.length !=0){

      for(let i = 0; i<myList.length; i++){
        if(checkMyList[i]==false){
          check = " "
        } else {
          check = "✓"
        }
        console.log(`${index}- [${check}] ${myList[i]}`)
        index++;
      }

  } else {
    console.log("No Tasks.")
  }
}

function add(task){
  if(task == null)  {
    return console.log("Error: please add a task properly: add(task)")
  }
  myList.push(task);
  checkMyList.push(false)
}

function remove(num){

  if (num <0 || num > myList.length) {
    console.log(`${num} does not exist! Try again...`)
  } else{

  if(num == 0){
      myList.pop();
  } else if(num){
    myList.splice(num-1,1)
  }
}

}


function edit(number, text){
  // console.log("your reached the edit! wohooo" + number + text)
  let mynewtext = ""
  if(number==0 && text){
    for(let i =0; i<text.length; i++){
      mynewtext += text[i]
      mynewtext += ' '
    }
    myList[myList.length-1] = mynewtext;
  } else if(number && text){
    for(let i =0; i<text.length; i++){
      mynewtext += text[i]
      mynewtext += ' '
    }
    myList[number-1] = mynewtext;
  } else {
    console.log("check your inputs")
  }
}

function check(num){
  if(num>myList.length || num <1){
    console.log("error checking the task...")
  } else {
    checkMyList[num-1] = true;
  }
}


function uncheck(num){
  if(num>myList.length || num <1){
    console.log("error unchecking the task...")
  } else {
    checkMyList[num-1] = false;
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Fuad Abou Heit")
