
const { db } = require("./server/models");
const app = require("./server/app");

const PORT = process.env.PORT;

const init = async () => {
  try {
    await db.sync();

app.listen(PORT, async () => {

    
    await sequelize.sync({force:true});
  

    console.log(`App listening on http://localhost:${PORT}`);
});
} catch (error) {
  console.error('Error starting server:', error)
}
};

init();