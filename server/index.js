let express = require("express");
let app = express();
let port = process.env.PORT || 9000;
let { express_basic_setup } = require("./middleware/express-basic");

require("./misc/db-config");

express_basic_setup(app);
app.use("/", require("./route/auth"));
app.use("/note", require("./route/note"));

app.listen(port, () => console.log(`App is running on port ${port}`));
