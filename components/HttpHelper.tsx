export class HttpHelper {
    // Deze functie kan je gebruiken om parameters toe te voegen aan de endpoints hierboven
    // Het voegt data aan de URL toe gebasseerd op de params die meegegeven worden
    static addUrlParameter(
        endpoint: { destination: string, type: string },
        params: Array<string | number>
    ): { destination: string, type: string } {
        let url = endpoint.destination;
        for (const param of params) {
            if (url[url.length - 1] !== '/') {
                url += '/';
            }
            url += param.toString();
        }
        return {destination: url, type: endpoint.type};
    }
}
