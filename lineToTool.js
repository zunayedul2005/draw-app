function LineToTool(){
	// Path to load the image for the line tool
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo"; // seting the name for the tool
	// starting point of the mouse position in the x and y position.
	var startMouseX = -1; 
	var startMouseY = -1;
	var drawing = false; // track user activisty in case if the user is drawing

	this.draw = function(){
		// checking if the mouse is presed if mouse is presed the drawing starts
		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();// This loads the current value of each pixel on the canvas into the pixels array.
			}

			else{
				updatePixels(); /* This can update the canvas with the RGBA values in the pixels array.
									call only after change values in the pixel array. The change are made directly,
									after calling loadPixels()*/
				 strokeWeight(3); //
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			drawing = false; // if user is not drawing back to the starting point.
			// reset the starting positon of mouse if the user is not drawing.
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
