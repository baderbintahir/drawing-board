$(function () {

    var draw = {
        triangle: false,
        rectangle: false,
        circle: false,
        img1: false,
        img2: false,
        img3: false
    }

    var width = 3;
    var img = document.createElement("img");

    //paintingerasing or not
    var paint = false;
    //painting or erasing
    var paint_erase = "paint";
    //get the canvas and context
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    //get the canvas container
    var container = $("#canvasContainer");
    //mouse position
    var mouse = { x: 0, y: 0 };

    function selectShape(shape) {
        for (let [key, value] of Object.entries(draw)) {
            if (key == shape) {
                draw[key] = true
            } else {
                draw[key] = false
            }
        }
    }

    //draw triangle
    $("#triangle-btn").click(() => {
        selectShape("triangle")
    })

    //draw circle
    $("#circle-btn").click(() => {
        selectShape("circle")
    })

    //draw rectangle
    $("#rectangle-btn").click(() => {
        selectShape("rectangle")
    })

    //draw line
    $("#line-btn").click(() => {
        selectShape("line")
    })

    //draw img1
    $("#img1-btn").click(() => {
        selectShape("img1")
    })

    //draw img2
    $("#img2-btn").click(() => {
        selectShape("img2")
    })

    //draw img3
    $("#img3-btn").click(() => {
        selectShape("img3")
    })

    //Background 1
    $("#bg1-btn").click(() => {
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    })

    //Background 2
    $("#bg2-btn").click(() => {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    })

    //Background 3
    $("#bg3-btn").click(() => {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    })

    //click inside container
    container.mousedown(function (e) {
        paint = true;

        //mouse coordinate inside of the container
        mouse.x = e.pageX - this.offsetLeft; //distance between mouse and left border of page minus distance from the page left border to canvas

        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });

    //move the mouse while holding mouse key
    container.mousemove(function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        if (paint == true) {
            if (paint_erase == "paint") {
                // get color input
                ctx.strokeStyle = $("#paintColor").val();
                var color = $("#paintColor").val();

                //Triangle
                if (draw.triangle) {
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(mouse.x + width, mouse.y);
                    ctx.lineTo(mouse.x + (width / 2), mouse.y + width);
                    ctx.closePath();
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fillStyle = color;
                    ctx.fill();
                } else if (draw.circle) {
                    ctx.beginPath();
                    ctx.arc(mouse.x, mouse.y, width, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fillStyle = color;
                    ctx.fill();
                } else if (draw.rectangle) {
                    ctx.beginPath();
                    ctx.rect(mouse.x, mouse.y, width + 30, width + 10);
                    ctx.stroke();
                    ctx.fillStyle = color;
                    ctx.fill();
                } else if (draw.img1) {
                    img.src = "./images/drawscreen1.jpg"
                    ctx.drawImage(img, mouse.x, mouse.y, 100, 70);
                } else if (draw.img2) {
                    img.src = "./images/drawscreen2.jpg"
                    ctx.drawImage(img, mouse.x, mouse.y, 100, 70);
                } else if (draw.img3) {
                    img.src = "./images/drawscreen3.jpg"
                    ctx.drawImage(img, mouse.x, mouse.y, 100, 70);
                } else {
                    ctx.lineWidth = width;
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }
            }
            else {
                //white color
                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, width, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = "white";
                ctx.fill();
            }

        }

    });

    //mouse up-- not paintingerasing anymore
    container.mouseup(function () {
        paint = false;
    });

    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function () {
        paint = false;
    });

    //click on the reset button
    $("#reset").click(function () {
        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });

    //click on the erase button
    $("#erase").click(function () {
        if (paint_erase == "paint") {
            paint_erase = "erase";
        }
        else {
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    //change color input
    $("#paintColor").change(function () {
        $("#circle").css("background-color", $(this).val());
    });

    //change lineWidth using slider
    $("#slider").slider({
        //slider values for changing cicrle size
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            //correspond to selected line thickeness
            width = ui.value
        }
    });

});