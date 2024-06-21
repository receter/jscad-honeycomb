# JSCAD Honeycomb

This is a JSCAD package that generates honeycomb patterns.

![image](https://github.com/receter/jscad-honeycomb/assets/2504695/244fe17c-4a22-45fb-970b-c5e66420f170)

## Usage on jscad.app

You can use this package on the [jscad.app](https://jscad.app/#data:application/gzip;base64,H4sIAHPpdWYAA0WOyw7CIBBF93zFpCuaqNEYN238GAQsmDJTeUQN4d/F1rS7OXdyH5IwRMhgCPVHkrtBgSt4/UzWa948ghRqvz6btmfsnlBGSwhOWOQtZAbVEJPHLYX/xCrTK3Rw3s0gaUwON/ZC2VTxdFx4EFMHl+U22g4m/rHU1sKYI5VGfdDviXwMdWWeF0Dpv1UWcN3FAAAA) website like so:

```javascript
const { honeycomb } = require("jscad-honeycomb");

function main() {
  return honeycomb({
    rows: 3,
    columns: 3,
    radius: 10,
    gap: 5,
    height: 5,
  });
}

module.exports = { main };
```
