import * as request from 'request-promise';

export class ClearService {

    private API_URL = 'http://localhost:3000/api/';

    public async clearEvents(username: string, password: string) {
        try {
            const token = await this.logIn(username, password);
            const user = await this.getUser(token);
            const events = await this.getEvents(user._id, token);
            await this.deleteEvents(events, token);
        } catch (err) {
            console.log(err);
        }
    }

    public async clearBoards(username: string, password: string) {
        try {
            const token = await this.logIn(username, password);
            const boards = await this.getBoards(token);
            await this.deleteBoards(boards, token);
        } catch (err) {
            console.log(err);
        }
    }

    private async logIn(username: string, password: string) {

        let token;

        const dateFrom = new Date();
        dateFrom.setFullYear(dateFrom.getFullYear() - 1);

        const dateTo = new Date();
        dateTo.setFullYear(dateTo.getFullYear() + 1);

        await request(
            {
                uri: `${this.API_URL}login`,
                form: { username, password },
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                method: 'POST'
            },
            function (err, res, body) {
                token = JSON.parse(body).token;
            }
        );

        return token;
    }

    private async getUser(token: string) {

        let user;

        await request(
            {
                uri: `${this.API_URL}profile`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                method: 'GET'
            },
            function (err, res, body) {
                user = JSON.parse(body);
            }
        );

        return user;
    }

    private async getEvents(userId: string, token: string) {

        let events;

        const dateFrom = new Date();
        dateFrom.setFullYear(dateFrom.getFullYear() - 1);

        const dateTo = new Date();
        dateTo.setFullYear(dateTo.getFullYear() + 1);

        await request(
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                uri: `${this.API_URL}events?userId=${userId}&from=${dateFrom}&to=${dateTo}`,
                method: 'GET'
            },
            function (err, res, body) {
                events = JSON.parse(body);
            }
        );

        return events;
    }

    private async deleteEvents(events, token: string) {

        events.forEach(async (event) => {
            request(
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    uri: `${this.API_URL}events/${event._id}`,
                    method: 'DELETE'
                },
                function (err, res, body) {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        });
    }

    private async getBoards(token: string) {

        let boards;

        await request(
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                uri: `${this.API_URL}boards`,
                method: 'GET'
            },
            function (err, res, body) {
                boards = JSON.parse(body);
            }
        );

        return boards;
    }

    private async deleteBoards(boards, token: string) {

        boards.forEach(async (board) => {
            request(
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    uri: `${this.API_URL}boards/${board._id}`,
                    method: 'DELETE'
                },
                function (err, res, body) {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        });
    }
}
