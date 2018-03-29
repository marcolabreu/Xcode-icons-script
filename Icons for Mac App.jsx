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
	//	prompt user to select source file, cancel returns null
	var sourceFile = File.openDialog("Select a 1:1 sqaure PNG file that is at least 1024x1024.", "*.png", false);
	if (sourceFile == null)  {
		// user canceled
		return;
	}

	var doc = open(sourceFile, OpenDocumentType.PNG);
	if (doc == null) {
		alert("Something is wrong with the file. Make sure it is a valid PNG file.");
		return;
	}

	app.preferences.rulerUnits = Units.PIXELS;

	if (doc.width != doc.height || doc.width < 1024 || doc.height < 1024) {
		alert("Image failed validation. Please select a 1:1 PNG file that is at least 1024x1024.");
		restorePrefs();
		return;
	}

	//	folder selection dialog
	var destFolder = Folder.selectDialog("Choose an output folder.\n*** Warning! ***\nThis will overwrite any existing files with the same name in this folder.");
	if (destFolder == null) {
		// user canceled
		restorePrefs();
		return;
	}

	//	save icons in PNG-24 using Save for Web
	var saveForWeb = new ExportOptionsSaveForWeb();
	saveForWeb.format = SaveDocumentType.PNG;
	saveForWeb.PNG8 = false;
	saveForWeb.transparency = true;

	//	delete metadata
	doc.info = null;

	var icons = [
		{"name": "1@1x-iPhone-Notifications-16pt", "size":16},
		{"name": "1@2x-iPhone-Notifications-16pt", "size":32},

		{"name": "2@1x-iPhone-Spotlight-Settings-32pt", "size":32},
		{"name": "2@2x-iPhone-Spotlight-Settings-32pt", "size":64},

		{"name": "3@1x-iPhone-Spotlight-128pt", "size":128},
		{"name": "3@2x-iPhone-Spotlight-128pt", "size":256},

		{"name": "4@1x-iPhone-App-iOS-256pt", "size":256},
		{"name": "4@2x-iPhone-App-iOS-256pt", "size":512},

		{"name": "5@1x-iPad-Notifications-512pt", "size":512},
		{"name": "5@2x-iPad-Notifications-512pt", "size":1024},
	];

	var initialState = doc.activeHistoryState;

	for (var i = 0; i < icons.length; i++) {
		var eachIcon = icons[i];

		doc.resizeImage(eachIcon.size, eachIcon.size, null, ResampleMethod.BICUBICSHARPER);

		var destFileName = eachIcon.name + ".png";

		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, saveForWeb);

		// undo resize
		doc.activeHistoryState = initialState;
	}

	alert("All iOS icons created and saved.");

	doc.close(SaveOptions.DONOTSAVECHANGES);

	restorePrefs();
}

function restorePrefs() {
	app.preferences.rulerUnits = initialPrefs;
}

main();

