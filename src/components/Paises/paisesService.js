//import useToken from './useToken';



export class PaisesService {

    getPaisesList() {
        //var respuesta = fetch('http://192.168.1.27/public/laraveldocker/public/api/partidos', {
        var respuesta = fetch('https://api.covid19api.com/summary', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '
            },
            //body: JSON.stringify(credentials)
        })
        .then( function (data) {
            if (data.status != 200){
                console.log("error en respuesta");
                return "Error";
            }
            else{
                //console.log("respuesta bien");
                //console.log(data.json);
                return data.json();
            }
        } );
        return respuesta;
	}


    getPaisResgistros(slug) {
        //var respuesta = fetch('http://192.168.1.27/public/laraveldocker/public/api/partidos', {
        var respuesta = fetch('https://api.covid19api.com/dayone/country/'+slug, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '
            },
            //body: JSON.stringify(credentials)
        })
        .then( function (data) {
            if (data.status != 200){
                //console.log("error en respuesta");
                return "Error";
            }
            else{
                //console.log("respuesta bien por qaa");
                //console.log(data);
                return data.json();
            }
        } );
        return respuesta;
	}


    // newMatch(teamData, token) {    
    //     //var respuesta = fetch('http://192.168.1.27/public/laraveldocker/public/api/partidos', {
    //     var respuesta = fetch(process.env.REACT_APP_URL+'partidos', {
    //         method: 'POST',
    //         // mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer '+token,
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(teamData)
    //     })
    //     .then(data => data.json());
    //     console.log (respuesta);
    //     return respuesta;
    // }

 
}