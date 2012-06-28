
guidedModel =// @startlock
{
	User :
	{
		methods :
		{// @endlock
			addUser:function(signUpData)
			{// @lock
				// Sign Up
				if (loginByPassword(signUpData.logIn, signUpData.password)) {
					return {message: "Account already exists, please sign in."};
				} else {
					var sessionRef = currentSession(); // Get session.
					var promoteToken = sessionRef.promoteWith("Admin"); //temporarily make this session Admin level.
					var newUser =  ds.User.createEntity();  
					newUser.ID = ds.User.max("ID")  + 1;   
          			newUser.logIn = signUpData.logIn;     
          			newUser.password = signUpData.password;     
          			newUser.fullName = signUpData.fullName; 
          			newUser.phone = signUpData.phone;
          			newUser.email = signUpData.email;   
          			newUser.fax = signUpData.fax;   
          			newUser.location = signUpData.location;
          			newUser.department = signUpData.department;
          			(signUpData.role === undefined) ?newUser.role = "User":newUser.role = signUpData.role;          
          			newUser.save();     // save the entity
          			sessionRef.unPromote(promoteToken); //put the session back to normal.
          			if (loginByPassword(signUpData.logIn, signUpData.password)) {
          				return {message: "Congratulations " + signUpData.fullName + "!     Please sign in with your new account"};
          			} else {
          				return {message: "I'm sorry but we could not sign you up."};
					}
				}
			}// @startlock
		}
	}
};// @endlock
