import {Alert} from "react-native";
import ApiDictionary from '../constants/ApiDictionary';

const state = {
    jwt: "",
    getjwt: false
};

export default async function bodyless(details: { destination: string; type: string; }) {
    const response = await Promise.race([
        fetch(ApiDictionary.apiIp + details.destination, {
            method: details.type,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer:' + state.jwt,
            }}).then(response => {
                return response.json();})
              .then(responseData => {
                  return responseData;}),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), ApiDictionary.timeoutTimings)
              )
            ]).catch(err => {
              alert(err.message);
          });

        const resData = await response;

        return resData;
}

export async function bodyfull(details: { destination: string; type: string; }, bodyattributes: Object) {

    const response = await Promise.race([
        fetch(ApiDictionary.apiIp + details.destination , {
        method: details.type,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'bearer:' + state.jwt,
        },
        body: JSON.stringify(bodyattributes)
        }
        ).then(response => {
            if(response.ok) {
                state.getjwt = true;
            } else {
                state.getjwt= false;
            }
          return response.json();}
        ).then(responseData => {
            return responseData;}),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), ApiDictionary.timeoutTimings)
        )]
        ).catch(err => {
        alert(err.message);
    });
        const resData = await response;

        if(state.getjwt && resData.token) {
            state.jwt = resData.token;
        }

        return resData;
  }

export function expireJWT(){
    state.jwt = "";
    state.getjwt = false;
}

  function alert(err: string) {

    return (
        Alert.alert(
            err,
            'Controleer je internet verbinding en probeer opnieuw.',
            [
                {text: 'OK', style: 'cancel'},
            ],
            {cancelable: false}
         ))}
