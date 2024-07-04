import { xml2json } from "xml-js";

function XmlToJsonTest() {
  const xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<note importance="high" logged="true">' +
    "    <title>Happy</title>" +
    "    <todo>Work</todo>" +
    "    <todo>Play</todo>" +
    "</note>";

  const result1 = xml2json(xml, { compact: true, spaces: 4 });
  const result2 = xml2json(xml, { compact: false, spaces: 4 });

  console.log(result1);
  console.log(result2);
}

export default XmlToJsonTest;
