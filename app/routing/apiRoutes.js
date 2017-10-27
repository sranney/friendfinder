var path = require("path");

module.exports = function(app,array){

	app.get("/api/friends",function(req,res){
		res.json(array);
	});

	app.post("/api/friends",function(req,res){
		array.push(req.body);
		console.log(array);
		if(array.length>1){
			
			var differences=[];
			
			for ( var i = 0 ; i < array.length - 1 ; i++ ){
				
				differences.push(array[array.length-1].choices.map(function(rating,indx){

					return Math.abs(rating - array[i].choices[indx]);

				}));
			
			}

			//rating here is going to be the element at 0 through 9, indx

			//array is full of all objects of users that have answered the survey
			//choices for any element of the array will be the array of their survey answers
			//so array[i].choices will be the survey answers for the ith survey taker

			//each time that a post occurs a new user is pushed into the array, so the differences between that user and the others will be taking the differences 


			var totals = [];
			differences.forEach(function(diffSet){
				totals.push(diffSet.reduce(function(total,difference){
					return total + difference;
				}));
			});
		
			var minDiff = Math.min(...totals);

			var indx = totals.indexOf(minDiff);

			var bestMatch = array[indx];

			res.json(bestMatch);


		} else {
			res.send("not enough people on site");
		}
	});


}