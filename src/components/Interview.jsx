import { useEffect, useState } from "react";

//interview component
//this compent displyas the interview questions
//received from Api
function Interview(){

    //questions = current List of quetions
    //setQuestions = function used to update questions

    //Initially, we don't have any questions
    //so we use an empty array
    const [questions,  setQuestions]= useState([]);

     // loading tells us whether we're waiting
    // for the API response.
    const [loading, setLoading] = useState(true);

    //ERROR  will contain an error message
    //if the API Request Fail
    const [error, setError] = useState("");


    //useEffect runs when the component loads

    //we use it to call out api automatically
    //when the interview page is opened
    useEffect(()=> {
        getQuestions();
    },[]);


    //this funciton call api
    const getQuestions = async() =>{
        try
        {
            //fetch() send an http req
            
            const response = await fetch(
                "https://localhost:7153/api/interview/questions"
            );

            if(!response.ok) {
                throw new Error(
                    "Failed To Load Interview Questions"
                );
            }

            //convert Json response into a javascript object
            const data = await response.json();

            //save the questions into react state
            setQuestions(data);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    };

    //DisplayLoading message while api
    //request is running

    if(loading){
        return <h2>Loading questions</h2>
    }

    //display error if api req failed
    if(error){
        return <h2>Error: {error}</h2>
    }

    return (
        <div>
            <h1>AI Interview</h1>

            <p>
                Answer The Following Questions
            </p>

            {questions.map((question) => (
                <div key={question.id}>

                    <h3>
                        Question {question.id}
                    </h3>

                    <p>
                        {question.question}
                    </p>

                    <small>
                        Category : {question.category}
                    </small>

                    <hr/>
                    </div>

            ))}

        </div>
    );


}


//Make this componet Available to other files
export default Interview;