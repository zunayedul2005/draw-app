var Starobj;
function StarTrail() {
    this.icon = "assets/Star.jpg";
    this.name = "Star Traail tool";

    this.StarSize = 5; // initial start trail tool, size.
    this.ArrayOfStars = []; // empty array to store the stars.
    this.StarColor = "orange"; // the initial start color of the star.

    this.draw = function () { // draw method calling.
        if (mouseIsPressed) {
            
            this.ArrayOfStars.push({ // pushing the array of stars to the mouse x,mouse y alpha and star size.
            X_axis : mouseX,
            Y_axis : mouseY,
            size : this.StarSize,
            colour: this.StarColor,
            alpha: 255,
            
        })
    }

    // looping on the start Array from the decreasing till j>= 0.
    for(let j = this.ArrayOfStars.length - 1; j>= 0; j--) {
        Starobj = this.ArrayOfStars[j];
        var colorPick = color(Starobj.colour); // pointing to the colorpicker.
        colorPick.setAlpha(Starobj.alpha);
        fill(colorPick); // fill getting the color from the color picker.
        noStroke();
        this.drawingStartshape(Starobj.X_axis, Starobj.Y_axis, Starobj.size, Starobj.size / 2);
        Starobj.alpha -=10;
        if (Starobj.alpha <= 0) {
            this.ArrayOfStars.splice(j, 1);
        }
    }

    // maths calculation for sin anf cos of the Star trail tool.
    this.drawingStartshape = function (X_axis, Y_axis, r1, r2) {
        let dir = TWO_PI / 5;
        let tetha = dir / 2;
        beginShape();
        for (let i = 0; i<TWO_PI; i +=dir) {
            let cosx = X_axis + cos(i) * r2;
            let siny = Y_axis + sin(i) * r2;
            vertex(cosx,siny);
            cosx = X_axis + cos(i + tetha) * r1;
            siny = Y_axis + sin(i + tetha) * r1;
            vertex(cosx,siny); // using vertex for cosx and siny.

        }
        endShape(CLOSE);// end of the shape.
    }

    this.populateOptions = function () {
        select(".options").html("");

        // label for the shape size.
        let label = createP("ChangeSize");
        label.parent(select(".options"));

        //slider for the shape size.
        this.ShapeSize = createSlider(5, 100, this.StarSize);
        this.ShapeSize.parent(select(".options"));
        let difSize = function () {
            this.StarSize = this.ShapeSize.value();
        }.bind(this);
        this.ShapeSize.input(difSize);

        // creating the Div for the color picker.
        let Hor = createDiv();
        Hor.style("display", "flex");
        Hor.style("align-items: center");
        Hor.parent(select(".options"));

        // the label for color picker with small indentation.
        let label2 = createP("Color change");
        label2.style("margin", " 0 10px 0 0");
        label2.parent(Hor);

        // creating the color picker.
        this.ShapeColor = createColorPicker(this.StarColor);
        this.ShapeColor.parent(Hor);
        let moreColor = function () {
            this.StarColor = this.ShapeColor.value();
        }.bind(this);
        this.ShapeColor.input(moreColor);

        this.toolNotselected = function () {
            select(".options").html("");
        }
    }
  }
}