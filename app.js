'use strict';
function getDraggable(draggableObject) {
    // get all elements with the 'draggable-object' attribute
    var draggableObjects = [];
    draggableObjects.push(draggableObject);

    draggableObjects.forEach(obj => {

        function getMouseOffset() {
            var e = window.event;

            // returns the distance in pixels the mouse cursor is offset from
            // the element's top left point on the x/y-axis
            return {
                X: e.clientX - obj.offsetLeft,
                Y: e.clientY - obj.offsetTop,
            };
        }

        var mouseOffsetX = 0,
            mouseOffsetY = 0;

        // allow dragging of the element
        function enableDrag() {
            document.onmouseup = disableDrag;
            document.onmousemove = dragElement;

            // get the offset amount for the first mouse press for every drag
            mouseOffsetX = getMouseOffset().X;
            mouseOffsetY = getMouseOffset().Y;
        }

        function dragElement() {
            // get the window mouse co-ords
            var e = window.event;
            e.preventDefault(); // get disables text highlighting during dragging

            var mouseX = e.clientX; // get mouse x/y
            var mouseY = e.clientY;

            // get new element co-ords offset from the mouse position
            var newX = mouseX - mouseOffsetX;
            var newY = mouseY - mouseOffsetY;

            // move the element to the new position, while
            // also keeping visible within the document/window area
            obj.style.left = Math.max(10, Math.min(newX, document.documentElement.clientWidth - obj.offsetWidth - 10)) + "px";
            obj.style.top = Math.max(10, Math.min(newY, document.documentElement.clientHeight - obj.offsetHeight - 10)) + "px";
        }

        // disable dragging of the element
        function disableDrag() {
            var e = window.event;
            e.preventDefault();

            var mouseX = e.clientX;
            var mouseY = e.clientY;

            document.onmouseup = null;
            document.onmousemove = null;
        }

        // enable dragging every time the mouse is pressed down
        // on the element
        obj.onmousedown = enableDrag;

    });
}


document.body.onload = addNote;



// Area for adding new tiles

// Make them clickable
document.getElementById("note-creator").onmousedown = function () {
    addNote();
    return true; // Not needed, as long as you don't return false
};

document.getElementById("to-do-creator").onmousedown = function () {
    addToDo();
    return true; // Not needed, as long as you don't return false
};

function addNote() {
    // create a new div element 
    var newDiv = document.createElement("div");
    // and give it some content 
    newDiv.className = "note";
    newDiv.setAttribute("draggable-object", true);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "text-input";

    // add the text node to the newly created div
    newDiv.appendChild(input);


    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

    getDraggable(newDiv);
}

function addToDo() {
    // create a new div element 
    var newDiv = document.createElement("div");
    // and give it some content 
    newDiv.className = "to-do";
    newDiv.setAttribute("draggable-object", true);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-input";

    var input = document.createElement("input");
    input.type = "text";
    input.className = "text-input";

    // add the text node to the newly created div
    newDiv.appendChild(checkbox);
    newDiv.appendChild(input);


    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

    getDraggable(newDiv);
}