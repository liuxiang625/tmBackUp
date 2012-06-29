
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var profileSaveButton = {};	// @button
	var richText9 = {};	// @richText
	var richText8 = {};	// @richText
	var button4 = {};	// @button
	var button5 = {};	// @button
	var newTaskButton = {};	// @button
	var signUpDeptSelect = {};	// @select
	var documentEvent = {};	// @document
	var signUpConfirmPwField = {};	// @textField
	var signInButton = {};	// @button
	var signUpButton = {};	// @button
	var textToSignIn = {};	// @richText
	var textToSIgnUp = {};	// @richText
	var introSignUpButton = {};	// @button
	var introSignInButton = {};	// @button
// @endregion// @endlock
 deptArray = [];
 pririotyArray = [];
 locationArray = [];
// eventHandlers// @lock

	profileSaveButton.click = function profileSaveButton_click (event)// @startlock
	{// @endlock
		if ($$("profilePasswordField").getValue() === $$("profilePasswordConfirmField").getValue()) {
			sources.user.save({
			onSuccess: function(event) {
				$("#profileUpdateErrorDiv").html("User Profile updated.");
				WAF.sources.user.serverRefresh();
				$("#userProfileUpdateButton").attr("disabled", true);
			}, 
			onError: function(error) {
				$("#profileUpdateErrorDiv").html(error['error'][0].message);
			}
		}); 
		} else {
			$("#profileUpdateErrorDiv").html("The Passwords input twice do not match.");
		}
	};// @lock

	richText9.click = function richText9_click (event)// @startlock
	{// @endlock
		$$("navigationView2").goToView(6);
	};// @lock

	richText8.click = function richText8_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()) {
			$$("navigationView2").goToView(1);
		}
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock

		sources.task.priority = $$("newTaskPrioritySelect").sourceAtt.getValue();
		//var curUserSet = WAF.sources.user.getEntityCollection();
		WAF.sources.user.query("ID = :1", $$("newTaskUserSelect").sourceAtt.getValue());//find owner from select and query in user datasource
		WAF.sources.task.owner.set(WAF.sources.user);
		source.user.query("fullName = :1", WAF.directory.currentUser().fullName);// restore user datasource to current user
		WAF.sources.task.manager.set(WAF.sources.user);
		WAF.sources.task.save({
			onSuccess: function(event) {
				//sources.task.addEntity(sources.taskCreated.getCurrentElement()); 
				$$("navigationView2").goToView(4);
				$("#taskManageErrorDiv").html("New Task Saved.");
			},
			onError: function(error) {
				$("#taskManageErrorDiv").html(error['error'][0].message);
			}
		}); 
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		sources.task.all({
			onSuccess: function(event) {
				$$("navigationView2").goToView(4);
				$("#taskManageErrorDiv").html("Task creation canceled");
			},
			onError: function(error) {
				$("#taskCreationErrorDiv").html(error['error'][0].message);
			}
		}); 
	};// @lock

	newTaskButton.click = function newTaskButton_click (event)// @startlock
	{// @endlock
		WAF.sources.task.newEntity();
		WAF.sources.task.title = "Please give task a title.";
		WAF.sources.task.description = "Please describe the task.";
		WAF.sources.task.startDate = new Date();
		WAF.sources.task.dueDate = new Date();
		WAF.sources.task.status = "open";
		//WAF.sources.taskCreated.ID = sources.task.length  + 1;
		$$("navigationView2").goToView(5);
//		WAF.sources.task.save({
//			onSuccess: function(event) {
//				//sources.task.addEntity(sources.task.getCurrentElement());
//				$$("navigationView2").goToView(5);
//			},
//			onError: function(error) {
//				$("#taskManageErrorDiv").html(error['error'][0].message);
//			}
//		}); 
		
	};// @lock

	signUpDeptSelect.change = function signUpDeptSelect_change (event)// @startlock
	{// @endlock
		 WAF.sources.signUpObject.department = $$("signUpDeptSelect").getValue()
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//determine if their is a current user session
		if (WAF.directory.currentUser() != null) {
			
			//sources.user.query("fullName = :1", WAF.directory.currentUser().fullName);//set user to current
			$$("navigationView2").goToView(4);
			$("#signInIndicatorDiv").html( WAF.directory.currentUser().fullName);
		}
		
		locationArray = [{location: ""}, {location: "U.S."},{location: "France"}];
		sources.locationArray.sync();
		pririotyArray = [{priority: 'Low'},{priority: 'Mid'},{priority: 'High'},{priority: 'Emergency'}];
		sources.pririotyArray.sync();
		deptArray = [{deptName: ''}, {deptName: 'Tech'}, {deptName:'Management'},{deptName:'Operation'},{deptName:'Sales'},{deptName:'Marketing'}];
		sources.deptArray.sync();
	};// @lock

	signUpConfirmPwField.blur = function signUpConfirmPwField_blur (event)// @startlock
	{// @endlock
		if($$("signUpPasswordField").getValue() != $$("signUpConfirmPwField").getValue()) {
			$("#passwordConfirmErrorDiv").html("Password input twice does not match");	
		}
		else {
			$("#passwordConfirmErrorDiv").html("");	

		}
	};// @lock

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
			//sources.user1.all();
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
			location: WAF.sources.signUpObject.location,
			role: WAF.sources.signUpObject.role
							
		};
		if(!signUpData.logIn  | !signUpData.password | !signUpData.fullName | !$$("passwordConfirmErrorDiv").getValue() ) {
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
	WAF.addListener("profileSaveButton", "click", profileSaveButton.click, "WAF");
	WAF.addListener("richText9", "click", richText9.click, "WAF");
	WAF.addListener("richText8", "click", richText8.click, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
	WAF.addListener("button5", "click", button5.click, "WAF");
	WAF.addListener("newTaskButton", "click", newTaskButton.click, "WAF");
	WAF.addListener("signUpDeptSelect", "change", signUpDeptSelect.change, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("signUpConfirmPwField", "blur", signUpConfirmPwField.blur, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("signUpButton", "click", signUpButton.click, "WAF");
	WAF.addListener("textToSignIn", "click", textToSignIn.click, "WAF");
	WAF.addListener("textToSIgnUp", "click", textToSIgnUp.click, "WAF");
	WAF.addListener("introSignUpButton", "click", introSignUpButton.click, "WAF");
	WAF.addListener("introSignInButton", "click", introSignInButton.click, "WAF");
// @endregion
};// @endlock
