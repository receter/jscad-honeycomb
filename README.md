# JSCAD Honeycomb

This is a JSCAD package that generates honeycomb patterns.

## Usage on jscad.app

If you have published your package you can use it on the [jscad.app](https://jscad.app) website like so:

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
