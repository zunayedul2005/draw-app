function TextTool() {
    this.name = "Text";
    this.icon = "assets/textTool.png";

    // variable inputBox and other variable to create the color picker for the text writing.
    let inputBox = null, confirmBtn = null, cancelBtn = null, colorPicker = null;
    // the input checking flag to check the input status.
    let inputActive = false, textX = 0, textY = 0, fontSize = 24;

    // used to change the height and width if the layout change.
    const sidebarWidth = 70;
    const headerHeight = 35;
    const optionsBarHeight = 160;
// function for the cnavas or screen performance.
function getCanvasperformance() {
    if( typeof canvas !== "unedefined" && canvas.elt)
        return canvas.elt;
    if(typeof c !== "undefined" && c.elt) 
        return c.elt;
}

    // this function allow text writing in case that you only click any part inside of the canvas.
    function isClickOnCanvasArea(mx, my) {
        let rect = c.elt.getBoundingClientRect();
        let relY = my - rect.top;
        let relX = mx - rect.left;
        return (
            relX > sidebarWidth &&
            relY > headerHeight &&
            relY < height - optionsBarHeight
        );
    }

    this.mousePressed = function () {
        // create the textBox to write by clicking on the canvas.
        if (!inputActive && isClickOnCanvasArea(mouseX + window.scrollX, mouseY + window.scrollY)) {
            textX = mouseX;
            textY = mouseY;

            // If click is too low would overlap options so it will  shift up the box.
            if (height - textY < optionsBarHeight + 30) {
                textY = height - optionsBarHeight - 30;
            }

            // If click is too far left would overlap sidebar it will shift box to the right.
            if (textX < sidebarWidth + 10) {
                textX = sidebarWidth + 10;
            }

            // If click is very high this could overlap  our header shifting the box down.
            if (textY < headerHeight + 10) {
                textY = headerHeight + 10;
            }

            // this one is to create the textBox after when we click the canvas.
            inputBox = createElement('textarea', '');
            // this position the writing text to the left of the text box.
            inputBox.position(c.elt.offsetLeft + textX, c.elt.offsetTop + textY);
            inputBox.size(150, fontSize * 2); // this is for the text size.
            inputBox.elt.style.resize = "both"; // this is for resizing the text box.
            inputBox.elt.style.fontSize = fontSize + "px";
            inputBox.elt.focus();
            inputBox.elt.select();

            // this one create the color picker which by using you can change the color of the text.
            colorPicker = createColorPicker(selectedColor || "#000000");
            colorPicker.position(inputBox.x + inputBox.width + 10, inputBox.y);

            // this is the confirm button that when you write your text and choose the color by clicking on it the text will be stay on the canvas.
            confirmBtn = createButton('✔️');
            confirmBtn.position(colorPicker.x + colorPicker.width + 10, inputBox.y);
            confirmBtn.elt.onclick = function(e) {
                e.stopPropagation();
                commitText();
            };

            // this is the cancelation button by clicking on it the text will not stay on the canvas.
            cancelBtn = createButton('❌');
            cancelBtn.position(confirmBtn.x + confirmBtn.width + 10, inputBox.y);
            cancelBtn.elt.onclick = function(e) {
                e.stopPropagation();
                removeInput();
            };

            inputActive = true; // the flacking input check.
        }
    };

    // function that use the color picker to give color to the text the fontsize for the size of the text.
    function commitText() {
        let typedText = inputBox.value();
        if (typedText.trim() !== "") {
            helpers.saveState();
            fill(colorPicker.value());
            noStroke();
            textSize(fontSize);
            let lines = typedText.split('\n');
            // looping between line lengths.
            for (let i = 0; i < lines.length; i++) {
                text(lines[i], textX, textY + fontSize + i * fontSize * 1.2);
            }
        }
        removeInput(); // calling the removeInput function.
    }

    // removeInput function that will remove the textBox when you click on the cross.
    function removeInput() {
        if (inputBox) inputBox.remove();
        if (colorPicker) colorPicker.remove();
        if (confirmBtn) confirmBtn.remove();
        if (cancelBtn) cancelBtn.remove();
        inputBox = null;
        colorPicker = null;
        confirmBtn = null;
        cancelBtn = null;
        inputActive = false;
    }

    this.draw = function () {}; // draw Method calling.

    // the populate function and the labels for the fonsize Slider.
    this.populateOptions = function () {
        select(".options").html(`
            <label>Font Size: </label>
            <input type="range" id="fontSizeSlider" min="10" max="72" value="${fontSize}">
        `);
        select("#fontSizeSlider").input(() => {
            fontSize = select("#fontSizeSlider").value();
            if (inputBox) inputBox.elt.style.fontSize = fontSize + "px";
        });
    };
}
