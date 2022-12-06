const { database } = require("./server/models");
const app = require("./server/app");





const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    await database.sync();

app.listen(PORT, async () => {

    
    await database.sync({force:true});
  

    console.log(`App listening on http://localhost:${PORT}`);
});
} catch (error) {
  console.error('Error starting server:', error)
}
};

init();