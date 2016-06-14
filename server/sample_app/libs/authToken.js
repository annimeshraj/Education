(function (authToken) {
	var jwt = require('jwt-simple');
    var jwtSecretKey = 'eyJ0eXAiOiJKV1QiLCJhbGci';
	
	authToken.getDetailsByAuthToken = function(authToken){
		data = jwt.decode(authToken, jwtSecretKey);
		if (data['expireDate'])
			return {userId: data['userId'], expireDate: data['expireDate']};
		else
			return {userId: data['userId'], signupDate: data['signupDate']};
	}
	authToken.setAuthToken = function(response){
		console.log(response.Data)
        current_date = new Date();
        expired_date = current_date.setFullYear(current_date.getFullYear() + 10);
        var user_hash_data = {expireDate: expired_date,userId: response.Data['userId']};
        response.Data['authToken'] = jwt.encode(user_hash_data, jwtSecretKey);
    }   
})(module.exports);