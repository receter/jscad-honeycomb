# JSCAD Honeycomb

This is a JSCAD package that generates honeycomb patterns.

![image](https://github.com/receter/jscad-honeycomb/assets/2504695/244fe17c-4a22-45fb-970b-c5e66420f170)

## Usage on jscad.app

You can use this package on the [jscad.app](https://jscad.app) website like so:

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
