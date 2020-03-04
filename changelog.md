
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2020-03-02
### First Added
--RESTFUL API for the generator app.
- Start by defining a generator function to generate a random keys.
- Create a Post Route to generate keys for specefic name.
- Create Mysql database to store the generated keys.
- Define Mysql queries for inserting and deleting.
--React Native mobile app .
- Create a simple input for the name.
- Create fetch request to send a generate request to the server.
- Add a button "Generate".
- Create list to show the generated keys.
- Add fetch  to send a delete request to the server.
- Add delete button


## [2.0.0] - 2020-03-03
### Added
- Add styling to the app.


## [3.0.0] - 2020-03-04
### Added
- Add checkbox for the upperCase choise.
- Add fields for the arguments(charts, groupes ,number).
- Add copy button to copy a key to the clipboard.

### Changed
- Add charts, groupes ,number to the generator function .
- Update the Routes.
- Improve argument against commit logs.
- Improve the queries to avoid the sql injection.
- Improve the app speed.
- Minimize the app size.

