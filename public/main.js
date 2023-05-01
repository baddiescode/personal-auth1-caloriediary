// let total = 0;
// const totalCal = document.querySelector("#totalCal");
// totalCal.innerText = total;
var trash = document.getElementsByClassName("fa-trash");

// Array.from(cals).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const mealDescription = this.parentNode.parentNode.childNodes[1].innerText
//     const calorieCount = parseInt(this.parentNode.parentNode.childNodes[3].innerText);
//     total -= calorieCount;
//     totalCal.innerText = total;

//     fetch('cals', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'mealDescription': mealDescription,
//         'calorieCount': calorieCount,
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const mealDescription = this.parentNode.parentNode.childNodes[1].innerText
    const calorieCount = this.parentNode.parentNode.childNodes[3].innerText;
    fetch('cals', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'mealDescription': mealDescription,
        'calorieCount': calorieCount,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
