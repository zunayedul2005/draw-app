// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;
let mouseXpos; // added to can point them to the mouseX function in p5js.
let mouseYpos; // added to can point them to the mouseY function in p5js.
let mouseXpos2; // added to can point them to the mouseX function in p5js.
let mouseYpos2;	// added to can point them to the mouseY function in p5js.
let selectedColor;
var c; 


function setup() {
	
	selectedColour = color(0, 0, 0);

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
		 c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");
	

let screenPerformance = c.elt.getContext('2d',  {willReadFrequently: true});
c.elt.getContext = () => screenPerformance; 
let ctx = c.elt.getContext('2d', { willReadFrequently: true});
	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new EraserTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new Newrectellipse());
	toolbox.addTool(new Stamp());
	toolbox.addTool(new StarTrail());
	toolbox.addTool(new FloodFillTool());
	toolbox.addTool(new Blur());
	toolbox.addTool(new SpirographTool());
	toolbox.addTool(new TextTool());
	
	background(255);
	
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}
 // the resize canvas function for when the size of the canvas change.
function windowResized() {
	// creating the container and selecting it.
    canvasContainer = select('#content');
	// this resize the canvas when want to match it with the container´s dimension.
    resizeCanvas(canvasContainer.size().width, canvasContainer.size().height);

    // Cleat the Stack
    if (helpers && helpers.undofunc) {
        helpers.undofunc = [];
    }
}
// mouse presed function for when we press it. 
function mousePressed() {
	mouseXpos = mouseX;
	mouseYpos = mouseY;
	mouseXpos2 = mouseX;
	mouseYpos2 = mouseY;
	helpers.saveState();
	if (toolbox.selectedTool && typeof toolbox.selectedTool.mousePressed === "function") {
        //helpers.saveState(); // Save canvas state globally before any tool action.
        toolbox.selectedTool.mousePressed();
    }
}
// it will activate the mouse drag method when we have a tool that it will work by drageen.
function mouseDragged() {
	mouseXpos = mouseX;
	mouseYpos = mouseY;
	mouseXpos2 = mouseX;
	mouseYpos2 = mouseY;
	// call mouseDragged when the tool has custom drag method.
	if (toolbox.selectedTool && typeof toolbox.selectedTool.mouseDragged === "function") {
        toolbox.selectedTool.mouseDragged();
    }
}
