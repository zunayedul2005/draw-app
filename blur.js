function Blur() {
    this.icon = "assets/blur.jpg";
    this.name = "newblurtool";
    this.Size = 30; // initial blur size effect.

    this.draw = function () { // the same drawing function in the sketch file that we have here we are calling the function draw again.
        if (
            mouseIsPressed &&
            mouseX >= 0 && mouseX < width &&
            mouseY >= 0 && mouseY < height
        ) {
            loadPixels(); // loading the pixels on the canvas or screen.
            let OrgPix = pixels.slice();
            let density = pixelDensity();

            // here we are looping between the canvas cordinates.
            for (let i = -this.Size; i <= this.Size; i++) {
                for (let j = -this.Size; j <= this.Size; j++) {
                    let xCanvasCordinates = Math.floor(mouseX + i);
                    let yCanvasCordinates = Math.floor(mouseY + j);

                    if (xCanvasCordinates > 0 && xCanvasCordinates < width - 1 && yCanvasCordinates > 0 && yCanvasCordinates < height - 1) {
                        let redChanel = 0, greenChanel = 0, blueChanel = 0, num = 0;

                        // here we are looping between our n columns and n rows.
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                let ncol = xCanvasCordinates + i;
                                let nrow = yCanvasCordinates + j;
                                if (ncol >= 0 && ncol < width && nrow >= 0 && nrow < height) {
                                    // nested loop to loop between our pixels
                                    for (let i = 0; i < density; i++) {
                                        for (let j = 0; j < density; j++) {
                                            // formula to calculate index pixels of the array for RGBA channels.
                                            let pixel_index = 4 * ((nrow * density + j) * width * density + (ncol * density + i));
                                            // manipulating pixels arrays for red,green and blue channel.
                                            redChanel += OrgPix[pixel_index];
                                            greenChanel += OrgPix[pixel_index + 1];
                                            blueChanel += OrgPix[pixel_index + 2];
                                            num++;
                                        }
                                    }
                                }
                            }
                        }

                        // looping between array pixels.
                        for (let i = 0; i < density; i++) {
                            for (let j = 0; j < density; j++) {
                                // formula to calculate index pixels of the array for RGBA channels.
                                let pixel_index = 4 * ((yCanvasCordinates * density + j) * width * density + (xCanvasCordinates * density + i));
                                // manipulating pixels arrays for red,green and blue channel.
                                pixels[pixel_index]     = redChanel / num;
                                pixels[pixel_index + 1] = greenChanel / num;
                                pixels[pixel_index + 2] = blueChanel / num;
                            }
                        }
                    }
                }
            }
            updatePixels(); // updating canvas pixels.
        }
    }
}
