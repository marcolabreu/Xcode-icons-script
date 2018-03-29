# Xcode-icons-script

## JavaScript Photoshop script to generate all app icons for Xcode

Make a 1024x1024 PNG image for regular iOS or Mac apps. For Apple Messages Sticker apps, make also a 1024x768 PNG image.

The scripts will create all images required to fill all the icon slots in Xcode. Images are generated in **PGN-24** format using *Save For Web* and all metadata is removed.

## File names

Some generated files will have different names but exactly the same size. **This is the intended behavior**. The idea is to have one file for each slot thus converting the icon installation in Xcode into a brainless drag and drop operation. 

The generated file names will sort the images in the order their slots appear in Xcode. For the purposes of the naming scheme, icon group is defined as a set of icons that share in Xcode the same name reference and are only differentiated by their size multiplier. 

### Naming scheme

The naming scheme is `<iconGroup@sizeMultiplier>-<partial-Xcode-reference-name>-<reference-size>`, which gives enough information to find where the image file goes and double check it if necessary. 

The characters before the first dash should suffice to find the correct slot in Xcode. For example the file `5@2x-iPad-Notifications-20pt.png` will go into the 5th iOS app icon group, 2x slot. The rest of the name is there to eliminate any doubt.

## Installation

**Open `Terminal.app` and type the following like a badass:**
```bash
$ git clone https://github.com/marcolabreu/Xcode-icons-script.git
$ cd Xcode-icons-script/
$ ./install.sh
```
**Or, do it manually:**

1. Download script
2. Copy individual scripts or the `Xcode-icons-script` folder to `/Applications/Adobe Photoshop CC 2018/Presets/Scripts/`

## Usage

1. Open Photoshop CC 2018 (or restart if it was open during install)
2. Select `File > Scripts > <Script Name>`
3. Follow the dialog prompts

## Warning!

The scripts do not handle naming collisions and **will overwrite any existing files** with the same names in the destination directory. You've been warned!

## Documentation

* Adobe [Photoshop scripting documentation](http://www.adobe.com/devnet/photoshop/scripting.html)

* Apple iOS Human Interface Guidelines, [App Icon](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/app-icon/)

* [Creating Stickers for iMessage] (https://developer.apple.com/stickers/)

## Credits

Modified and currently maintained by [@marcolabreu](https://github.com/marcolabreu)

Forked from [@jessesquires](https://github.com/jessesquires)'s [version](https://github.com/jessesquires/iOS-icons-script) of @appsbynight's mod of the original script by @mattdipasquale.
