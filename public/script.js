
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";;
import { getDatabase, update, set, ref, get, onChildChanged, onChildAdded, onChildRemoved, push, child, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

    const Config = {

  };
    
    const app = initializeApp(Config);
    const db = getDatabase(app);
    const dbRef = ref(db,"user")

    let inpfrom = document.querySelectorAll("#inp_from")
    let modeTrip = document.querySelectorAll(".btn-check")
    let inpbookin = document.querySelectorAll("input[key-data='inp_bookin']")

    let modeTrip1 = modeTrip[2].nextElementSibling.innerHTML;
    modeTrip.forEach((btn) =>{

        btn.addEventListener("click",() =>{
            modeTrip1 = btn.nextElementSibling.innerHTML
        })
    })

    let arruser = []

    function checkdata(){

        for( let i = 0; i <= inpfrom.length-1; i++){
    
            if(inpfrom[i].tagName.toLocaleLowerCase() === 'div')
            {
                let inp_value = inpfrom[i].parentElement.querySelector('input')
                console.log(inp_value)
                
            }
            else{
                console.log(inpfrom[i])
            }
    
    
    
        }
    }
    

    inpbookin.forEach((inp) =>{
        // console.log(inp)
    })

    
    let btnSubmit = document.getElementById("inp_submit")
    btnSubmit.addEventListener('click', function(event) {
        // checkdata()
        event.preventDefault();
        setdata()
        
    });



    function setdata(){
        let newdata = {
            name:inpfrom[0].value,
            passport:inpfrom[1].value,
            vesa:inpfrom[2].value,
            resid:inpfrom[3].value,
            company:inpfrom[22].value,
            Kg:inpfrom[23].value,
            phoneNum:inpfrom[24].value,
            modeTrip:modeTrip1,

            bookin_1:{
                from:inpfrom[4].parentElement.querySelector('input').value,
                to:inpfrom[5].parentElement.querySelector('input').value,
                date1:inpfrom[6].parentElement.querySelector('input').value,
                date2:inpfrom[8].parentElement.querySelector('input').value,
            },

            bookin_2:{
                from:inpfrom[10].parentElement.querySelector('input').value,
                to:inpfrom[11].parentElement.querySelector('input').value,
                date1:inpfrom[12].parentElement.querySelector('input').value,
            },
            
            bookin_3:{
                from:inpfrom[14].parentElement.querySelector('input').value,
                to:inpfrom[15].parentElement.querySelector('input').value,
                date1:inpfrom[16].parentElement.querySelector('input').value,
            },
            
            bookin_4:{
                from:inpfrom[18].parentElement.querySelector('input').value,
                to:inpfrom[19].parentElement.querySelector('input').value,
                date1:inpfrom[20].parentElement.querySelector('input').value,
            },
            
        }
        arruser.push(newdata)

        push(dbRef,arruser[0])
    }

    