import { Alert } from "react-native";
import ApiDictionary from '../constants/ApiDictionary';

const state={
    jwt:"",
}

export default async function bodyless(details: { destination: string; type: string;}) {

    const response = await Promise.race([
        fetch(ApiDictionary.apiServer + details.destination , {
            method: details.type,
            headers: {
                'Content-Type': 'application/json',
                'jwt': state.jwt,
            }}).then(response => {
              return response.json();})
            .then(responseData => {
                return responseData;})
            .catch(err => {
                alert(err.message);
            }), 
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), ApiDictionary.timeoutTimings)
        ).catch(err => {
            alert(err.message);
        })
      ])
    
        const resData = await response;
        
        if(response.ok) {
            state.jwt = resData.token
        }

        return resData;
  }

  export async function bodyfull(details: { destination: string; type: string;}, bodyattributes: Object) {

        
    const response = await Promise.race([
        fetch(ApiDictionary.apiServer + details.destination , {
        method: details.type,
        headers: {
            'Content-Type': 'application/json',
            'jwt': state.jwt,
        },
        body: JSON.stringify(bodyattributes)
        })
        .then(response => {
          return response.json();})
        .then(responseData => {
            return responseData;}),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), ApiDictionary.timeoutTimings)
        )
      ]).catch(err => {
        alert(err.message);
    })
        const resData = await response;

        if(response.ok) {
            state.jwt = resData.token
        }
        return resData;
  }
  
  function alert(err: string) {
    return (
        Alert.alert(
            err,
            'Controleer je internet verbinding en probeer opnieuw.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        ))
  }