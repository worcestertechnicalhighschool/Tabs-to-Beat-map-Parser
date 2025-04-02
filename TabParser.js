const fs = require("fs");
let fileArg;
let songArg;
let artistArg;
let error;

process.argv.forEach(function (val, index, array) {
  if (array.length < 5) {
    error = `You must supply the tab file, song name, and artist
    example: > node tabparser.js allstar.tab "All Star" "Smash Mouth"`      
  } else {
    [_, _, fileArg, songArg, artistArg] = [...array]
  }

})
if (error) {
  console.log(error);
  return
}

fs.readFile(fileArg, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  //   console.log(data);
  const seconds = 3 * 60 + 20;
  
  const tab = data.split("\n\n").map((group) => {
    // get the notes as data strings
    return group
      .split("\n")
      .filter((tabline) => {
        return tabline[1] === "|";
      })
      .map((tabline) => {
        return tabline.slice(2, tabline.length - 1);
      });
  });

  const tabUnits = tab.reduce((a, c) => {
    return a + c[1].length;
  }, 0);
  

  const tabs = Array(4).fill("");
  tab.flat().forEach( (t,i) => {
    tabs[i%4] += t
  })

  const song = {
    name: songArg,
    artist: artistArg,
    seconds,
    units: tabUnits,
    notes: [],
  };
  song.notes = tabs.reduce((a, c, i) => {
    const re = /\d(?:-\d)+/g; // find all hold notes
    const matches = c.matchAll(re);
    
      for (m of matches) {
        // create hold note
        a.push({ note: i, position: m.index, length: m[0].length });
        // replace with # so it's not recreated as single note
        c = c.replace(m, "#".repeat(m[0].length));
      }
    

    // create all single notes
    c.split("").forEach((n, j) => {
      if (!isNaN(n)) {
        // n is a note
        a.push({ note: i, position: j, length: 1 });
      }
    });
    return a;
  }, []);
  const json = JSON.stringify(song, null, 2);
    const filepath = song.name.toLowerCase().replaceAll(' ', '-') + '.json';
    fs.writeFileSync(filepath, json);
});
