export class Startup {
    startupId: number = 1;
    name: string = '';
    telephone?: number = 1;
    email: string = '';
    image?: string = '';
    description: string = '';
    website?: string = '';
    ownerId: number = 1;

    static searchFilter(startup: Startup, searchQuery: string): boolean {
        if (!searchQuery)
            return true;
        return (
            (startup.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
            startup.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    static toURL(url: string): string {
        if(!(url.toString().includes("http://") || url.toString().includes('https://'))) {
            return "http://" + url;
        }
        return url;
    }
}


