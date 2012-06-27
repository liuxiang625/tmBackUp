
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var signInButton = {};	// @button
	var signUpButton = {};	// @button
	var textToSignIn = {};	// @richText
	var textToSIgnUp = {};	// @richText
	var introSignUpButton = {};	// @button
	var introSignInButton = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		$("#loginErrorDiv").html("");
		var loginName = $$("signInLogInField").getValue();
		var thePassword = $$("signInPasswordField").getValue();
		if (WAF.directory.loginByPassword(loginName, thePassword)) {
			$$("navigationView2").goToView(4);
			$("#signInIndicatorDiv").html( WAF.directory.currentUser().fullName);
			$$("signInLogInField").setValue("");
			$$("signInPasswordField").setValue("");	
			sources.user1.all();
			sources.user.query("fullName = :1", WAF.directory.currentUser().fullName);// set user to current		
		} else {
			//should limit times of invalid sign 
			$("#loginErrorDiv").html("Invalid login.");
		}
	};// @lock

	signUpButton.click = function signUpButton_click (event)// @startlock
	{// @endlock
		// Sign Up
			var signUpData = {
			logIn: WAF.sources.signUpObject.logIn,
			password: WAF.sources.signUpObject.password,
			fullName: WAF.sources.signUpObject.fullName,
			department: WAF.sources.signUpObject.department,
			phone: WAF.sources.signUpObject.phone,
			fax: WAF.sources.signUpObject.fax,
			email: WAF.sources.signUpObject.email,
			location: WAF.sources.signUpObject.location
							
		};
		if(signUpData.logIn === undefined | signUpData.password === undefined | signUpData.fullName === undefined ) {
			$("#signUperrDiv").html("Please fill all the required fileds");
		}
		else {
			WAF.ds.User.addUser({
				onSuccess: function(event) {
					$("#loginErrorDiv").html(event.result.message);
					$("#signUperrDiv").html(event.result.message);
					if (WAF.directory.currentUser() !== null) {
						$$("navigationView2").goToView(2);
						$$("signInLogInField").setValue("");
						$$("signInPasswordField").setValue("");	
					}
				
				},
				onError: function(error) {
					$("#signUperrDiv").html(error['error'][0].message);
				}
			}, signUpData);
		
			signUpObject.login = "";
			signUpObject.password = "";
			signUpObject.fullName = "";
			WAF.sources.signUpObject.autoDispatch();
		}
	};// @lock

	textToSignIn.click = function textToSignIn_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(2);
	};// @lock

	textToSIgnUp.click = function textToSIgnUp_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(3);
	};// @lock

	introSignUpButton.click = function introSignUpButton_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(3);
	};// @lock

	introSignInButton.click = function introSignInButton_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(2);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("signUpButton", "click", signUpButton.click, "WAF");
	WAF.addListener("textToSignIn", "click", textToSignIn.click, "WAF");
	WAF.addListener("textToSIgnUp", "click", textToSIgnUp.click, "WAF");
	WAF.addListener("introSignUpButton", "click", introSignUpButton.click, "WAF");
	WAF.addListener("introSignInButton", "click", introSignInButton.click, "WAF");
// @endregion
};// @endlock
