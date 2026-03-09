function FloodFillTool() {
    this.icon = "assets/flood-fill-icon.png";
    this.name = "Flood Fill";
    this.started = false; // Traking the flood tool status.

    

    this.draw = function () { // draw method using here as well.
        if (mouseIsPressed && !this.started) {
            loadPixels(); // load Pixels to the canvas.

            const x = Math.floor(mouseX); // the x and y cordinates for when draw. 
            const y = Math.floor(mouseY);

            const targetColor = get(x, y);
            const fillColor = color(selectedColour); // fill the color for where you select with the selected color.

            if (!colorsMatch(targetColor, fillColor)) {
                floodFill(x, y, targetColor, fillColor);
                updatePixels(); // when you fill a shape or some where on the screen update the pixels.
            }

            this.started = true; // tracking the flood function and also stop filling when the mouse is presed for long time.
        }

        if (!mouseIsPressed) {
            this.started = false;
        }
    };

    // Optimizing the flood fill.
    function floodFill(x, y, targetColor, fillColor) {
        const stack = [[x, y]]; // using the x and y cordinates to stack the fill.
        const visited = new Set(); // it will keep traking to avoid overduing to avoid error.

        while (stack.length > 0) {
            const [cx, cy] = stack.pop();
            const key = `${cx},${cy}`;

            if (visited.has(key)) continue; // nodes traking skip in case that is visited.
            visited.add(key);

            if (
                cx >= 0 && cx < width &&
                cy >= 0 && cy < height
            ) {
                const currentColor = get(cx, cy);
                if (colorsMatch(currentColor, targetColor)) {
                    set(cx, cy, fillColor);
                    // flood fill pixel traking.
                    stack.push([cx + 1, cy]);
                    stack.push([cx - 1, cy]);
                    stack.push([cx, cy + 1]);
                    stack.push([cx, cy - 1]);
                }
            }
        }
    }

    // color match function to check if colors already match.
    function colorsMatch(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
    }
}
