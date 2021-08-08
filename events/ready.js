const db = require("quick.db")

module.exports.run = (client) => {
  console.log("oky" )
  client.user.setActivity(db.get(`status`) || "No Status :D"); 
}