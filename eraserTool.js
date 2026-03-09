function EraserTool() {
    this.icon = "assets/eraser-icon.png";
    this.name = "Eraser";
    this.size = 20; // initial earsize tool.

    let isErasing = false; // tracking the earse tool status.

    this.draw = function () {}; // the drawfunction in the sketch that we are calling it here again.

    // the mouse pressed method to track the status of earse tool.
    this.mousePressed = function () {
       // earse tool tracker status to true when the tool is selected and used.
        isErasing = true;
        this.erase(mouseX, mouseY); // the mouse cordinates for the earse tool.
    };

    this.mouseDragged = function () {
        if (isErasing) {
            // when tool is selected and dragged to deleted and set the canvas to the 255 color.
            stroke(255);
            strokeWeight(this.size);
            line(pmouseX, pmouseY, mouseX, mouseY);
        }
    };

    this.mouseReleased = function () {
        isErasing = false; // when stop draggin the earse track status change to false.
    };

    // the x and y cordinates for earse tool the use of ellipse shape for deleted.
    this.erase = function (x, y) {
        noStroke();
        fill(255);
        ellipse(x, y, this.size, this.size);
    };

    this.populateOptions = function () {
        select(".options").html("");

        // Slider label.
        let sliderLabel = createP("Eraser Size:");
        sliderLabel.parent(select(".options"));

        // Size slider.
        let sizeSlider = createSlider(5, 100, this.size);
        sizeSlider.parent(select(".options"));

        sizeSlider.input(() => {
            this.size = sizeSlider.value();
        });
    };
}

