import React from 'react';
import {Link} from "react-router-dom";


export class MenuPage extends React.Component {
    render(){
        return (
            <div className="container" id="menu-options">
                <div className="col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-0 col-md-2 col-md-offset-3">
                    <Link to="/quizmaster/createquiz">
                        <button type="button" className="btn menu-button btn-big">Quiz Master</button>
                    </Link>
                </div>
                <div className="col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-0 col-md-2">
                    <Link to="/teamquiz/createteam">
                        <button type="button" className="btn menu-button btn-big">Team Quiz</button>
                    </Link>
                </div>
                <div className="col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-0 col-md-2">
                    <Link to="/scoreboard/choosequiz">
                        <button className="btn menu-button btn-big" type="button">Score Board</button>
                    </Link>
                </div>
            </div>
        )
    }
}
