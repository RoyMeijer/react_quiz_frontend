export default {
  saveCategories: async function saveCategories(quizId,categories) {
	try {
	  return {
		result: await fetch('http://localhost:8080/events/' + quizId + '/rounds/', {
		  method: 'post',
		  credentials: 'include',
		  body: JSON.stringify({"categories": categories}),
		  headers: {
			'Accept': 'application/json',
			'Cache': 'no-cache',
			'Content-Type': 'application/json'
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
  getQuestions: async function getQuestions(quizId,roundId) {
	try {
	  return {
		result: await fetch('http://localhost:8080/events/' + quizId + '/rounds/' + roundId + '/questions', {
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
  saveQuestion: async function saveQuestion(quizId,roundId,question) {
	try {
	  return {
		result: await fetch('http://localhost:8080/events/' + quizId + '/rounds/' + roundId + '/questions', {
		  method: 'post',
		  credentials: 'include',
		  body: JSON.stringify({"question": question}),
		  headers: {
			'Accept': 'application/json',
			'Cache': 'no-cache',
			'Content-Type': 'application/json'
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
  getRoundQuestion: async function getRoundQuestion(quizId) {
	try {
	  return {
		result: await fetch('http://localhost:8080/events/' + quizId + '/rounds/currentquestions', {
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
  saveRoundAnwser: async function saveRoundAnwser(quizId,teamId,answer){
	try {
	  return {
		result: await fetch('http://localhost:8080/events/' + quizId + '/teams/' + teamId ,{
		  method: 'post',
		  credentials: 'include',
		  body: JSON.stringify({"answer": answer}),
		  headers: {
			'Accept': 'application/json',
			'Cache': 'no-cache',
			'Content-Type': 'application/json'
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
  getAnswers: async function getAnswers(quizId) {
	try {
	  return {
		result: await fetch('http://localhost:8080/events/' + quizId + '/answers', {
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
  checkAnswer: async function checkAnswer(quizId,correctTeams){
	try {
	  return {
		result: await fetch('http://localhost:8080/events/' + quizId + '/answers' ,{
		  method: 'post',
		  credentials: 'include',
		  body: JSON.stringify({"correct_teams": correctTeams}),
		  headers: {
			'Accept': 'application/json',
			'Cache': 'no-cache',
			'Content-Type': 'application/json'
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