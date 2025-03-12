import { showToast, storage } from './utils.js';

export const Quiz = () => {
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get('id'));
    
    if (!quizId) {
        return `<div class="container py-5">
            <div class="alert alert-danger">Quiz not found</div>
        </div>`;
    }
    
    // Fetch quiz data
    const fetchQuiz = async () => {
        try {
            const response = await fetch(`/api/quizzes/${quizId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch quiz');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching quiz:', error);
            showToast('Failed to load quiz', 'error');
            return null;
        }
    };
    
    // Submit quiz
    const submitQuiz = async (answers) => {
        try {
            const user = storage.get('user');
            if (!user) {
                showToast('Please login to submit quiz', 'error');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
                return;
            }
            
            const response = await fetch(`/api/quizzes/${quizId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    answers
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit quiz');
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error submitting quiz:', error);
            showToast('Failed to submit quiz', 'error');
            return null;
        }
    };
    
    // Handle quiz submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = document.getElementById('quiz-form');
        const answers = [];
        
        // Get all selected answers
        const questions = form.querySelectorAll('.quiz-question');
        questions.forEach(question => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption) {
                answers.push(parseInt(selectedOption.value));
            } else {
                answers.push(null);
            }
        });
        
        // Check if all questions are answered
        if (answers.includes(null)) {
            showToast('Please answer all questions', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('submit-quiz');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
        
        // Submit quiz
        const result = await submitQuiz(answers);
        if (result) {
            showToast('Quiz submitted successfully', 'success');
            
            // Show result
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = `
                <div class="card">
                    <div class="card-body text-center">
                        <h2 class="mb-4">Quiz Result</h2>
                        <div class="result-circle mb-4">
                            <div class="result-percentage">${Math.round(result.result.percentage)}%</div>
                        </div>
                        <h4>You scored ${result.result.score} out of ${result.result.totalQuestions}</h4>
                        <p class="text-muted">Submitted on ${new Date(result.result.submittedAt).toLocaleString()}</p>
                        <div class="mt-4">
                            <a href="/course/${params.get('courseId')}" class="btn btn-primary">Back to Course</a>
                            <a href="/dashboard" class="btn btn-outline-primary ms-2">Go to Dashboard</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit Quiz';
        }
    };
    
    // Initialize quiz
    const initQuiz = async () => {
        const quiz = await fetchQuiz();
        if (!quiz) {
            return `<div class="container py-5">
                <div class="alert alert-danger">Failed to load quiz</div>
            </div>`;
        }
        
        // Render quiz
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h3 class="mb-0">${quiz.title}</h3>
                </div>
                <div class="card-body">
                    <form id="quiz-form">
                        ${quiz.questions.map((question, qIndex) => `
                            <div class="quiz-question mb-4">
                                <h5 class="mb-3">${qIndex + 1}. ${question.question}</h5>
                                <div class="options">
                                    ${question.options.map((option, oIndex) => `
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" name="question-${qIndex}" id="option-${qIndex}-${oIndex}" value="${oIndex}">
                                            <label class="form-check-label" for="option-${qIndex}-${oIndex}">
                                                ${option}
                                            </label>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                        <div class="text-center mt-4">
                            <button type="submit" id="submit-quiz" class="btn btn-primary btn-lg">Submit Quiz</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Add event listener for form submission
        document.getElementById('quiz-form').addEventListener('submit', handleSubmit);
    };
    
    return `
        <div class="container py-5">
            <div id="quiz-container">
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading quiz...</p>
                </div>
            </div>
        </div>
    `;
};

// Quiz List Component
export const QuizList = () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get('courseId'));
    
    if (!courseId) {
        return `<div class="container py-5">
            <div class="alert alert-danger">Course not found</div>
        </div>`;
    }
    
    // Fetch quizzes for course
    const fetchQuizzes = async () => {
        try {
            const response = await fetch(`/api/quizzes/course/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching quizzes:', error);
            showToast('Failed to load quizzes', 'error');
            return [];
        }
    };
    
    // Initialize quiz list
    const initQuizList = async () => {
        const quizzes = await fetchQuizzes();
        
        const quizListContainer = document.getElementById('quiz-list-container');
        
        if (quizzes.length === 0) {
            quizListContainer.innerHTML = `
                <div class="alert alert-info">
                    No quizzes available for this course yet.
                </div>
            `;
            return;
        }
        
        quizListContainer.innerHTML = `
            <div class="row">
                ${quizzes.map(quiz => `
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${quiz.title}</h5>
                                <p class="card-text">Test your knowledge with this quiz.</p>
                                <p class="card-text"><small class="text-muted">${quiz.questions.length} questions</small></p>
                            </div>
                            <div class="card-footer bg-white border-0">
                                <a href="/quiz?id=${quiz.id}&courseId=${courseId}" class="btn btn-primary">Start Quiz</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };
    
    return `
        <div class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Quizzes</h2>
                <a href="/course/${courseId}" class="btn btn-outline-primary">Back to Course</a>
            </div>
            <div id="quiz-list-container">
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading quizzes...</p>
                </div>
            </div>
        </div>
    `;
}; 