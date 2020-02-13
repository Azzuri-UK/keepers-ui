const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const app = express();
const rewrite = require('express-urlrewrite');


app.use(rewrite('/loot*', '/'));
app.use(rewrite('/login*', '/'));
app.use(rewrite('/raids*', '/'));
app.use(rewrite('/raid*', '/'));
app.use(rewrite('/roster*', '/'));
app.use(rewrite('/crafting*', '/'));
app.use(rewrite('/bank*', '/'));
app.use(rewrite('/bis*', '/'));
app.use(rewrite('/character*', '/'));
app.use(rewrite('/about*', '/'));
app.use(rewrite('/recruitment*', '/'));
app.use(rewrite('/error*', '/'));
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);