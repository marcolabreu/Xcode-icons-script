/*
	Photoshop script to generate all iOS App Icon PNGs
	https://github.com/jessesquires/iOS-icons-script

	See included README and LICENSE for details.

	Modifications 
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
		   {"name": "Messages-App-Store-1024x768", "w":1024, "h":768},
	        
		   {"name": "Messages-27x20@2x", "w":54, "h":40},
		   {"name": "Messages-27x20@3x", "w":81, "h":60},
	        
		   {"name": "Messages-32x24@2x", "w":64, "h":48},
		   {"name": "Messages-32x24@3x", "w":96, "h":72},

		   {"name": "Messages-iPhone-60x45@2x", "w":120, "h":90},
		   {"name": "Messages-iPhone-60x45@3x", "w":180, "h":135},
	        
		   {"name": "Messages-iPad-67x50@2x", "w":134, "h":100},
		   {"name": "Messages-iPad-Pro-74x55@2x", "w":148, "h":110},     
		];

		//	delete metadata
		narrowImage.info = null;

		var narrowImageInitialState = narrowImage.activeHistoryState; 

		for (var i = 0; i < narrowIcons.length; i++) {
			var eachNarrowIcon = narrowIcons[i];

			narrowImage.resizeImage(eachNarrowIcon.w, eachNarrowIcon.h, null, ResampleMethod.BICUBICSHARPER);

			var destFileName = eachNarrowIcon.name + ".png";

			if (eachNarrowIcon.name == "iTunesArtwork@2x" || eachNarrowIcon.name == "iTunesArtwork") {
				// iTunesArtwork files don't have an extension
				destFileName = eachNarrowIcon.name;
			}

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
	   		{"name": "App-Store-iOS-1024", "w":1024, "h":1024},
        
	   		{"name": "iPhone-Settings-29x29@2x", "w":58, "h":58},
	   		{"name": "iPhone-Settings-29x29@3x", "w":87, "h":87},
        
	   		{"name": "iPad-Settings-29x29@2x", "w":58, "h":58},       
		];

		//	delete metadata
		squareImage.info = null;
		
		var squareImageInitialState = squareImage.activeHistoryState; 

		for (var i = 0; i < squareIcons.length; i++) {
			var eachSquareIcon = squareIcons[i];

			squareImage.resizeImage(eachSquareIcon.w, eachSquareIcon.h, null, ResampleMethod.BICUBICSHARPER);

			var destFileName = eachSquareIcon.name + ".png";

			if (eachSquareIcon.name == "iTunesArtwork@2x" || eachSquareIcon.name == "iTunesArtwork") {
				// iTunesArtwork files don't have an extension
				destFileName = eachSquareIcon.name;
			}

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

