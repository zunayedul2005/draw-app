
function Stamp() {
this.icon = "assets/stamp.png";
this.name = "Stamp-tool";


this.size = 40; // initial size of the Stamp tool.
this.stampImage = loadImage(this.icon); // loading the stamp image tool when preseed on the tool and pressed on the canvas.


this.draw = function() { //calling the draw method.
push();
stroke("blue");
strokeWeight(5);
fill(255);
if (mouseIsPressed) {
imageMode(CENTER); // center the image when click by mouse.
tint(100,this.StampTransparency); // effect used for the transparency of the stamp on the canvas.
image(this.stampImage, mouseX, mouseY, this.size, this.size);
}
pop();
}

this.StampTransparency = 100; // initial opacity for Stamp Transparency.

this.populateOptions = function() {
select(".options").html("");

// the name for the label and the size of the Stamp.
var Stamp_Size = createP("myStamp");
Stamp_Size.parent(select(".options"));

// the slider size for the Stamp size.
this.slider = createSlider(10, 100, this.size);
this.slider.parent(select(".options"));

// the name for the opacity slider it´s position.
var Trasparent = createP("Transparency");
Trasparent.position(450,1025);
Trasparent.parent(select(".options"));

// the slider size for the Stamp transparency.
this.changeTransparency = createSlider(10, 100, this.StampTransparency);
this.changeTransparency.parent(select(".options"));

// callback for the stamp transparency.
let transparencycheck = function () {
this.StampTransparency = this.changeTransparency.value();
}.bind(this);
this.changeTransparency.input(transparencycheck);

// callback for the Stamp size.
let changeSize = function () {
this.size = this.slider.value();
}.bind(this);
this.slider.input(changeSize);
}
this.toolNotselected = function () {
select(".options").html("");
}

}