// irrelevant html script tags
<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>

var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");

// find the name of the dinosaur that is just shorter than Stegosaurus
ref.child("stegosaurus").child("height").on("value", function(stegosaurusHeightSnapshot) {
	var favoriteDinoHeight = stegosaurusHeightSnapshot.val();

	var queryRef = ref.orderByChild("height").endAt(favoriteDinoHeight).limitToLast(2);

	queryRef.on("value", function(querySnapshot) {
	if (querySnapshot.numChildren() == 2) {
		// Data is ordered by increasing height, so we want the first entry
		querySnapshot.forEach(function(dinoSnapshot) {
	  		console.log("The dinosaur just shorter than the stegasaurus is " + dinoSnapshot.key());

	  		// Returning true means that we will only loop through the forEach() one time
	  		return true;
		});
		} else {
		console.log("The stegosaurus is the shortest dino");
		}
	});
});