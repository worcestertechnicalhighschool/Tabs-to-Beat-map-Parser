# Tabs to Beatmap Parser

Converts Tablature notation to a JSON beat-map for use in rhythm games.

## Usage
This parser is not robust. Format your tab correctly or it will fail to give you accurate JSON.

## Tab Format Example

_example.tab_

```
VERSE
A|-----x-3-4---x-6-----x-1-2---x-4-----x-3-4---x-6-----x-1-2-------|
E|-2---x-------x---4---x-------x---2---x-------x---4---x-------9\--|
C|-----x-------x-------x-------x-------x-------x-------x-----------|
g|-----x-------x-------x-------x-------x-------x-------x-----------|

A|-----x-3-4---x-6-----x-1-2---x-4-----x-3-4---x-6-----x-1-2-------|
E|-2---x-------x---4---x-------x---2---x-------x---4---x-------9\--|
C|-----x-------x-------x-------x-------x-------x-------x-----------|
g|-----x-------x-------x-------x-------x-------x-------x-----------|
```

## Usage

Run the file using node. Be sure to include the arguments needed to find the tab and embed the basic song info in the json.

_example usage_

`node tabparser.js example.tab "The Song" "The Band"`

## Example Json

_example.json_

```json
{
  "name": "Example",
  "artist": "A Band",
  "seconds": 200,
  "units": 1465,
  "notes": [
    {
      "note": 0,
      "position": 7,
      "length": 3
    },
    ...
  ]
}
```
