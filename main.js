/*
* Copyright (c) 2012 Travis Almand. All rights reserved.
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, chooseTheme */

define(function (require, exports, module) {
    
    'use strict';
    
    var CommandManager = brackets.getModule("command/CommandManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        Dialogs = brackets.getModule("widgets/Dialogs"),
        NativeFileSystem = brackets.getModule("file/NativeFileSystem").NativeFileSystem,
        FileUtils = brackets.getModule("file/FileUtils"),
        Menus = brackets.getModule("command/Menus");
    
    
    var theme;
    
    // grab the settings file and save its contents
    // doesn't parse anything in the file, straight dump
    var file = FileUtils.getNativeModuleDirectoryPath(module) + "/settings.txt";
    var fileEntry = new NativeFileSystem.FileEntry(file);
    var readPromise = FileUtils.readAsText(fileEntry);  // completes asynchronously
    readPromise.done(function (text) {
        if (text) {
            theme = text;
            chooseTheme();
        }
    })
        .fail(function (errorCode) {
            console.log("Error #" + errorCode);  // one of the FileError constants
        });
    
    // apply theme to editors as they get focus
    // this breaks loading a new folder, disabled
//    $(DocumentManager).on("currentDocumentChange", function () {
//        chooseTheme();
//    });
    
    function action() {
        
        var modal = '<p>Select a theme...</p>' +
            '<select id="themeChooser_options">' +
            '<option>ambiance</option>' +
            '<option>blackboard</option>' +
            '<option>cobalt</option>' +
            '<option>eclipse</option>' +
            '<option>elegant</option>' +
            '<option>erlang-dark</option>' +
            '<option>lesser-dark</option>' +
            '<option>monokai</option>' +
            '<option>neat</option>' +
            '<option>night</option>' +
            '<option>rubyblue</option>' +
            '<option>vibrant-ink</option>' +
            '<option>xq-dark</option>';
        
        // modal window
        Dialogs.showModalDialog("error-dialog", "Theme Chooser", modal);
        
        // set current theme as selected in option list
        $(".modal-body option").each(function () {
            if ($(this).val() === theme) {
                $(this).prop("selected", true);
            }
        });
        
        // clicking ok sets new theme
        // to close without setting theme click x button for modal
        $(".modal-footer a").on("mouseup", function () {
            theme = $("#themeChooser_options").val();
            chooseTheme();
        });
        
    }
    
    function chooseTheme() {
        // load style sheet
        ExtensionUtils.loadStyleSheet(module, "css/" + theme + ".css");
        // assign theme to current editor
        // currentDocumentChange is used above to trigger again to get other editors (bad idea!)
        EditorManager.getCurrentFullEditor()._codeMirror.setOption("theme", theme);
        var writePromise = FileUtils.writeText(fileEntry, theme);  // completes asynchronously
        writePromise.fail(function (errorCode) {
            console.log("Error #" + errorCode);  // one of the FileError constants
        });
    }
    
    // Register the commands and insert in the edit menu
    CommandManager.register("Theme Chooser...", "themechooser", action);
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem("themechooser");
    
});