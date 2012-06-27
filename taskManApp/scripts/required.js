/**

* @author admin

*/

function taskManLoginListener(userName, password) {
	var sessionRef = currentSession(); // Get session.
	var promoteToken = sessionRef.promoteWith("admin"); //temporarily make this session Admin level.
	
	var myUser = ds.User.find("logIn = :1", userName);
	if (myUser === null) {
		return false;
	} else {
		if (myUser.password == password) {
			
			var theGroups = [];
			switch (myUser.role) {
				case "Manager":
				theGroups = ['Admin'];
				break;
		
//				case "tech":
//				theGroups = ['tech'];
//				break;

				case "Tech":
				theGroups = ['Admin'];
				break;
			}
			
			
			return {
				ID: myUser.ID,
				name: myUser.login,
				fullName: myUser.fullName,
				belongsTo: theGroups
			}
		} else {
			return {error: 1024, errorMessage: "Invalid username or password"};
		}
	}
	
	sessionRef.unPromote(promoteToken); //put the session back to normal.
}



