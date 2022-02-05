$(document).ready(function () {
    $("form").submit(function (e) { 
        e.preventDefault();

        let valueInput = $("#heroeInput").val();

        $.ajax({
            url:"https://pokeapi.co/api/v2/pokemon/"+valueInput,
            success: function(data){
                console.log(data)
                let nombre = data.name
                let imagen = data.sprites.front_default
                let peso = data.weight

                $("#heroeInfo").html(
                    `<div class="text-center">
                    <h3>${nombre}</h3>
                    <img src="${imagen}" alt="" srcset="">
                    <h6>Peso:${peso}</h6>  
                    </div>`
                );

                let estadisticas = [];

                data.stats.forEach(function (s) {

                    estadisticas.push({
                        label: s.stat.name,
                        y: s.base_stat, 
                    });
                });

                console.log(estadisticas);

                let config ={
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas"
                    },
                    axisY: {
                        title: "Valor", 
                    },
                    axisX: {
                        title: "Estadisticas",
                    },
                    data: [
                        {
                            type:"column",
                            dataPoints: estadisticas
                        }
                    ]

                }

                let chart = new CanvasJS.Chart("heroeStats", config);
                chart.render()

            }
        })
    });
});