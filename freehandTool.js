function FreehandTool() {
    this.icon = "assets/freehand.jpg";
    this.name = "freehand";
    this.size = 5; // Default brush size

    var previousMouseX = -1;
    var previousMouseY = -1;

    this.draw = function() {
        if (mouseIsPressed) {
            stroke(colourP.selectedColour);
            strokeWeight(this.size);
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    this.populateOptions = function() {
        select(".options").html(""); 
        let sliderLabel = createP("Brush Size:"); // creating label for the brush size.
        sliderLabel.parent(select(".options")); // creating the label using the DOM.
        let sizeSlider = createSlider(1, 50, this.size); // creating the size slider starting  from 1 to as much 50 for the size pointing to the ititial size.
        sizeSlider.parent(select(".options"));
        sizeSlider.input(() => {
            this.size = sizeSlider.value();
        });
    };
}
