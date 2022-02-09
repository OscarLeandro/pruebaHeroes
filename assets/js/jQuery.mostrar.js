// jQuery.fn.mostrar = (chart)=>{
    
//     for (const item of this){


//         let totalStats = Object.values(data.powerstats).reduce((acumulador,itemActual) => {
                  
//             console.log(acumulador);
//             return acumulador + parseInt(itemActual)
//           }, 0);



//         chart.options.data[0].dataPoints = Object.entries(data.powerstats).map((itemStat) =>{
                          
//             let valor  = (parseInt(itemStat[1]) * 100 / totalStats).toFixed(2)
//             console.log(valor, itemStat[0] + 'aaa');
        
//             return {y: valor, label:itemStat[0]}
//         })
//         chart.render();
//     }

//     return this;

// }








// for(const item of this){
//     chart.options.title.text = `Grafico de poderes - ${data.name}`

//     chart.render();
// }
// return this;