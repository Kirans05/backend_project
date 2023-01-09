var mysql = require('mysql');
let express = require("express")
let app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port:3306,
  database:"employee"
});

con.connect(function(err) {
  if (err) {
    console.log(err)
    throw err
  };
  console.log("Connected!");
});




app.post("/register", async (req, res) => {
    let records = [
      [ req.body.name, req.body.emailId, req.body.password, req.body.department, req.body.phoneNumber, "employee"]
    ]

    // let records = [
    //   [ req.body.name, req.body.emailId, req.body.password, req.body.department, req.body.phoneNumber, "Admin"]
    // ]


    const sql = "INSERT INTO employee_details(name, email_id, password, department, phone_number, role) VALUES ?"

    con.query(sql,[records], function (err, result){
      if(err) {
        console.log(err)
        res.send("unable to create employee")
      }else{
        res.send("employee created")
      }
    })
} )


app.get("/allEmployee", async (req, res) => {

  const sql = "SELECT * FROM employee_details"

  con.query(sql, function (err, result) {
    if(err){
      res.send("Unable to get Employee Details")
    }else{
      res.send(result)
    }
  })
})


app.post("/login", async (req, res) => {
  let records = [
    [req.body.email]
  ]
  const sql = "SELECT * FROM employee_details WHERE email_id=?"
  console.log(sql)

  con.query(sql, [records],function (err, result) {
    if(err){
      console.log(err)
      res.send("Unable to get Employee Details")
    }else{
      console.log(req.body.password)
      console.log(result)
      if(result[0].password == req.body.password){
        res.send(result)
      }else{
        res.send("Incorrect Password")
      }
      // console.log(result)
    }
  })
})



app.listen(4000, () => {
  console.log("server running at port 4000")
})
