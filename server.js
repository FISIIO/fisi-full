const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

// serve static frontend
app.use(express.static('browser/dist'));

app.listen(port, () => {
  console.log(`[ ${process.pid} ] Listening on port ${port}!`);
});
