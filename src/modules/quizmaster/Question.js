import React from "react";

export class Question extends React.Component {

    render() {
        return (
            <div className="col-md-4">
                <h1>Question</h1>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>
                            Team
                        </th>
                        <th>
                            Accept/Deny
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            TB - Monthly
                        </td>
                        <td>
                            <form>
                                <input type="radio" name="enter" value="deny"/> Deny
                                <input type="radio" name="enter" value="accept"/> Accept
                            </form>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" class="btn menu-button">
                    Close Question
                </button>
                <button type="button" class="btn menu-button">
                    Next Question
                </button>
            </div>
        )
    }
}