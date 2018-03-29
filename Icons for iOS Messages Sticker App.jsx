/*
	Photoshop script to generate all iOS App Icon PNGs
	https://github.com/jessesquires/iOS-icons-script

	See included README and LICENSE for details.

	Modifications 
		Copyright (c) 2018 Marco L Abreu
		Copyright (c) 2014 Jesse Squires
		Copyright (c) 2012 Josh Jones

	Copyright (c) 2010 Matt Di Pasquale
*/

//	Turn debugger on
//	0 is off.
// 	$.level = 1;

var initialPrefs = app.preferences.rulerUnits;

function main() {

	app.preferences.rulerUnits = Units.PIXELS;

	//	save icons in PNG-24 using Save for Web
	var saveForWeb = new ExportOptionsSaveForWeb();
	saveForWeb.format = SaveDocumentType.PNG;
	saveForWeb.PNG8 = false;
	saveForWeb.transparency = true;

	//	prompt user to select source files, cancel only if both are null
	var narrowSourceFile = File.openDialog("Select a PNG file that is 1024x768.", "*.png", false);
	var squareSourceFile = File.openDialog("Select a 1:1 sqaure PNG file that is at least 1024x1024.", "*.png", false);

	if (narrowSourceFile == null && squareSourceFile == null)  {
		alert("At least one file must be selected.");
		return;
	}

	//	folder selection dialog
	var destFolder = Folder.selectDialog("Choose an output folder.\n*** Warning! ***\nThis will overwrite any existing files with the same name in this folder.");
	if (destFolder == null) {
		// user canceled
		restorePrefs();
		return;
	}

	if (narrowSourceFile) { 
		var narrowImage = open(narrowSourceFile, OpenDocumentType.PNG);

		if (narrowImage == null) {
			alert("Something is wrong with the file. Make sure it is a valid PNG file.");
			return;
		}

		if (narrowImage.width < 1024 || narrowImage.height < 768) {
			alert("Image failed validation. Please select a PNG file that is at least 1024x768.");
			restorePrefs();
			return;
		}
		
		var narrowIcons = [
			{"name": "2@2x-Messages-iPhone-60x45pt", "w":120, "h":90},
		  	{"name": "2@3x-Messages-iPhone-60x45pt", "w":180, "h":135},
	        
		   	{"name": "4@2x-Messages-iPad-67x50pt", "w":134, "h":100},

		   	{"name": "5@2x-Messages-iPad-Pro-74x55pt", "w":148, "h":110}, 

		   	{"name": "7@1x-Messages-App-Store-1024x768pt", "w":1024, "h":768},    
		  	
		  	{"name": "8@2x-Messages-27x20pt", "w":54, "h":40},
		  	{"name": "8@3x-Messages-27x20pt", "w":81, "h":60},
	        
		  	{"name": "9@2x-Messages-32x24pt", "w":64, "h":48},
		   	{"name": "9@3x-Messages-32x24pt", "w":96, "h":72},
		];

		//	delete metadata
		narrowImage.info = null;

		var narrowImageInitialState = narrowImage.activeHistoryState; 

		for (var i = 0; i < narrowIcons.length; i++) {
			var eachNarrowIcon = narrowIcons[i];

			narrowImage.resizeImage(eachNarrowIcon.w, eachNarrowIcon.h, null, ResampleMethod.BICUBICSHARPER);

			var destFileName = eachNarrowIcon.name + ".png";

			narrowImage.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, saveForWeb);

			// undo resize
			narrowImage.activeHistoryState = narrowImageInitialState;
		}

		narrowImage.close(SaveOptions.DONOTSAVECHANGES);
	}

	if (squareSourceFile) { 
		var squareImage = open(squareSourceFile, OpenDocumentType.PNG);
		if (squareImage == null) {
			alert("Something is wrong with the file. Make sure it is a valid PNG file.");
			return;
		}

		var squareIcons = [        
	   		{"name": "1@2x-iPhone-Settings-29x29pt", "w":58, "h":58},
	   		{"name": "1@3x-iPhone-Settings-29x29pt", "w":87, "h":87},
        
	   		{"name": "3@2x-iPad-Settings-29x29pt", "w":58, "h":58},

	   		{"name": "6@1x-App-Store-iOS-1024pt", "w":1024, "h":1024},     
		];

		//	delete metadata
		squareImage.info = null;
		
		var squareImageInitialState = squareImage.activeHistoryState; 

		for (var i = 0; i < squareIcons.length; i++) {
			var eachSquareIcon = squareIcons[i];

			squareImage.resizeImage(eachSquareIcon.w, eachSquareIcon.h, null, ResampleMethod.BICUBICSHARPER);

			var destFileName = eachSquareIcon.name + ".png";

			squareImage.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, saveForWeb);

			// undo resize
			squareImage.activeHistoryState = squareImageInitialState;
		}

		squareImage.close(SaveOptions.DONOTSAVECHANGES);
	}


	alert("Success!\nAll iOS icons created and saved!");
	
	restorePrefs();
}

function restorePrefs() {
	app.preferences.rulerUnits = initialPrefs;
}

main();

