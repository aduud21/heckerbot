# Bloxlink API wrapper 🧬
[![CodeFactor](https://www.codefactor.io/repository/github/callumisdumb/bloxlink-sdk/badge)](https://www.codefactor.io/repository/github/callumisdumb/bloxlink-sdk)
![Contributors](https://shields.io/github/contributors/callumisdumb/bloxlink-sdk)
![License](https://shields.io/github/license/callumisdumb/bloxlink-sdk)
![Language](https://shields.io/github/languages/top/callumisdumb/bloxlink-sdk)

Bloxlink-sdk is a simple, easy to use API wrapper for Bloxlinks API using Node.js. Anyone who can use code should be fairly comfortable with this.

## Installation
Installing the package is done through [npm](https://npmjs.com/). This is bundled in the node.js installation.

```
npm i bloxlink-sdk
```

## Working examples
In order to use this API, you will need an API token from Bloxlink. You'll need to do this [here](https://blox.link/dashboard/developers)

All code in Bloxlink-sdk works asynchronously.

> Code
```js
(async () => {
  const bloxlink = require('bloxlink-sdk')
  
  bloxlink.initialise("YOUR_API_KEY_HERE")

  console.log(
    await bloxlink.SearchDiscordToRoblox("199858283476025346", "372036754078826496")
  );
})();
```
This example will get the Roblox information from the user ID `199858283476025346` in the guild `372036754078826496`.

> Response (application/json)
```
{
  success: true,
  user: { robloxId: '132537120', primaryAccount: '132537120' }
}
```

> **Warning**: Some endpoints on the Bloxlink v3 API have privileged access to a small group of people for use, therefore they cannot be used by the general public.
> Despite these endpoints being privileged access, Bloxlink-sdk has a working function for it.

> Code
```js
(async () => {
  const bloxlink = require('bloxlink-sdk')
  
  bloxlink.initialise("YOUR_API_KEY_HERE")

  console.log(
    await bloxlink.SearchRobloxToDiscord("132537120", "372036754078826496")
  );
})();
```

This example will get the Discord information for the Roblox User ID `132537120` in the guild `372036754078826496`.

## Possible errors/warnings

In the event you're being ratelimited, you should receive a warning in the console
```
[Bloxlink-sdk] You're currently being ratelimited by the Bloxlink API.
```

## Versioning Guarantee

This project utilises the [Semantic Versioning](https://semver.org/) rules. Packages are published on NPM in the MAJOR.MINOR.PATCH

> **Note**: Incrementations of the MAJOR component indicates a new version of the [Bloxlink API](https://blox.link/dashboard/developers) is supported

All other incremenations of the semver components follow the [Semantic Versioning Summary](https://semver.org/#summary)

---
###### This API wrapper is unofficial and is not the work of [Bloxlink](https://blox.link) nor [BloxWorks, LLC](https://bloxworks.net) and is not endorsed by them. Please don't go to them for support.