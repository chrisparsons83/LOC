// Custom Functionality for LOC SMS for PCC Community Markets
// For internal PCC Community Markets use ONLY
// Created by Kjell Breiland


// pcc function serves as the main method of accessing custom PCC functions
var pcc = (function () {

	// dynaFrame is a dynamic Frame to mimic ACS-IR functionality by keeping the
	// working area within the main sales screen and not opening a new overlay screen
	function dynaFrame() {

		var btnArray = [];

		// @DBTABLE will fill in this array
		this.eachItm = function (desc, func) {
			btnArray.push({DESC: desc, FUNC: func});
		}

		// createButtons dynamically creates the buttons of the dynaframe
		// the width is not the actual width of each button but the number of buttons wide, same with height
		// a zero in either and the system will use a 1x9 (9 high with next/previous in row 10)
		this.createButtons = function (width, height) {
			// set the defaults
			if (width === 0) {
				width = 1
			}
			if (height === 0) {
				height = 9
			}


		}
	}


}());