# iOS-icons-script

*Photoshop script to generate all iOS App Icon PNGs*

Make a 1024x1024 **PNG-24** image for regular iOS or Mac apps. For Apple Messages Sticker apps, make also a 1024x768 **PNG-24** image.

The scripts will create all of your app icon images from a single 1024x1024 PNG. It saves icons in PNG-24 using *Save For Web* and removes metadata. To facilitate installation, the generated PNGs names will sort them in the exact order they appear in Xcode. The naming scheme is `<icon-group@density>-<partial-Xcode-name>-<reference-size>`. For example the file `5@2x-iPad-Notifications-20pt.png` will go into the 5th iOS app icon group, 2x slot. While the characters before the first dash would sufice to find the slot in Xcode, part of the slot's name and the size are also used to eliminate any doubt. 

## Installation

**Open `Terminal.app` and type the following like a badass:**
```bash
$ git clone https://github.com/marcolabreu/iOS-icons-script.git
$ cd iOS-icons-script/
$ ./install.sh
```
**Or, do it manually:**

1. Download script
2. Copy individual scripts or the `iOS-icons-script` folder to `/Applications/Adobe Photoshop CC 2018/Presets/Scripts/`

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

Original script by @mattdipasquale

Modified by @appsbynight

Later [modified](https://github.com/jessesquires/iOS-icons-script) by [@jessesquires](https://github.com/jessesquires)
