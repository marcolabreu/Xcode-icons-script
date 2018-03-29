# iOS-icons-script

*Photoshop script to generate all iOS App Icon PNGs*

Make one 1024x1024 App Icon, let this script [automate](http://xkcd.com/1319/) the rest.

This script will create all of your app icon images from a single 1024x1024 "iTunesArtwork" PNG. It saves icons in **PNG-24** using *Save For Web* and removes metadata. The generated PNGs are named with the following scheme: `Name-in-Xcode-with-size<@density-if-not-1x>.png`, for example `App-Store-iOS-1024.png` and `iPad-Settings-29x29@2x`.

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
