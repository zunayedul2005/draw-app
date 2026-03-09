function SprayCanTool() {
    this.icon = "assets/sprayCan.jpg";
    this.name = "sprayCanTool";
    this.size = 20;        // Spray radius
    this.intensity = 13;   // Number of points per frame

    this.draw = function() {
        if (mouseIsPressed) {
            stroke(colourP.selectedColour);
            strokeWeight(1); // Always use single pixel for spray
            for (let i = 0; i < this.intensity; i++) {
                // Use polar coordinates for natural spray
                let angle = random(TWO_PI);
                let radius = random(this.size);
                let x = mouseX + radius * cos(angle);
                let y = mouseY + radius * sin(angle);
                point(x, y);
            }
        }
    };

    this.populateOptions = function() {
    select(".options").html(""); // Clear previous options

    //flex container to hold sliders side-by-side
    let container = createDiv();
    container.parent(select(".options"));
    container.style("display", "flex");
    container.style("gap", "20px");
    container.style("align-items", "center");

    // Spray Size slider.
    let sizeLabel = createP("Spray Size:");
    sizeLabel.parent(container);
    sizeLabel.style("margin", "0 5px 0 0");
    let sizeSlider = createSlider(5, 100, this.size);
    sizeSlider.parent(container);
    sizeSlider.input(() => {
        this.size = sizeSlider.value();
    });

    // Spray Intensity slider.
    let intLabel = createP("Spray Density:");
    intLabel.parent(container);
    intLabel.style("margin", "0 5px 0 10px");
    let intSlider = createSlider(1, 50, this.intensity);
    intSlider.parent(container);
    intSlider.input(() => {
        this.intensity = intSlider.value();
    });
};

}
