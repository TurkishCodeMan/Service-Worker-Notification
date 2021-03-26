
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
const webPush = require("web-push");

// const vapidKeys=webPush.generateVAPIDKeys();
const vapidKeys = {
    publicKey: "BAUYMLtqiJu9K-x02hYi6MTSQTrmVHW8Tc9et8r9jJ-mIYTbu_1a4QfDrXT7tCp1Nq8lOzVmtzRWq-8E5mqAGvE",
    privateKey: "usEky_7kXvXQzcOzyydAFeNZ2NunmwKcWfoGnrhpAaM"
}

//Webpush
webPush.setVapidDetails(
    "mail:to:info@deneme@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)




//Database
let { categoryList } = require("./data");



app.get("/", (req, res, next) => {
    res.status(200).send({ categoryList });
})
app.post("/subscribe/:categoryId", (req, res, next) => {
    //Client Object And Cat Id Coming
    if (req.params.categoryId && req.body.subscriber) {
        let catId = req.params.categoryId;
        const matchedCategory = categoryList.find(c => c.id == catId);

        if (!matchedCategory) return res.status(404).send({ message: "Kategori Bulunamadı" });

        matchedCategory.subscriberList.push(req.body.subscriber);
        return res.status(201).send(matchedCategory);

    } else {
        return res.status(400).send({ message: "Eksik Bilgi Gönderildi!" })
    }


})
app.post("/send_notification/:categoryId", (req, res, next) => {
    if (req.params.categoryId && req.body.message) {
        let catId = req.params.categoryId;
        const matchedCategory = categoryList.find(c => c.id == catId);

        if (!matchedCategory) return res.status(404).send({ message: "Kategori Bulunamadı" });

        const subscriberList=matchedCategory.subscriberList || [];
        subscriberList.forEach(sub=>{
            webPush.sendNotification(sub,req.body.message);
        })
        return res.status(201).send({message:"Bildirimler Gönderildi"});

    } else {
        return res.status(400).send({ message: "Eksik Bilgi Gönderildi!" })
    }
})



app.listen(PORT, () => {
    console.log("Listen On Port " + PORT);
})
