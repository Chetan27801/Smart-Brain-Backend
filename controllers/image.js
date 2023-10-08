

// const handleApiCall = (req, res) => {
// 	fetch(
// 		"https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
// 		returnClarifaiRequestOptions(req.body.input)
// 	)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			res.json(data);
// 		})
// 		.catch((err) => res.status(400).json("unable to work with api"));
// };

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then((entries) => {
			res.json(entries[0].entries);
		})
		.catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
	handleImage,
};
