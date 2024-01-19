import React from "react";
import { Link } from "react-router-dom";

export const QuizMasterHome = () => (
    <Link to="/quizmaster/createquiz">
        <button type="button" className="menu-button">
            Click Me!
        </button>
    </Link>
);