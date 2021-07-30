function saveSignUpUser(){
	var user = {
		"FirstName": $("#signupFirstName").val(),
		"LastName": $("#signupLastName").val(),
		"DateOfBirth": $("#dateOfBirth").val(),
		"SINNumber": $("#signupSINNumber").val(),
		"NewPassword": $("#confirmPassword").val(),
		"Gender": $(
			"#signgenderType option:selected").val()
	};
	try(
		localStorage.setItem("user", JSON.stringify(user));
		alert("Saving Information");
		$.mobile.changePage("#legalNotice");
		window.location.reload();
		)
	catch(e){
		if(window.navigator.vendor ==="Google Inc."){
			if(e == DOMException.QUOTA_EXCEEDED_ERR){
				alert(
					"Error: Local Storage limit exceeds."
					);
			}
		}
		else if (e == QUOTA_EXCEEDED_ERR){
			alert("Error: Saving to local storage.");
		}

		console.log(e);
	}
}

function saveDisclaimer(){
	localStorage.setItem("agreedToLegal", "true");
	$.mobile.changePage("#pageMenu");
	window.location.reload();
}

//if the password matches
if (document.getElementById("passcode").value === password && document.getElementById("username").value === userName )
{
    //if not agreed yet
    if (localStorage.getItem("agreedToLegal") === null) 
    {
    	$("#btnEnter").attr("href","#legalNotice").button();
    } 
    else if (localStorage.getItem("agreedToLegal") === "true") 
    {
    	$("#btnEnter").attr("href","#pageMenu").button();
    }
    else {
        alert("Incorrect username/password, please try again.");
    }
}

// Removes all record data from localStorage 
$("#btnClearHistory").click(function () {
	localStorage.removeItem("tbRecords");
	listRecords();
	alert("All records have been deleted.");
});

/* The value of the Submit Record button is used
 * to determine which operation should be
 * performed
 */
 $("#btnAddRecord").click(function () {
  /*.button("refresh") function forces jQuery
   * Mobile to refresh the text on the button
   */
   $("#btnSubmitRecord").val("Add").button(
   	"refresh");
});

function checkAddOrEditRecord() {
 	var formOperation = $("#btnSubmitRecord").val();

 	if (formOperation == "Add Expense") {
 		addRecord();
 		$.mobile.changePage("#pageRecords");
 	} else if (formOperation == "Update Expense") {
 		editRecord($("#btnSubmitRecord").attr("indexToEdit"));
 		$.mobile.changePage("#pageRecords");
 		$("#btnSubmitRecord").removeAttr("indexToEdit");
 	}
/*Must return false, or else submitting form
* results in reloading the page
*/
return false;
}

function drawAdviceCanvas(ctx, expense) {
	ctx.font = "22px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Your current expense is " + expense +  ".", 25, 320);

	ctx.fillText(
		"Your target Expense range is: 50-100CAD",  25, 350);
	levelwrite(ctx, expense);
	levelMeter(ctx, expense);
}

//For deciding what to write for given values
function levelwrite(ctx, expense) {
	if ((expense >= 1) && (expense <= 10)) {
		writeAdvice(ctx, "green");
	} else if ((expense > 10) && (expense <= 50)) {
		writeAdvice(ctx, "yellow");
	} else {
		writeAdvice(ctx, "red");
	}
}

function writeAdvice(ctx, level) {
	var adviceLine1 = "";
	var adviceLine2 = "";

	if (level == "red") {
		adviceLine1 = "Please take care of the Expenses.";
		adviceLine2 = "Its exceedingly more than set limit.";
	} else if (level == "yellow") {
		adviceLine1 = "The expenses needs to be checked!!";
	} else if (level = "green") {
		adviceLine1 =
		"Your expenses are on track .";
	}
	ctx.fillText("Your Expense is " + level +
		".", 25, 380);
	ctx.fillText(adviceLine1, 25, 410);
	ctx.fillText(adviceLine2, 25, 440);
}

function levelMeter(ctx, expense) {
	if (expense <= 100) {
		var cg = new RGraph.CornerGauge(
			"AdviceCanvas", 0, 100, expense)
		.Set("chart.colors.ranges", [
			[50, 100, "red"],
			[10, 50, "yellow"],
			[1, 10, "#0f0"]
			]);
	} else {
		var cg = new RGraph.CornerGauge(
			"AdviceCanvas", 0, expense, expense)
		.Set("chart.colors.ranges", [
			[50, 100, "red"],
			[10, 50, "yellow"],
			[0.01, 0.1, "#0f0"],
			[100.01, expense, "red"]
			]);
	}
	drawMeter(cg);
}

// Meter properties
function drawMeter(g) {
	g.Set("chart.value.text.units.post", " CAD")
	.Set("chart.value.text.boxed", false)
	.Set("chart.value.text.size", 14)
	.Set("chart.value.text.font", "Verdana")
	.Set("chart.value.text.bold", true)
	.Set("chart.value.text.decimals", 2)
	.Set("chart.shadow.offsetx", 5)
	.Set("chart.shadow.offsety", 5)
	.Set("chart.scale.decimals", 2)
	.Set("chart.title", "Expense Limit")
	.Set("chart.radius", 250)
	.Set("chart.centerx", 50)
	.Set("chart.centery", 250)
	.Draw();
}

function drawLines(ExpenseArr, expenseUpper, expenseLower, Datearr) {
	var expenseLine = new RGraph.Line("GraphCanvas", ExpenseArr, 0, 0)
	.Set("labels", Datearr)
	.Set("colors", ["blue"])
	.Set("shadow", true)
	.Set("shadow.offsetx", 1)
	.Set("shadow.offsety", 1)
	.Set("linewidth", 1)
	.Set("numxticks", 6)
	.Set("scale.decimals", 2)
	.Set("xaxispos", "bottom")
	.Set("gutter.left", 40)
	.Set("tickmarks", "filledcircle")
	.Set("ticksize", 5)
	.Set("chart.labels.ingraph", [, , ["Amount",
		"blue", "yellow", 1, 80
		], , ])
	.Set("chart.title", "ExpenseAmount")
	.Draw();
}


