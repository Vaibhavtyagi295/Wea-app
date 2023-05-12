 
var clutter2;
var lastsearch= [];
var some=false;
function sugess(city) {
    axios.get(`getsuggestion/${city}`)
      .then(function (response) {
  
        var arr = response.data.cities;
        
        var clutter = "";
  
        if (arr.length > 4) {
          for (i = 0; i < 4; i++) {
            clutter += `<li class="suggest">
        <i class="ri-map-pin-line"></i>
        <h3 class='click'>${arr[i].name}</h3>
        </li>`
          }
        } else {
          arr.forEach(function (obj) {
            clutter += `<li class="suggest">
        <i class="ri-map-pin-line"></i>
        <h3 class='click'>${obj.name}</h3>
        </li>`
          })
  
        }
  
         some=true;
        document.querySelector(".cities").innerHTML = clutter;
        document.querySelector(".cities").addEventListener('click',function(dets){
             var value=dets.target.textContent;
        document.querySelector(".search").value = value;

        })

        
      });
     
  }

  tym = 0;
  document.querySelector(".search").addEventListener("input", function () {
  
    let cityname = document.querySelector(".search").value;

    let city = cityname.charAt(0).toUpperCase() + cityname.slice(1).toLowerCase();
     lastsearch.push(city)
     lastsearch.slice(lastsearch[3],1)
    if (city.length % 3 == 0) {
     
      sugess(city);
    } else if (city.length > 0) {
      clearTimeout(time);
      tym = null;
      tym = 1500;
      var time = setTimeout(() => {
        
        sugess(city);
      }, tym);
    }
  
  }
  )

   console.log(lastsearch)
   
   axios.get('/lastsearch')
   .then((response)=>{
    clutter2='';
  
  response.data.forEach((data,index)=>{
    clutter2 += `<li class="suggest">
    <i class="ri-search-eye-line"></i>
    <h3 class='click'>${data}</h3>
    </li>`

    document.querySelector(".cities").innerHTML = clutter2;
    document.querySelector(".cities").addEventListener('click',function(dets){
      var value=dets.target.textContent;
    document.querySelector(".search").value = value;
    })
  })
})
 
