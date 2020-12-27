let selectedCircle;

canvas.addEventListener("mousedown", function (e) {
    let mousePos = new Vector2d(e.clientX, e.clientY - navbarOffset);
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].pos.distanceTo(mousePos) <= circles[i].radius) {
            if (selectedCircle != null) selectedCircle.color = "black"
            circles[i].color = "green";
            selectedCircle = circles[i];
            CirclesUpdateEvent();
            return;
        }
    }
    let p = new Point(mousePos, 50);
    circles.push(p);
    if (selectedCircle != null) selectedCircle.color = "black";
    selectedCircle = p;
    selectedCircle.color = "green";
    CirclesUpdateEvent();
});


canvas.addEventListener("wheel", function (e) {
    if (selectedCircle == null) return;
    selectedCircle.radius += (event.deltaY * -0.01) * 2;
})


canvas.addEventListener("keydown", function (e) {
    console.log(e.key)
    if (e.key === "Delete" || e.key === "Backspace") {
        console.log("removing")
        for (let i = 0; i < circles.length; i++) {
            if (circles[i] === selectedCircle) {
                circles.splice(i, 1);
                console.log("removed")
                CirclesUpdateEvent();
            }
        }
    }
})