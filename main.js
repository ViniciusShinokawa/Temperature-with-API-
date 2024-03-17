document.querySelector('#search').addEventListener('submit', async (event) =>{
    event.preventDefault(); //Para previnir o evento padrao dele 

    const cityName = document.querySelector('#city-name').value;  //Voce vai vai armazenar na varivel (cityName) e com document voce vai pegar o valor que vai ser digitado no input adicionando o value no final
    

    if(!cityName) {
        return showAlert('Voce precisa digitar uma cidade')
        // if para fazer a verificação caso ele não coloque o nome da cidade aparecer o alert
        // !cityName = Se não escrever nada aparece o alert 
    }

    //Como usar um API 
    const apiKey = '8b3b9401adc9a48f1ba0a891b461465e';
    // criar um varivel para guardar a chave 
    const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt-br` // copiar  a url do API e colocar interpolação da variavel exemplo: cityName
    ////////////////////////////////////////

    const results = await fetch(apiUrl); // Para chamda da API 
    const json = await results.json();

    if(json.cod === 200) {
            // Esse show info está recebendo as informações e colocando nomes : e dps o caminho que ela esta 
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp, 
                tempMax:json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon, 
                windSpeed: json.wind.speed, 
                humidity: json.main.humidity,


            });
    }else {
        showAlert('Não foi possivel localizar...')
    }
});


//função para mostrar infos 

function showInfo(json) { 
    showAlert('');

    document.querySelector('#weather').classList.add('show')
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}` 
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C</sup> `
    document.querySelector('#temp_description').innerHTML = `${json.description}`  
    document.querySelector('#temp_img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C</sup> `

    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C</sup> `

    document.querySelector('#humidity').innerHTML = `${json.humidity}% ` 

    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h ` 
}


//Função para mostrar o alerta 
function showAlert (msg) {
    document.querySelector('#alert').innerHTML = msg; //innerHTML = Vai escrever a msg que estamos esperando na função 

}