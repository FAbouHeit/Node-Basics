
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

function onDataReceived(text) {
  
  let name = text.replace("\n", "")
   name = name.split(" ")
  //  console.log(name)
  let secondword = name[1];
  // console.log(secondword)
  

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
  console.log(" \n 'hello (optional: name)'\n 'list'\n 'remove (optional: number)'\n 'add (required: task name)'\n 'hola' \n 'quit' or 'exit'");
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
  if(myList.length !=0){

      for(let i = 0; i<myList.length; i++){
        console.log(`${index}- ${myList[i]}`)
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
