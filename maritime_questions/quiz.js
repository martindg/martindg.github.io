const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz(){
    // Cleanup any previous data
    quizContainer.innerHTML = "";
      resultsContainer.innerHTML = "";

    // variable to store the HTML output
    const output = [];

    // for each question...
    questions.forEach(
        (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // shuffle answers
                if ( !currentQuestion.answers[0].hasOwnProperty('value') )
                {
					// Has not been shuffled before, so we will add original value
                    currentQuestion.answers.forEach((a, i) =>
                        {
                            a.value = i;
                        }
                    )
                }
                currentQuestion.answers = shuffle(currentQuestion.answers);

                // and for each available answer...
                    //for(letter in currentQuestion.answers){
                currentQuestion.answers.forEach((a) => {

                    // Text data
                    const t = a.t
                    // Img data
                    const imgs = a.img

                    answ = t

                    // Check if there is an image in the answer
                    imgs.forEach( img =>
                        {
                            answ = answ + `<img class="asnw-img" src="${img}">`;
                        }
                    )

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${a.value}">
                            <span class="answer-option" name="question${questionNumber}" value="${a.value}">
                            ${answ}
                            </span>
                        </label></br>`
                    );
                }
            );

            const image_base64 = currentQuestion.image_base64;
            var image_html = "";
            if (image_base64) {
                image_html = `</br><img src=` + image_base64 +`>`
            }
            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${questionNumber + 1}. <span class="id_marad">(${currentQuestion.id_marad})</span> ${currentQuestion.question} ` + image_html + `</div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  questions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    var checked = (answerContainer.querySelector(selector) || {});
    const userAnswer = checked.value;
    //const userAnswer = (answerContainer.querySelector(selector) || {}).value;


    const correct = currentQuestion.correct;
    const user_answer = parseInt(userAnswer);

    // if answer is correct
    if( user_answer === correct){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      //answerContainers[questionNumber].style.color = 'green';
      answerContainers[questionNumber].querySelector(`span[name=question${questionNumber}][value='${correct}']`).style.color = "green";
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      //answerContainers[questionNumber].style.color = 'red';
      answerContainers[questionNumber].querySelector(`span[name=question${questionNumber}][value='${correct}']`).style.color = "green";
      if ( !isNaN(user_answer) ) {
            answerContainers[questionNumber].querySelector(`span[name=question${questionNumber}][value='${user_answer}']`).style.color = "red";
      }
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `Верни: ${numCorrect} / ${questions.length}`;
}

// on submit, show results
submitButton.addEventListener('click', showResults);
