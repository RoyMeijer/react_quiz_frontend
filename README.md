# Quizzer - Pub Quiz Web Application

## Features

- **Three Single Page Applications (SPAs):**
  - **Team App:** Runs on team members' smartphones for joining quizzes and submitting answers.
  - **Quiz Master App:** Operates on the quiz master's tablet for managing the quiz, selecting questions, and approving answers.
  - **Score Board App:** Displays scores, progress, and question statuses in real-time, visible to all participants.

- **Real-Time Interaction:** Utilizes WebSocket for immediate updates across all applications during the quiz.
- **Multiple Rounds & Categories:** Each quiz night consists of multiple rounds with questions from various categories.
- **Dynamic Team Participation:** Teams can apply to join, and the quiz master approves their participation.
- **Live Score Updates:** Real-time display of team scores, round points, and question responses.

## Technical Stack

- **MERN Stack:** MongoDB, Express.js, React, Node.js
- **WebSocket Protocol:** For real-time communication between clients and server.
- **Responsive Design:** Optimized for both smartphone and tablet displays.
