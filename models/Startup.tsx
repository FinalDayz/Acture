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

}


