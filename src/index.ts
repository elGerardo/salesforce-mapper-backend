import express from "express"
import router from "./routes/api"

const app = express()
app.use(express.json())
app.use("/api", router)

const PORT = 3000



app.listen(PORT, async () => {

    /*
    const conn = new jsforce.Connection({
        accessToken:"00DRu000001JT7N!AQEAQNe2ReZ1SAiFto.VuS_fXy_MqiD3d2ieUpdnb2wLsZMY5aa.somZmUpsBL79Ciwwc7lCqRr7mgXK_lS72EVFglqURjrW",
        loginUrl:"https://test.salesforce.com"
    })*
    await conn.login(
        "aramirez@gomultitaskr.com.staging", 
        "Multitaskr2024!CZxxnt7RZWkq8bktrsjNZzKc", (err, res) => {
            if(err) console.log(err)
            console.log(res)
        })

        console.log(conn)
        */
    console.log("Server Ruasdasnning in port ", PORT)
})