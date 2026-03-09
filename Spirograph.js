function SpirographTool() {
    this.icon = "assets/spirograph.png";
    this.name = "spirograph";

    let LargerCircle_Radius = 130; // initial size for large circle radius.
    let SmallerCircle_Radius = 90;// initial size for small circle radius.
    let diameterData1 = 60; // initial diameter.
    let cyclepoints = 360; // the cycle point.

    // starting position for x and y cordinates when wants to draw.
    let Xcenterdraw = 0;
    let Ycenterdraw = 0;

    // check if mouse is selected in canvas draw other wise no.
    function isMouseOnCanvas() {
        let c = select('canvas');
        if (!c) return false;
        let rect = c.elt.getBoundingClientRect();
        // cheking the mouse x and mouse y bounds on the canvas.
        return (
            mouseX >= 0 &&
            mouseY >= 0 &&
            mouseX <= rect.width &&
            mouseY <= rect.height
        );
    }

    this.populateOptions = function() {
        select(".options").html(""); 

        // Create a flex container for horizontal layout.
        let container = createDiv();
        container.parent(select(".options"));
        container.style("display", "flex");
        container.style("gap", "20px");
        container.style("align-items", "center");

        // size for large radius.
        let largeLabel = createP("Large Radius:");
        largeLabel.parent(container);
        largeLabel.style("margin", "0 5px 0 0");
        this.LargeRadius = createInput(LargerCircle_Radius.toString());
        this.LargeRadius.parent(container);
        this.LargeRadius.input(() => {
            LargerCircle_Radius = float(this.LargeRadius.value());
        });

        // size for small radius.
        let smallLabel = createP("Small Radius:");
        smallLabel.parent(container);
        smallLabel.style("margin", "0 5px 0 10px");
        this.Smallradius = createInput(SmallerCircle_Radius.toString());
        this.Smallradius.parent(container);
        this.Smallradius.input(() => {
            SmallerCircle_Radius = float(this.Smallradius.value());
        });

        // Pen movement input.
        let penLabel = createP("Pen Offset:");
        penLabel.parent(container);
        penLabel.style("margin", "0 5px 0 10px");
        this.diameterData = createInput(diameterData1.toString());
        this.diameterData.parent(container);
        this.diameterData.input(() => {
            diameterData1 = float(this.diameterData.value());
        });
    };

    this.toolNotselected = function () {
        select(".options").html("");
    };

    // Draws a spirograph at the given position when click with mouse.
    function drawSpirographAt(x, y) {
        stroke(colourP.selectedColour);
        noFill();
        beginShape();
        for (let i = 0; i < cyclepoints; i++) {
            let ShapeAngle = map(i, 0, cyclepoints, 0, TWO_PI);
            let px = (LargerCircle_Radius - SmallerCircle_Radius) * cos(ShapeAngle) +
                     diameterData1 * cos((LargerCircle_Radius - SmallerCircle_Radius) / SmallerCircle_Radius * ShapeAngle);
            let py = (LargerCircle_Radius - SmallerCircle_Radius) * sin(ShapeAngle) -
                     diameterData1 * sin((LargerCircle_Radius - SmallerCircle_Radius) / SmallerCircle_Radius * ShapeAngle);
            vertex(px + x, py + y);
        }
        endShape(CLOSE);
    }

    this.mousePressed = function() {
        if (!isMouseOnCanvas()) return; // draws when you click on canvas.
        Xcenterdraw = mouseX;
        Ycenterdraw = mouseY;
        drawSpirographAt(Xcenterdraw, Ycenterdraw);
    };

    this.mouseDragged = function() {
        // just draw the spinograhp when click by mouse not dragening.
    };

    this.draw = function() { // calling again the draw method.
    
    };
}
