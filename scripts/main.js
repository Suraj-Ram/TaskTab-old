//Next time...
//Fix Delete Bug
    //Tasks dont get deleted
    //However, when a task's delete button is pressed and another tasks is added, the last item in the array get replaced with the new task

const addTaskButton = document.getElementById("addButton");
const taskInput = document.getElementById("myInput");
const tasksHolderList = document.getElementById("myUL");

var tasks = [];
var delT;
var delT2;


addTaskButton.addEventListener("click", function() {
    newElement();
});
taskInput.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        newElement();
    }
});

window.onload = loadFunction();
window.onload = updateTasks();

function loadFunction() {
    getStorage();
    console.log("-")
    //updateTasks();
    var timeout = setTimeout(updateTasks, 50);

    randomBackgroungImage();
}

//Cloud storage functions

function getStorage() {
    chrome.storage.sync.get('tasksStored', function(result) {
        console.log('Value currently is ' + result.tasksStored);
        tasks = result.tasksStored;
        console.log("Local tasks var = " + tasks);
    });


}
function setStorage() {
    chrome.storage.sync.set({'tasksStored': tasks}, function() {
        console.log('Value is set to ' + tasks);
    }); 
}
function clearStorage() {
    var abc = [];
    chrome.storage.sync.set({'tasksStored': abc}, function() {
        console.log('Value is set to ' + abc);
    }); 
}



//Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    console.log(this);
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    //---Start NEW code, makes if so that you get the exact task string of the task with got checked off
    var checkedElement = ev.target.innerHTML;
    var checkedArray = checkedElement.split("<", 1);
    var checkedTask = String(checkedArray);

    console.log("before check change: " + tasks)

    console.log(checkedTask)
    var checkTaskChange = checkedTask + ":checked";

    var index2 = tasks.indexOf(checkedTask);
    tasks[index2] = checkTaskChange;

    setStorage();


    //tasks.splice(checkedTask, 1, checkTaskChange) -- - old coed 
    console.log("after check change: "+tasks);
    //end new code


  }//end on onclick
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var inputValue = document.getElementById("myInput").value;
    tasks.push(inputValue);

    document.getElementById("myInput").value = "";

    setStorage();
    updateTasks();

    // var li = document.createElement("li");
    // var t = document.createTextNode(inputValue);
    // li.appendChild(t);
    // if (inputValue === '') {
    //     alert("You must write something!");
    // } else {
    //     document.getElementById("myUL").appendChild(li);
    // }

    // document.getElementById("myInput").value = "";

    // var span = document.createElement("SPAN");
    // var txt = document.createTextNode("\u00D7");
    // span.className = "close";
    // span.appendChild(txt);
    // li.appendChild(span);

    // for (i = 0; i < close.length; i++) {
    //     close[i].onclick = function() {
    //     var div = this.parentElement;
    //     div.style.display = "none";
    //     }
    // }
}

function updateTasks() {
    clearAll();
    tasks.forEach(element => {
        console.log(element);
        console.log(typeof element);
        //debug end
        //checked ID code start
        var taskCheckCheck = element.split(":", 2); //creates an array
        console.log("task check check: " + taskCheckCheck);
        var taskText = taskCheckCheck[0];
        console.log("taskText: " + taskText);
        var taskCheckStatus = taskCheckCheck[1];
        console.log("taskCheckStatus: " + taskCheckStatus);

        //taskCheckCheck = String(taskCheckCheck);
        var li = document.createElement("li");
        var t = document.createTextNode(taskText);
        if(taskCheckStatus == "checked") {
            li.className = "checked";
        }
        
        li.appendChild(t);
        if (element == '') {
            alert("You must write something!");
        } else {
            document.getElementById("myUL").appendChild(li);
        }
    
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
    
        //If the task is deleted remove it from the array --> so that it doesn't appear whilr update a called
        for (i = 0; i < close.length; i++) { 
            close[i].onclick = function() {
                console.log(this.innerHTML);
                console.log(this.previousSibling);
                
                // var delTask = this.previousSibling;
                // console.log("del Task= " + delTask);
                // //delTask = delTask.toString();
                // console.log("STRING del Task= " + this.previousSibling.toString());
                
                delT = this.previousSibling;
                console.log(typeof delT);

                delT2 = String
                console.warn(delT2);
                
                console.log(this + "del")
                console.log("before del: " + tasks)
                var index = tasks.indexOf(String(this.previousSibling));
                console.warn(index)
                tasks.splice(index, 1);
                
                console.log("after del: "+tasks);
            var div = this.parentElement;
            div.style.display = "none";
            }
        }
        
    });
}

function clearAll() {
    while (tasksHolderList.firstChild) {
        tasksHolderList.removeChild(tasksHolderList.firstChild);
    }
}

function randomBackgroungImage() {
    var baseLink = "https://source.unsplash.com/daily";
    var keywords = ["mountain", "mountains", "grass", "field", "snow", "cities", "city"];
    var randNum = Math.floor(Math.random() * (keywords.length - 0));
    console.log(randNum);

    var link = baseLink + "?" + keywords[1];
    console.log(link); 


    var cssLink = "url(" + link + ")";
    $("body").css("background-image", cssLink);
}