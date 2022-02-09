$(()=>{

  let limpiarErrores = ()=>{
    let errores = $('#msgError');
    for (let index = 0; index < errores.length; index++) {
      $(errores[index]).html('')  ;
      
    };
  };


  // Al presionar el boton se realiza el evento submit
    $('form').submit( event => {
        event.preventDefault();
        let expRegNum = /[0-9]/
        console.warn(expRegNum.test());
        let msgError = $('#msgError')
        limpiarErrores();
        let heroeInput = $('#heroeInput').val();
        if(heroeInput == '') {
          msgError.html('Ingrese un id');
          
        
        }else if (expRegNum.test(heroeInput )== false) {
          msgError.html('Ingrese solo numeros');
         
        }
        console.log(heroeInput);

        $.ajax({
            url: `https://superheroapi.com/api.php/4850348345012320/${heroeInput}`,
            success: (data)=>{
                let img = data.image.url;
                let nombre = data.name;
                let conexion = data.connections['group-affiliation'];
                let publisher = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let aparicion = data.biography['first-appearance'];
                let altura = `${data.appearance.height[0]} - ${data.appearance.height[1]}`;
                let peso = `${data.appearance.weight[0]} - ${data.appearance.weight[1]}`;
                let alianzas= data.biography.aliases;
                
                $('#infoHeroe').html(
                `
                <div class="card">
                        <div class="row g-0">
                          <div class="col-5 col-sm-4">
                            <img src="${img}" class="img-fluid w-100" alt="">
                          </div>
                          <div class="col-7 col-sm-8">
                            <div class="card-body">
                              <h5 class="card-title">Nombre: ${nombre}</h5>
                              <p id="conexion" class="card-text">Conexiones: ${conexion}</p>
                              <p id="publisher" class="card-text"><small class="text-muted">Publicado por${publisher}</small></p><hr>
                              <p id="ocupacion" class="card-text">Ocupación: ${ocupacion}</p><hr>
                              <p id="aparicion" class="card-text">Aparición: ${aparicion}</p><hr>
                              <p id="altura" class="card-text">Altura: ${altura}</p><hr>
                              <p id="peso" class="card-text">Peso: ${peso}</p><hr>
                              <p id="alianzas" class="card-text">Alianzas: ${alianzas}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                `
                )

                let totalStats = Object.values(data.powerstats).reduce((acumulador,itemActual) => {
                  
                  
                  return acumulador + parseInt(itemActual)
                }, 0);
                ;


                var estadisticas =[]
                
                

                var dataPoints = Object.entries(data.powerstats).map((itemStat) =>{
                  
                  let valor  = (parseInt(itemStat[1]) * 100 / totalStats).toFixed(2)
                  

                  return {y: valor, label:itemStat[0]}

                })

                dataPoints.map((s)=>{
                  console.log(s);
                  estadisticas.push({
                    y: s.y,
                    label: s.label
                  });
                });
                

                var chart = new CanvasJS.Chart("chartContainer",{

                  theme: "light2", // "light1", "light2", "dark1", "dark2"
                  exportEnabled: true,
                  animationEnabled: true,
                  title: {
                    text: "PowerStats"
                  },
                  data: [{

                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: estadisticas,

                    
                  }]
                });
                
                chart.render();
            },
        });
    });
});