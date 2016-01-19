# SCBT UI #

This is a repository for storing the UI components for SCBT project. The following are the setup steps to setup.

### Yeoman Installation - Windows ###

1. Install Git https://git-scm.com/downloads
2. Install Node https://git-scm.com/downloads
3. Install Yo, Bower and Grunt-cli
    Run: npm install --global yo bower grunt-cli
4. Check if yo, bower and grunt installation is successful
    Run: yo --version && bower --version && grunt --version
5. Install webapp generator for Yo
    Run: npm install --global generator-webapp
6. create app folder
7. To make your app folder a Yo app run below code inside the app dir
    Run: yo
8. Start the grunt server
    Run: grunt serve

### Common Errors and workarounds ###

1. yo command not found?
Sol: Add C:\Users\myusername\AppData\Roaming\npm to PATH in Windows environment variables, Restart cmd console and try.

2. Bower “Git not in the PATH” error?
Sol: Add the Git cmd and bin path to your windows PATH environment variable. The Git cmd path will be unique on your machine, and something like
;%PROGRAMFILES(x86)%\Git\bin;%PROGRAMFILES(x86)%\Git\cmd

3. Unable to connect to github.com using git://github.com
Sol: Git can use https:// instead of git://, so the solution is to set it to use https:// by default:
git config --global url."https://".insteadOf git://
