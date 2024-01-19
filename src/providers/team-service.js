export default {
    saveTeam: async function saveTeam(team) {
        let response = await fetch('http://localhost:8080/team', {
            method: 'post',
            body: JSON.stringify(team),
            credentials: 'include',
            headers: {
                'Cache': 'no-cache',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    },

    getAllQuizEvents: async function getAllQuizEvents() {
        try {
            return {
                result: await fetch('http://localhost:8080/quizevent', {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Cache': 'no-cache',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            };
        }
        catch (e) {
            return {
                error: e
            };
        }
    },

    getAllQuestionEvents: async function getAllQuestionEvents() {
        try {
            return {
                result: await fetch('http://localhost:8080/questionevent', {
                    method: 'get',
                    headers: {
                        'Cache': 'no-cache',
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            };
        }
        catch (e) {
            return {
                error: e
            };
        }
    },
    getTeams: async function getTeams(quizId) {
        try {
            return {
                result: await fetch('http://localhost:8080/teams/' + quizId, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Cache': 'no-cache',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            };
        }
        catch (e) {
            return {
                error: e
            };
        }
    },
    getTeam: async function getTeam(quizId,teamId) {
        try {
            return {
                result: await fetch('http://localhost:8080/events/' + quizId + "/teams/" + teamId, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Cache': 'no-cache',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            };
        }
        catch (e) {
            return {
                error: e
            };
        }
    }

};
// function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return response
//     } else {
//         var error = new Error(response.statusText)
//         error.response = response
//         throw error
//     }
// }
