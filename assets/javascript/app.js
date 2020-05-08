var firebaseConfig = {
    apiKey: "AIzaSyDbbIBO00qMGEOkpEcoOhAGfMhzFwKZ-Vg",
    authDomain: "train-schedulerdb.firebaseapp.com",
    databaseURL: "https://train-schedulerdb.firebaseio.com",
    projectId: "train-schedulerdb",
    storageBucket: "train-schedulerdb.appspot.com",
    messagingSenderId: "544960670154",
    appId: "1:544960670154:web:74d69d665669e905cbc733"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function newRow(trainName, trainDest, trainFreq, trainTime) {
    var momentObject = moment(trainTime, "HH:mm").subtract(1, "days");
    var diffTime = moment().diff(momentObject, "minutes");
    var tRemainder = diffTime % trainFreq;

    var tMinutesTillTrain = trainFreq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(moment(nextTrain).format("LT")),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#current-trains").append(newRow);
}

newRow("Trenton Express", "Trenton", 30, "06:00");
newRow("Boston Bus", "Boston", 65, "07:15");

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = parseInt($("#frequency").val().trim());

    if (!moment($("#first-train").val().trim(), "HH:mm").isValid() || isNaN(frequency) || trainName === "" || destination === "") {
        alert("The one of the pieces of information entered into the text boxes is either missing or not valid entries.  Please enter appropriate information into each of the text boxes.");
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");
    } else {

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");
    }
});

database.ref().on("child_added", function (childSnapshot) {
    var name = childSnapshot.val().trainName;
    var dest = childSnapshot.val().destination;
    var freq = childSnapshot.val().frequency;
    var time = childSnapshot.val().firstTrain;
    newRow(name, dest, freq, time);
});
