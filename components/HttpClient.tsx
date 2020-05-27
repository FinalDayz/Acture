import { Alert } from "react-native";
import ApiDictionary from '../constants/ApiDictionary';

const state={
    jwt:"",
}

export default async function bodyless(details: { destination: string; type: string;}) {

    const response = await fetch(ApiDictionary.apiServer + details.destination , {
        method: details.type,
        headers: {
            'Content-Type': 'application/json',
            'jwt': state.jwt,
        }})
        .then(response => {
          return response.json();})
        .then(responseData => {
            return responseData;})
        .catch(err => {
            console.log("fetch error" + err);
            alert();
        });
        const resData = await response.json();
        
        if(response.ok) {
            state.jwt = resData.token
        }

        return resData;
  }

  export async function bodyfull(details: { destination: string; type: string;}, bodyattributes: Object) {

        
    const response = await fetch(ApiDictionary.apiServer + details.destination , {
        method: details.type,
        headers: {
            'Content-Type': 'application/json',
            'jwt': state.jwt,
        },
        body: JSON.stringify(bodyattributes)
        })
        .then(response => {
            console.log(bodyattributes)
          return response.json();})
        .then(responseData => {
            return responseData;})
        .catch(err => {
            console.log("fetch error" + err);
            alert();
        });
        const resData = await response.json();

        if(response.ok) {
            state.jwt = resData.token
        }

        return resData;
  }
  
  function alert() {
    return (
        Alert.alert(
            'Geen verbinding',
            'Controleer je internet verbinding en probeer opnieuw.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        ))
  }