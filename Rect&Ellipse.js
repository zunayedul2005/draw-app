function Newrectellipse() { // new function created for rect and elipse tool.
    this.icon = "assets/Rectellips.png";
    this.name = "Ellipse&Rect";
    // X and Y cordinates for drawing the shapes.
    this.X_axis = -1;
    this.Y_axis = -1;
    this.draw1 = false; // Tracking flag for drawing.

    this.fillMode = true;  // using booleans to know if our shape is filled.

    // creating the fill mode.
    this.newOption = function() {
        this.option = createCheckbox("shape fill it", true);
        this.option.parent(".options");
       
        // this change fillMode when chekbox status changes.
        let newtool = function () {
            this.fillMode = this.option.checked(); 
        } .bind(this);
        this.option.changed(newtool);
        }

        
  this.toolNotselected = function () { // fuction active when tool is not selected.
    
    if (this.option) this.option.remove();
    
  }

  this.draw = function () { // the main Draw function that we have in our sketch file here we are calling the function.
    
    var Width2 = 0;
    var Height2 = 0;
    // this part of code gets activated when the mouse is pressed.
    if(mouseIsPressed) {
        if(!this.draw1) {
            // this two variables are used to can store the starting cordinates of x and y axis when mouse is pressed.
            this.X_axis = mouseXpos;
            this.Y_axis = mouseYpos;
            this.draw1 = true;
            loadPixels();
        }
        // updating the canvas pixels.
        updatePixels();
        const Width = mouseXpos - this.X_axis;
        const Height = mouseYpos - this.Y_axis;
        // to set fill and stroke for the shape.
        if(this.fillMode) {
            fill(colourP.selectedColour);
            noStroke();
        } else {
            noFill();
            stroke(colourP.selectedColour);
            strokeWeight(5);
        }
        // it draws the rect shape from the starting to curent point.
        rect(this.X_axis, this.Y_axis, Width, Height);
        // it draws ellipse in the center of the rect shape.
        ellipse(this.X_axis + Width / 2, this.Y_axis + Height / 2, abs(Width), abs(Height));
        // when you stop holding the mouse button the shape stop drawing.
    } else if (this.draw1) {
            Width2 = mouseXpos - this.X_axis;
            Height2 = mouseYpos - this.Y_axis;
        
        // set fill, noStroke and Stroke for the final object drawed.
        if (this.fillMode) {
            fill(colourP.selectedColour);
            noStroke();
        } else {
            noFill();
            stroke(colourP.selectedColour);
            strokeWeight(5);
        }

  

        rect(this.X_axis, this.Y_axis, Width2, Height2);
        ellipse(this.X_axis + Width2 / 2, this.Y_axis + Height2 / 2, abs(Width2), abs(Height2));
        // load the canvas status.
        loadPixels(); 
        // this reset the tracker for our drawing flag.
        this.draw1 = false;
    }
  }
}