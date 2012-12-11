Please note, this extension is out of date and no longer being updated!

Brackets Theme Chooser extension
===
Experiment to get themes into the editor window. Uses themes from: http://codemirror.net/theme/

Not all the themes are suitable for the editor. Some of them have small adjustments already made for them.

Has simple config file to restore chosen theme on starting Brackets.

To install this extension:
In Brackets, under "Help" select "Show Extensions Folder". Place extension folder with files inside the "user" folder.
Older versions of Brackets this choice might be under "Debug" or might not exist at all.


Usage
=====
Select "Edit" and then click on "Theme Chooser...".
A modal dialog is shown with choices of different themes. Choose theme and click "Ok". Click on "x" to close with no changes.
Editor should change to chosen theme. At this point if Brackets is restarted then it will attempt to use this theme.


Known issues
=====
I haven't recreated the default theme of Brackets so if you wish to restore it then delete the entry in "settings.txt" file inside the extension's folder. If this file is empty the extension does nothing.


Things to do
=====
After getting this working it doesn't seem like the best way to go about this, I doubt I'll do much more.
I just have it out there to show some things I learned while making it.
Possibly using less files with a recompile is the way to go. That way the entire Brackets window can be themed, this method only alters the editor window inside Brackets.