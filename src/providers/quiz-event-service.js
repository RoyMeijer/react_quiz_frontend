export default {
    getCurrentQuizEvent: async function getCurrentQuizEvent() {
        try {
            return {
                result: await fetch('http://localhost:8080/currentquiz', {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Cache': 'no-cache'
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
    saveQuizEvent: async function saveQuizEvent(quiz) {
        let response = await fetch('http://localhost:8080/quizevent', {
            method: 'post',
            body: JSON.stringify(quiz),
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
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
                        'Accept': 'application/json',
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
    joinQuiz: async function joinQuiz(quiz) {
        let response = await fetch('http://localhost:8080/quizzes', {
            method: 'post',
            body: JSON.stringify(quiz),
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            }
        });
        return await response.json();
    },
    getAllCategoryEvents: async function getAllCategoryEvents() {
        try {
            return {
                result: await fetch('http://localhost:8080/categories', {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
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
    saveTeams: async function saveTeams(teams, id) {
        let response = await fetch('http://localhost:8080/quizevents/' + id + '/teams', {
            method: 'post',
            body: JSON.stringify(teams),
            credentials: 'include',
            headers: {
                'Cache': 'no-cache',
                'Content-Type': 'application/json'
            }
        });
        return await response;
    },
    endRound : async function endRound(quizId, roundId) {
        try {
            return {
                result: await fetch('http://localhost:8080/events/' + quizId + '/closedrounds/' + roundId, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
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