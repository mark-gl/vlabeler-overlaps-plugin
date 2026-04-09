let AudioSystem = Java.type("javax.sound.sampled.AudioSystem");

let sampleLengthCache = {};

function getSampleLength(sampleName) {
  if (sampleLengthCache[sampleName] !== undefined) {
    return sampleLengthCache[sampleName];
  }
  try {
    let file = new JavaFile(module.sampleDirectory, sampleName);
    if (!file.exists()) {
      sampleLengthCache[sampleName] = null;
      return null;
    }
    let stream = AudioSystem.getAudioInputStream(file);
    let format = stream.getFormat();
    let frames = stream.getFrameLength();
    stream.close();
    sampleLengthCache[sampleName] = (frames / format.getSampleRate()) * 1000;
  } catch (e) {
    sampleLengthCache[sampleName] = null;
  }
  return sampleLengthCache[sampleName];
}

function getCutoff(entry) {
  if (entry.end > 0) {
    return entry.end;
  }
  let rightBlank = parseFloat(entry.extras[0]);
  let sampleLength = getSampleLength(entry.sample);
  if (sampleLength === null) {
    return null;
  }
  return sampleLength - rightBlank;
}

let flagged = [];
let errors = [];

for (let entry of entries) {
  let cutoff = getCutoff(entry);
  if (cutoff === null) {
    errors.push(entry.name);
    continue;
  }

  if (entry.points[0] >= cutoff) {
    flagged.push(entry.name);
    if (params["addTags"] && !entry.notes.tag.endsWith("⚠")) {
      entry.notes.tag += "⚠";
    }
  }
}

let lines = [];

if (flagged.length > 0) {
  lines.push(
    `Overlapping fixed/cutoff boundaries found for the following ${flagged.length} ${flagged.length === 1 ? "entry" : "entries"}:`,
  );
  lines = lines.concat(flagged);
} else {
  lines.push("No entries with overlapping fixed/cutoff boundaries found.");
}

if (errors.length > 0) {
  lines.push("");
  lines.push(
    `Failed to process sample files for the following ${errors.length} ${errors.length === 1 ? "entry" : "entries"}:`,
  );
  lines = lines.concat(errors);
}

report(lines.join("\n"));
