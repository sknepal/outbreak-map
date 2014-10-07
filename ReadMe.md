## Synopsis
**Outbreak Map** is a Google Maps mashup with Google Spreadsheet and [XML feed of CDC Travel Notices](http://wwwnc.cdc.gov/travel/rss/notices.xml). It  marks outbreaks happening worldwide, and with the help of geolocation, finds out the nearest outbreak to you.


## Built Using

1. [Bootstrap](http://www.startbootstrap.com) : For a better UI.
2. [Gmaps.js](https://github.com/hpneo/gmaps) : For easiness in using Google Maps.
3. [Share-button](https://github.com/carrot/share-button) : For an easy to implement share button.
4. [Google Spreadsheet](https://docs.google.com/spreadsheets/u/0/) : For scraping data from the XML feed via Google script and as a data source to dynamically update the map.
4. [Tabletop.js](https://github.com/jsoma/tabletop): For retrieving data from Google Spreadsheet.

## Installation

Download the repository, extract it as it is (i.e in the same hierarchy). 


## License

This work is licensed under a  [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).

## Changelog
v2.0 - 9/30/2014 : Made it Dynamic. XML feed of CDC Travel Notices is parsed by Google Script. The parsed data is stored in Google Spreadsheet. This data is grabbed via Tabletop.js each time the site loads, and mapped onto Google Maps via Gmaps.js.

v1.0 - 9/28/2014 : Initial release.
