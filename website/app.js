/* Global Variables */
var baseurl1 = "http://api.openweathermap.org/data/2.5/weather?zip="
var baseurl2 = ",us&appid=";
var apikey = "db8b3ce64e3553afd594f578024a9b33";

// Create a new date instance dynamically with JS
let usrresponse;
let tempratue;
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// on clicking generate button
document.getElementById("generate").addEventListener("click" , perfomaction);

function perfomaction()
{

    // now we will call weather api to get the weather data
    const zipcode = document.getElementById("zip").value;
    usrresponse = document.getElementById("feelings").value;
    const weatherurl = baseurl1 + zipcode + baseurl2 + apikey;

    console.log('getweather is called');
    getweather(weatherurl).then(function(data)
    {
        console.log(data);
        const fulldata = {
            'temprature' : data.main.temp,
            'date' : newDate,
            'userresponse' : usrresponse
        };
        console.log(fulldata);
        console.log('postdata is called');
        postData('/postdata',fulldata).then(function(data)
        {
            console.log('update ui is called');
            updateUI('/getdata');
        });
    });

}


const getweather = async (weatherurl) =>
{
    console.log(weatherurl);
    const res = await fetch(weatherurl);
   
    try{
        const data = await res.json();
        return data;
    } catch(error)
    {
        console.log("error");
    }
    
}




const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

const updateUI = async (url) =>
{
    
    const res = await fetch(url);

    try{
        const data = await res.json();
        document.getElementById("date").innerHTML = "Date : " + data.date;
        document.getElementById("temp").innerHTML = "Temprature : " + parseFloat(data.temprature - 273.15).toFixed(2) + " celcius";
        document.getElementById("content").innerHTML = "Feeling : " + data.userresponse;
        
    } catch(error)
    {
        console.log("error",error);
    }
}


