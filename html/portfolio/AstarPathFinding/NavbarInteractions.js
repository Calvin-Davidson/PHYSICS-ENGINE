let selectedAlgorithm;

/** The A-star button in the algorithm selector */
document.getElementById("algorithmSelectorAstar").addEventListener("click", function (e) {
    selectedAlgorithm = "A-star";
    console.log("a-star selected");
    document.title = "A-star selected";
})

/** The start button. The selected algorithm will be used */
document.getElementById("actualStartButton").addEventListener("click", function (e) {
    console.log("Starting pathfinding with: " + selectedAlgorithm)
});