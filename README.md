# Andrew Rotolo's Command-line CMS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A command-line application that will allow a user to view and manage the departments, job roles, and employees of their business via a Mysql database.

## Installation
This application requires no direct installation beyond downloading the raw files, but it does utilize several dependencies that can be installed via the "npm install" command. Additionally, please note that this application requires node.js and MySQL installed on your system in order to function.

## Usage
Set up a MySQL database using the provided schema. Optionally, you may populate the database with the provided seed data for testing purposes. Ensure that you adjust the credentials at the top of "index.js" to match your own (this can be done in any text editor). You may change the database name when setting it up, but be sure to change line 12 in index.js to match it. Changing table names will break the application, so don't do that. From there, run the program in the terminal via "node index.js." The database functionality is self-explanatory.

Please refer to the following video demonstration:
https://www.youtube.com/watch?v=zC0SesF4tRI

## Known issues
You may experience display glitches when using Git Bash. This does not affect the functionality of the program, but can severely impact readability. My best solution is to simply use another command-line service (the VSCode terminal functions perfectly, for instance) or to restart the program whenever you encounter issues.

## License
Software provided under the MIT License. Please refer to the included license file for more details.