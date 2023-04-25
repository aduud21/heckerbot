# virustotal-api

[![https://nodei.co/npm/virustotal-api.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/virustotal-api.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/virustotal-api)

[Virustotal API v2.0](https://developers.virustotal.com/v2.0/reference) wrapper class

## Install

```shell
npm i virustotal-api
```

## Example

```javascript
const fs = require("fs");
const VirusTotalApi = require("virustotal-api");
const virusTotal = new VirusTotalApi("<YOUR API KEY>");

fs.readFile(__filename, (err, data) => {
  if (err) {
    console.log(`Cannot read file. ${err}`);
  } else {
    virusTotal
      .fileScan(data, "file.js")
      .then(response => {
        let resource = response.resource;
        // sometimes later try:
        virusTotal.fileReport(resource).then(result => {
          console.log(result);
        });
      })
      .catch(err => console.log(`Scan failed. ${err}`));
  }
});
```

For more info please refer to [documentation](./docs/virus-total.md)

See full change log [here](CHANGELOG.md).

### Version 1.1.7

- Dependency update to fix security vulnerabilities.