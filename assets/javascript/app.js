// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBXAU2tAbc0SQBU9pIDiAry2Fb58jza5Sg",
    authDomain: "train-scheduler83017.firebaseapp.com",
    databaseURL: "https://train-scheduler83017.firebaseio.com",
    projectId: "train-scheduler83017",
    storageBucket: "train-scheduler83017.appspot.com",
    messagingSenderId: "680016810506"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Submit button to add train
  $("#add-train-btn").click(function() {

// Get user input
  var trainName = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim()); 
  var freq = $("#frequency-input").val().trim();

// Create local "temporary" object for holding train data
  var newTrain = {
  	name: trainName,
  	destination: dest,
  	first: firstTrain,
  	frequency: freq
  };

// Push train data to database
  database.ref().push(newTrain);

// Alert that train was added
  alert("Train added successfully");

// Clear input text
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding train to datbase and a row in the html when a user adds an entry 
  database.ref().on("child_added", function(childSnapshot) {

// Grab the data
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var freq = childSnapshot.val().frequency;

  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(10, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var timeRemainder = diffTime % freq;
  var minutesAway = freq - timeRemainder;
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
  
// Train info
  console.log(trainName);
  console.log(dest);
  console.log(firstTrain);
  console.log(freq);

  console.log(firstTimeConverted);
  console.log(moment(currentTime).format("hh:mm"));
  console.log(diffTime);
  console.log(timeRemainder);
  console.log(minutesAway);
  console.log(moment(nextArrival).format("hh:mm"));

// Append train info to table on page
  var newElement = $("<tr/>").attr("data-name", trainName);
	  newElement.append($("<td/> ").text(trainName));
	  newElement.append($("<td/> ").text(dest));
	  newElement.append($("<td/> ").text(freq));
	  newElement.append($("<td/> ").text(minutesAway)); 
	  newElement.append($("<td/> ").text(nextArrival));
	  $(".table").append(newElement);

  });

