const returnClarifaiRequestOptions = (imageUrl) => {
	const PAT = "15646a891cd34cdba5e25f5b9b6f3863";
	const USER_ID = "oq5j7ugcxd3r";
	const APP_ID = "test";
	// const MODEL_ID = "face-detection";
	// const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
	const IMAGE_URL = imageUrl;

	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						url: IMAGE_URL,
					},
				},
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: "Key " + PAT,
		},
		body: raw,
	};

	return requestOptions;
};

const handleApiCall = (req, res) => {
	fetch(
		"https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
		returnClarifaiRequestOptions(req.body.input)
	)
		.then((response) => response.json())
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.status(400).json("unable to work with api"));
};

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
	handleApiCall,
};
