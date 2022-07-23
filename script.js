var add=document.getElementById("cardclass");
console.log(add)
let api = "https://script.google.com/macros/s/AKfycbz5HRvz8EQ4S9k2RnKTRygKXFPpeyJWto3mHozr6vFIt0W1R89E-LcdIPmq4hjlPCH9/exec"
fetch (api)
.then(x =>x.json())
.then(y => 
    {
        console.log(y,y.data.length)
        var newcards=``;
        for(let i=0;i<y.data.length;i++){
            console.log(i)
            console.log(y.data[i].Name)
            newcards+=`<div class="card">
                            <img src="${y.data[i].Image.replace("https://drive.google.com/open?id=","http://drive.google.com/uc?export=view&id=")}" alt="Avatar" style="width:100%">
                            <div class="container">
                                <h4><b>${y.data[i].Name}</b></h4> 
                                <p>${y.data[i]["Email Address"]}</p> 
                            </div>
                        </div>`
        }
        add.innerHTML=newcards;
    }
);