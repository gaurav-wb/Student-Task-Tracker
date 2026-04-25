let tasks = []; // creating an empty array that will hold all tasks objects
let taskID = 1; // this is a counter and every task gets a unique id 


// to add tasks // 
function addTask() {  //this runs when button add task is clicked
    let taskName = document.getElementById("taskname").value; //this access the html id taskname
    let category = document.getElementById("category").value; //this access the html id category
    let priority = document.getElementById("priority").value; //this access the html id priority
    //.value --> gets what user typed

    if (taskName.trim() === "") {  //trim removes spaces,, " " becomes ""
        alert("Please enter a task name");
        return //without return empty tasks willbe added; return stops the function immediately 
    }

    let task = { //creating an obj
        id: taskID, //assign unique ID
        name: taskName, //stores all user data
        category: category, //stores all user data
        priority: priority, //stores all user data
        completed: false //false so as every new task starts as not done 
    };

    tasks.push(task); //add the obj into the array --> now the task exists in memory
    taskID++; //increases the ID for new task

    document.getElementById("taskname").value = ""; //clears the input field 

    displayTasks(); //Refresh UI and stats
    updateSummary(); //Refresh UI and stats
}

//to display  tasks//
function displayTasks() {
    let taskList = document.getElementById("tasklist");//gets the container where tasks will appear
    taskList.innerHTML = "";//clears everything

    if (tasks.length === 0) {//check if array is empty
        taskList.innerHTML = "<p>No tasks added yet</p>";//Shows message
        return;//stops function
    }

    for (let i = 0; i < tasks.length; i++) {//loops through every tasks
        let task = tasks[i];//get current task obj

        let card = document.createElement("div");//create new html elelemnt
        card.classList.add("task-card");//adds css class

        if (task.completed === true) {
            card.classList.add("completed-task");
        }//if done --> apply different style

        let status = task.completed ? "completed" : "incomplete";

        card.innerHTML =
            "<h3>" + task.name + "</h3>" +
            "<p>Category: " + task.category + "</p>" +
            "<p>Priority: " + task.priority + "</p>" +
            "<p>Status: " + status + "</p>" +
            "<div class='btn-group'>" +
                "<button class='btn-outline btn-outline-green' onclick='completeTask(" + task.id + ")'>Complete</button>" +
                "<button class='btn-outline btn-outline-danger' onclick='deleteTask(" + task.id + ")'>Delete</button>" +
                "<button class='btn-glow glow-purple' onclick='undoComplete(" + task.id + ")'>Undo</button>" +
            "</div>";

        taskList.appendChild(card);//adds card to page
    }
}
//complete task 
function completeTask(id) { //takes task id 
    for ( let i = 0; i<tasks.length; i++) {
        if (tasks[i].id === id) { //finding match
            tasks[i].completed = true; //mark as done
            break; //stop loop once found
        }
    }

    displayTasks();
    updateSummary();
}

// DELETE TASK
function deleteTask(id) {
    let confirmDelete = confirm("Are you sure you want to delete the task")
    if (!confirmDelete) {
        return
    }
    let newTasks = []; //create new array

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
            newTasks.push(tasks[i]); //copy everything except the deleted one
        }
    }

    tasks = newTasks; //replace old array

    displayTasks();
    updateSummary();
}

//UNDO TASK 
function undoComplete(id) { //takes tasks id
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = false; //reverts status
            break;
        }
    }

    displayTasks();
    updateSummary();

}


// UPDATE SUMMARY
function updateSummary() {
    let total = tasks.length; //total tasks
    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completed++; //loops and counts completed tasks
        }
    }

    let incomplete = total - completed; //compute incomplete 

    document.getElementById("summary").innerHTML = //render dashboard
        "<div class='summary-grid'>" +

            "<div class='summary-card total'>" +
                "<h4>Total Tasks</h4>" +
                "<span>" + total + "</span>" +
            "</div>" +

            "<div class='summary-card completed'>" +
                "<h4>Completed Tasks</h4>" +
                "<span>" + completed + "</span>" +
            "</div>" +

            "<div class='summary-card incomplete'>" +
                "<h4>Incomplete Tasks</h4>" +
                "<span>" + incomplete + "</span>" +
            "</div>" +

        "</div>";
}