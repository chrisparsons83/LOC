/* JavaScript for additional functionality of NCBP POS layout 
Chris Hansen NCBP -- 2015-05-20 */

var ncbp_pos = (function () {
    var version = "1.0.0";

    // Return version info
    function getVersion() {
        alert("NCBP POS JavaScript version " + version + "\nCopyright 2015 North Country Business Products");
    }
    // Sends commands to SMS pos.
    function goUrl(sUrl) {
        document.location = 'Http://localhost/Scripts/trs.exe?' + sUrl;
    }

    // Check security level of logged in user for access to NCBP menu.
    function securePage(iLevel) {
        if (iLevel < 7) {
            goUrl("FCT=99901&amp;MSG=!NOT_AUTHORIZED")
        }
    }

    // Full alpha numeric on screen keyboard.
    function keyboard() {

        // Array of key objects to place the keys for the keyboard on the display.
        var keyboard = [{ key: "1", size: "60x60", style: "LEFT: 5px; TOP: 5px" },
            { key: "2", size: "60x60", style: "LEFT: 65px; TOP: 5px" },
            { key: "3", size: "60x60", style: "LEFT: 125px; TOP: 5px" },
            { key: "4", size: "60x60", style: "LEFT: 185px; TOP: 5px" },
            { key: "5", size: "60x60", style: "LEFT: 245px; TOP: 5px" },
            { key: "6", size: "60x60", style: "LEFT: 305px; TOP: 5px" },
            { key: "7", size: "60x60", style: "LEFT: 365px; TOP: 5px" },
            { key: "8", size: "60x60", style: "LEFT: 425px; TOP: 5px" },
            { key: "9", size: "60x60", style: "LEFT: 485px; TOP: 5px" },
            { key: "0", size: "60x60", style: "LEFT: 545px; TOP: 5px" },
            { key: "q", size: "60x60", style: "LEFT: 5px; TOP: 65px" },
            { key: "w", size: "60x60", style: "LEFT: 65px; TOP: 65px" },
            { key: "e", size: "60x60", style: "LEFT: 125px; TOP: 65px" },
            { key: "r", size: "60x60", style: "LEFT: 185px; TOP: 65px" },
            { key: "t", size: "60x60", style: "LEFT: 245px; TOP: 65px" },
            { key: "y", size: "60x60", style: "LEFT: 305px; TOP: 65px" },
            { key: "u", size: "60x60", style: "LEFT: 365px; TOP: 65px" },
            { key: "i", size: "60x60", style: "LEFT: 425px; TOP: 65px" },
            { key: "o", size: "60x60", style: "LEFT: 485px; TOP: 65px" },
            { key: "p", size: "60x60", style: "LEFT: 545px; TOP: 65px" },
            { key: "a", size: "60x60", style: "LEFT: 35px; TOP: 125px" },
            { key: "s", size: "60x60", style: "LEFT: 95px; TOP: 125px" },
            { key: "d", size: "60x60", style: "LEFT: 155px; TOP: 125px" },
            { key: "f", size: "60x60", style: "LEFT: 215px; TOP: 125px" },
            { key: "g", size: "60x60", style: "LEFT: 275px; TOP: 125px" },
            { key: "h", size: "60x60", style: "LEFT: 335px; TOP: 125px" },
            { key: "j", size: "60x60", style: "LEFT: 395px; TOP: 125px" },
            { key: "k", size: "60x60", style: "LEFT: 455px; TOP: 125px" },
            { key: "l", size: "60x60", style: "LEFT: 515px; TOP: 125px" },
            { key: "z", size: "60x60", style: "LEFT: 95px; TOP: 185px" },
            { key: "x", size: "60x60", style: "LEFT: 155px; TOP: 185px" },
            { key: "c", size: "60x60", style: "LEFT: 215px; TOP: 185px" },
            { key: "v", size: "60x60", style: "LEFT: 275px; TOP: 185px" },
            { key: "b", size: "60x60", style: "LEFT: 335px; TOP: 185px" },
            { key: "n", size: "60x60", style: "LEFT: 395px; TOP: 185px" },
            { key: "m", size: "60x60", style: "LEFT: 455px; TOP: 185px" },
            { key: ",", size: "60x60", style: "LEFT: 35px; TOP: 245px" },
            { key: ".", size: "60x60", style: "LEFT: 455px; TOP: 245px" },
            { key: "?", size: "60x60", style: "LEFT: 515px; TOP: 245px" },
            { key: "Shift", size: "90x60", style: "LEFT: 5px; TOP: 185px" },
            { key: "Backspace", size: "90x60", style: "LEFT: 515px; TOP: 185px; WIDTH: 95px" },
            { key: " ", size: "60x60", style: " width: 358px; LEFT: 95px; TOP: 245px" }];

        // Array of key objects for the numeric keypad layout.
        var keypad = [{ key: "7", size: "80x70", style: "LEFT: 5px; TOP: 5px; font-size: 25pt" },
            { key: "8", size: "80x70", style: "LEFT: 85px; TOP: 5px; font-size: 25pt" },
            { key: "9", size: "80x70", style: "LEFT: 165px; TOP: 5px; font-size: 25pt" },
            { key: "4", size: "80x70", style: "LEFT: 5px; TOP: 75px; font-size: 25pt" },
            { key: "5", size: "80x70", style: "LEFT: 85px; TOP: 75px; font-size: 25pt" },
            { key: "6", size: "80x70", style: "LEFT: 165px; TOP: 75px; font-size: 25pt" },
            { key: "1", size: "80x70", style: "LEFT: 5px; TOP: 145px; font-size: 25pt" },
            { key: "2", size: "80x70", style: "LEFT: 85px; TOP: 145px; font-size: 25pt" },
            { key: "3", size: "80x70", style: "LEFT: 165px; TOP: 145px; font-size: 25pt" },
            { key: "0", size: "160x70", style: "LEFT: 5px; TOP: 215px; font-size: 25pt" },
            { key: ".", size: "80x70", style: "LEFT: 165px; TOP: 215px; font-size: 25pt" }];
        
        var bShift = false;
        var oFocus;

        // Function to place the keyboard on the html page
        this.draw = function (type) {
            var sHtml = "";

            if (type && type == 'keypad') {
                keys = keypad;
            } else {
                keys = keyboard;
            }

            for (x in keys) {
                sHtml += "<div class=\"PosBtn DarkGray Size" + keys[x].size + "\" id=\"" + keys[x].key + "\" style=\"position: absolute; padding-top: 15px; " + keys[x].style + "\"" +
                    "onmouseup=\"ncbp_pos.keyboard.keyPress(this.innerHTML)\">" + keys[x].key + "</div>";
            }

            document.getElementById("keyboard").innerHTML = sHtml;
        }

        // sets the text field has focus
        this.setFocus = function (oElement) {
            oFocus = oElement;
            oFocus.focus();

            if (oFocus.value.length === 0 && !bShift) {
                shift();
            }
        }

        // function to handle the key presses.
        this.keyPress = function (sKeyValue) {
            if (sKeyValue === "Shift") {
                shift();
            } else if (sKeyValue === "Backspace") {
                backspace();
            } else {
                oFocus.value += sKeyValue;
                if (bShift) {
                    shift();
                }
            }

            oFocus.focus();
        }

        // function to handle the shift key
        var shift = function () {
            if (bShift) {
                bShift = false;
            } else {
                bShift = true;
            }

            for (x in keys) {
                if (bShift && keys[x].key !== "Shift" && keys[x].key !== "Backspace") {
                    document.getElementById(keys[x].key).innerHTML = keys[x].key.toUpperCase();
                } else if (keys[x].key !== "Shift" && keys[x].key !== "Backspace") {
                    document.getElementById(keys[x].key).innerHTML = keys[x].key.toLowerCase();
                }
            }
        }

        // function to handle the backspace key
        var backspace = function () {
            oFocus.value = oFocus.value.substring(0, oFocus.value.length - 1);
        }

        // function to handle the clear key
        this.clear = function () {
            oFocus.value = "";
        }
    }

    // URI parser to get the computer name from a UNC path
    function parseUri(sUri) {
        var uri = document.createElement("a");
        uri.href = sUri;
        return uri.hostname;
    }

    // Fucntion to send messages from the terminal messaging window.
    function sendMessage() {
        var message = document.getElementById("message").value;
        var terminals = document.getElementsByName("terSelection");
        var uncPath;
        var terminalComputerName
        for (i = 0; i < terminals.length; i++) {
            if (terminals[i].checked) {
                uncPath = terminals[i].value;
                break;
            }
        }

        if (uncPath === "*") {
            terminalComputerName = "*";
        } else {
            terminalComputerName = parseUri(uncPath);
        }

        goUrl("SQI=TRS_POS_NCBP_MSG_SEND&COMP_SEND=" + terminalComputerName + "&MESSAGE='+" + message + "'&BTN=CLOSE");
    }

    // Dynamic button screens
    function dynamicBtn() {
        var iMax = 27;
        var iStart = 0;
        var iBtnPrev;
        var iBtnNext;
        var itmArray = [];
        var fontSize;
        var sColor = "LightBlue";
        var sClose = "HOOKUSR=MAIN";

        /* Add the results from the SMS @DBTABLE command to the object array */
        this.addItm = function (sDescription, sAlpha) {
            itmArray.push({ DESC: sDescription, ALPHA: sAlpha });
        }

        /* Create the HTML for the buttons and populate the screen */
        this.createBtn = function (iBtnStart, iBtnMax, sBtnColor, sBtnClose) {
            var sBtnInnerHtml = '';
            var sNavBtnInnerHtml = '';

            if (iBtnStart) {
                iStart = iBtnStart;
            } else {
                iStart = 0;
            }

            if (iBtnMax) {
                iMax = iBtnMax;
            }

            if (sBtnColor) {
                sColor = sBtnColor;
            }

            if (sBtnClose) {
                sClose = sBtnClose;
            }

            if (iStart === 0) {
                iBtnPrev = 0;
            } else {
                iBtnPrev = iStart - iMax;
            }

            sNavBtnInnerHtml += '<div id="outer"><div id="middle"><div id="inner" class="PosBtn LightRed Size120x70" style="margin: 5px 0px 0px 2px" onmouseup="ncbp_pos.dynamicBtn.createBtn(' + iBtnPrev + ')">Previous</div></div></div> ';
			
			if(itmArray.length === 0) {
				sBtnInnerHtml = "<h1>Nothing to display!</h1>";
			} else {
				for (i = 0; i < iMax; i++) {
					if (itmArray[iStart].DESC.length > 15) {
						fontSize = 9;
					} else {
						fontSize = 10;
					}

					sBtnInnerHtml += '<div id="outer"><div id="middle"><div id="inner" class="PosBtn ' + sColor + ' Size120x70"  style="margin: 5px 0px 0px 2px; font-size: ' + fontSize + 'pt; padding: 3px;" onmouseup="ncbp_pos.goUrl(\'' +
						itmArray[iStart].ALPHA + '&amp;' + sClose + '\')">' + itmArray[iStart].DESC + '</div></div></div> ';

					iStart++

					if (iStart === itmArray.length) { break; }
				}
			}

            if (iStart === itmArray.length) {
                iBtnNext = 0;
            } else {
                iBtnNext = iStart;
            }

            sNavBtnInnerHtml += '<div id="outer"><div id="middle"><div id="inner" class="PosBtn LightRed Size120x70" style="margin: 5px 0px 0px 2px;"onmouseup="ncbp_pos.dynamicBtn.createBtn(' + iBtnNext + ')">Next</div></div></div> ';

            if (sClose === 'HOOKUSR=MAIN') {
                sCloseButton = 'htm=btn_main';
            } else {
                sCloseButton = 'FCT=30&amp;btn=close';
            }

            sNavBtnInnerHtml += '<div id="outer"><div id="middle"><div id="inner" class="PosBtn Orange Size120x70" style="margin: 5px 0px 0px 2px;"onmouseup="ncbp_pos.goUrl(\'' + sCloseButton + '\')">Close</div></div></div>';

            document.getElementById('Btn').innerHTML = sBtnInnerHtml;

            if (document.getElementById('NavBtn') !== null) {
                document.getElementById('NavBtn').innerHTML = sNavBtnInnerHtml;
            }
        }
    }

    // SCO Advertising
    function scoAdvertising() {
        var images = [];
        var i = 0;

        this.switchAd = function () {
            document.advertising.src = images[i];
            if (i < images.length - 1) {
                i++;
            } else {
                i = 0;
            }
        }

        this.addImage = function (sImage) {
            images.push("../../bitmaps/" + sImage);
        }
    }

    return {
        getVersion: getVersion,
        goUrl: goUrl,
        securePage: securePage,
        keyboard: new keyboard(),
        parseUri: parseUri,
        sendMessage: sendMessage,
        dynamicBtn: new dynamicBtn(),
        scoAdvertising: new scoAdvertising()
    }
}());