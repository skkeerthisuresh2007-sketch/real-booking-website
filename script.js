let vehicles = [
 {id:1,type:"bus",name:"Super Bus",price:500,img:"images/bus3.png"},
 {id:2,type:"bus",name:"Express Bus",price:600,img:"images/bus2.png"},

 {id:3,type:"train",name:"Superfast Train",price:800,img:"images/train.png"},
 {id:4,type:"train",name:"Express Train",price:900,img:"images/train2.png"},

 {id:5,type:"flight",name:"Air India",price:3000,img:"images/flight2.png"},
 {id:6,type:"flight",name:"IndiGo",price:3500,img:"images/flight.png"}
];
function goSeat(){

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    localStorage.setItem("from", from);
    localStorage.setItem("to", to);

    window.location.href = "seat.html";
}

document.getElementById("ticketForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    let type = document.getElementById("transportType").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let seats = parseInt(document.getElementById("seats").value);

    let list = document.getElementById("vehicleList");
    list.innerHTML = "";

    
    let result = vehicles.filter(v => v.type == type);

    result.forEach(v=>{
        list.innerHTML += `
        <div>
            <img src="${v.img}" width="120">
            <h3>${v.name}</h3>
            <p>${from} → ${to}</p>
            <p>Price: ₹${v.price}</p>
            <button onclick="goSeat(${v.id}, '${from}', '${to}', ${seats})">Book</button>
        </div>
        `;
    });
});


if(document.body.classList.contains("seat-page"))
    
/* ================= SEAT PAGE ================= */
if(document.body.classList.contains("seat-page")){

    let seats = document.querySelectorAll(".seat");
    let confirmBtn = document.getElementById("confirmBtn");

    seats.forEach(seat => {
        seat.addEventListener("click", () => {

            seat.classList.toggle("selected");

            let selected = document.querySelectorAll(".seat.selected");

            if(confirmBtn){
                confirmBtn.style.display = selected.length > 0 ? "block" : "none";
            }
        });
    });

    if(confirmBtn){
        confirmBtn.addEventListener("click", () => {

            let selected = document.querySelectorAll(".seat.selected");
            let seatNumbers = [];

            selected.forEach(s => {
                let num = s.innerText.trim();
                if(num === "") num = "X";
                seatNumbers.push(num);
            });

            localStorage.setItem("seats", seatNumbers.join(", "));
            window.location.href = "ticket.html";
        });
    }
}


/* ================= TICKET PAGE ================= */
if(document.body.classList.contains("ticket-page")){

    let fromEl = document.getElementById("from");
    let toEl = document.getElementById("to");
    let seatsEl = document.getElementById("seats");

    if(fromEl) fromEl.innerText = localStorage.getItem("from") || "-";
    if(toEl) toEl.innerText = localStorage.getItem("to") || "-";
    if(seatsEl) seatsEl.innerText = localStorage.getItem("seats") || "-";

}