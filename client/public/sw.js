self.addEventListener("push",(e)=>{
console.log(e)
    const config={
        body:e.data.text() || 'Yeni Şiir Eklendi',
        data:{
            dateOfArrival:Date.now(),
            primaryKey:"3"
        },
        icon:"./images/logo.png",
        vibrate:[100,50,100],
        actions:[
            {
                action:"explore",
                title:"Action Explore"
            },
            {
                action:"close",
                title:"Bildirimi Kapat",
                //icon
            }
        ]

    };
    e.waitUntil(self.registration.showNotification('Yeni Şiir Eklendi !',config));
})