function HelperFunctions() {

	this.undofunc = [];

	this.saveState = function () {
		let state = get();
		this.undofunc.push(state);
		console.log("State saved. Stack length:", this.undofunc.length);
	}

	this.undo = function () {
		console.log("Unduo called.Stack length before po:", this.undofunc.length);
		if(this.undofunc.length > 0) {
			var oldstatus = this.undofunc.pop();
			image(oldstatus, 0, 0);
			loadPixels();
			console.log("Undo performed. Stack length after pop:", this.undofunc.length);

		} else {
			console.log("Undo Stack empty");
		}
	}

	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		//???
		clear();
		background(255,255,255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
		//???
	});

	// function to create the insert or load image button.
	select("#loadImage").mouseClicked(function () {
		let imagefile = createFileInput(function (file) {
			if (file.type === "image") {
				loadImage(file.data, function (img) {
					insertImage = img;
					image(insertImage, 0, 0, width, height);
					loadPixels();
					if (helpers && helpers.saveState) {
						helpers.saveState();
					}
				});
			} else {
				alert("Upload an Image");
			}
		});
	
		imagefile.hide();
		imagefile.elt.accept = "image/*";
		imagefile.elt.click();
	}); 

	// function to create the PDF button in the canvas when you click on it it will save the canvas as a pdf file.
	// for this function I add a jsPDF library in the HTML.
	select("#PDFbutton").mouseClicked(function (){
		let Canvas = document.querySelector("Canvas");
		let imageBuffer = Canvas.toDataURL("image/jpeg", 1.0);
		
		let { jsPDF} = window.jspdf;
		let pdf = new jsPDF({
			orientation: "landscape",
			unit: "px",
			format: [Canvas.width, Canvas.height]
		})

		pdf.addImage(imageBuffer, "jpeg", 0,0, Canvas.Width, canvas.Height);
		pdf.save("Save.pdf"); // save the canvas as pdf with this name.
	})
}	