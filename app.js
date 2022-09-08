'use strict';

var mouseDown = 0;
var widgets = []

document.onmousedown = function (evt) {
    console.log(evt.button);
    if (evt.button == 0) {
        console.log("Down");
        ++mouseDown;
    }
    
}
document.onmouseup = function (evt) {
    console.log(evt.button);
    if (evt.button == 0) {
        console.log("Up");
        --mouseDown;
    }
}


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
            if (!mouseDown) {
                return;
            }
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
        enableDrag();

    });
}



// Area for adding new tiles

// Make them clickable
document.getElementById("note-creator").onmousedown = function () {
    addNote();
    return true;
};

document.getElementById("to-do-creator").onmousedown = function () {
    addToDo();
    return true;
};

document.getElementById("header-creator").onmousedown = function () {
    addHeader();
    return true;
};

function saveAll() {
    // Saves all widgets
}

// Classes for widgets
class Widget {
    loadData() { }
    getSaveData() { }
}
class Note extends Widget {
    constructor() {
        super();

        this.widget = document.createElement("div");
        // and give it some content 
        this.widget.className = "note";
        this.widget.setAttribute("draggable-object", true);
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.className = "text-input";

        // add the text node to the newly created div
        this.widget.appendChild(this.input);


        // add the newly created element and its content into the DOM 
        var currentDiv = document.getElementById("div1");
        document.body.insertBefore(this.widget, currentDiv);

        getDraggable(this.widget);
    }
    loadData() { }
    getSaveData() { }
}

class ToDo extends Widget {
    constructor() {
        super();

        // create a new div element 
        this.widget = document.createElement("div");
        // and give it some content 
        this.widget.className = "to-do";
        this.widget.setAttribute("draggable-object", true);
        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        this.checkbox.className = "checkbox-input";

        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.className = "text-input";

        // add the text node to the newly created div
        this.widget.appendChild(this.checkbox);
        this.widget.appendChild(this.input);


        // add the newly created element and its content into the DOM 
        var currentDiv = document.getElementById("div1");
        document.body.insertBefore(this.widget, currentDiv);

        getDraggable(this.widget);
    }
    loadData() { }
    getSaveData() { }
}

function addNote() {
    widgets.push(new Note());
}

function addToDo() {
    widgets.push(new ToDo());
}

function addHeader() {

    widgets.push(document.createElement("div"));

    widgets[widgets.length - 1].className = "header";
    widgets[widgets.length - 1].setAttribute("draggable-object", true);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "header-input";

    // add the text node to the newly created div
    widgets[widgets.length - 1].appendChild(input);


    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(widgets[widgets.length - 1], currentDiv);

    getDraggable(widgets[widgets.length - 1]);
}