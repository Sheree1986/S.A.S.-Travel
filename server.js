const { db } = require("./server/models");
const app = require("./server/app");


// const URI = process.env.URL;
const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    await db.sync();

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error)
  }
};

init();