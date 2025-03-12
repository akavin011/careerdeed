import { showToast, storage } from './utils.js';

// Mock practice test data
const mockPracticeTests = [
    {
        id: 1,
        title: "Quantitative Aptitude Mock Test",
        description: "Test your mathematical skills with this comprehensive practice test covering arithmetic, algebra, and geometry.",
        duration: 60,
        questions: 30,
        difficulty: "Intermediate",
        category: "Mathematics"
    },
    {
        id: 2,
        title: "Logical Reasoning Practice Test",
        description: "Challenge your logical thinking with puzzles, sequences, and analytical reasoning questions.",
        duration: 45,
        questions: 25,
        difficulty: "Advanced",
        category: "Logic"
    },
    {
        id: 3,
        title: "Verbal Ability Assessment",
        description: "Evaluate your verbal skills with questions on vocabulary, grammar, reading comprehension, and more.",
        duration: 40,
        questions: 30,
        difficulty: "Intermediate",
        category: "Verbal"
    },
    {
        id: 4,
        title: "Data Interpretation Test",
        description: "Practice analyzing charts, graphs, and tables to extract meaningful information and solve problems.",
        duration: 30,
        questions: 20,
        difficulty: "Advanced",
        category: "Data Analysis"
    },
    {
        id: 5,
        title: "Full-Length Aptitude Simulation",
        description: "Complete simulation of a competitive exam with questions from all aptitude areas.",
        duration: 120,
        questions: 100,
        difficulty: "Expert",
        category: "Bundle"
    },
    {
        id: 6,
        title: "Quick Aptitude Assessment",
        description: "Short test to quickly evaluate your aptitude skills across different areas.",
        duration: 20,
        questions: 15,
        difficulty: "Beginner",
        category: "Bundle"
    }
];

export const PracticeTest = () => {
    const params = new URLSearchParams(window.location.search);
    const testId = parseInt(params.get('id'));
    
    if (!testId) {
        return `<div class="container py-5">
            <div class="alert alert-danger">Practice test not found</div>
        </div>`;
    }
    
    // Fetch practice test data
    const fetchPracticeTest = () => {
        // Use mock data instead of API call
        const test = mockPracticeTests.find(test => test.id === testId);
        if (!test) {
            showToast('Failed to load practice test', 'error');
            return null;
        }
        return test;
    };
    
    // Initialize timer
    const initTimer = (duration) => {
        let timer = duration * 60;
        const timerElement = document.getElementById('test-timer');
        
        const interval = setInterval(() => {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (--timer < 0) {
                clearInterval(interval);
                document.getElementById('submit-test').click();
            }
        }, 1000);
        
        return interval;
    };
    
    // Initialize practice test
    const initPracticeTest = () => {
        const test = fetchPracticeTest();
        if (!test) {
            return `<div class="container py-5">
                <div class="alert alert-danger">Failed to load practice test</div>
            </div>`;
        }
        
        // Generate mock questions for the practice test
        const mockQuestions = generateMockQuestions(test.questions);
        
        // Render practice test
        const testContainer = document.getElementById('practice-test-container');
        testContainer.innerHTML = `
            <div class="card">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">${test.title}</h3>
                    <div class="timer-container">
                        <span class="timer-label">Time Remaining:</span>
                        <span id="test-timer" class="timer">00:00</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="test-info mb-4">
                        <p><strong>Duration:</strong> ${test.duration} minutes</p>
                        <p><strong>Questions:</strong> ${test.questions}</p>
                        <p><strong>Difficulty:</strong> ${test.difficulty}</p>
                    </div>
                    <form id="practice-test-form">
                        ${mockQuestions.map((question, qIndex) => `
                            <div class="test-question mb-4">
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
                            <button type="submit" id="submit-test" class="btn btn-primary btn-lg">Submit Test</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Start timer
        const timerInterval = initTimer(test.duration);
        
        // Add event listener for form submission
        document.getElementById('practice-test-form').addEventListener('submit', (e) => {
            e.preventDefault();
            clearInterval(timerInterval);
            
            const form = document.getElementById('practice-test-form');
            const answers = [];
            
            // Get all selected answers
            const questions = form.querySelectorAll('.test-question');
            questions.forEach(question => {
                const selectedOption = question.querySelector('input[type="radio"]:checked');
                if (selectedOption) {
                    answers.push(parseInt(selectedOption.value));
                } else {
                    answers.push(null);
                }
            });
            
            // Calculate mock score
            const score = calculateMockScore(answers, mockQuestions);
            const percentage = (score / mockQuestions.length) * 100;
            
            // Show result
            testContainer.innerHTML = `
                <div class="card">
                    <div class="card-body text-center">
                        <h2 class="mb-4">Test Result</h2>
                        <div class="result-circle mb-4">
                            <div class="result-percentage">${Math.round(percentage)}%</div>
                        </div>
                        <h4>You scored ${score} out of ${mockQuestions.length}</h4>
                        <p class="text-muted">Completed on ${new Date().toLocaleString()}</p>
                        <div class="mt-4">
                            <a href="/practice-tests" class="btn btn-primary" data-link>More Practice Tests</a>
                            <a href="/dashboard" class="btn btn-outline-primary ms-2" data-link>Go to Dashboard</a>
                        </div>
                    </div>
                </div>
            `;
            
            showToast('Test submitted successfully', 'success');
        });
    };
    
    // Generate mock questions for practice test
    const generateMockQuestions = (count) => {
        const questions = [];
        
        // Mock question templates for different types of aptitude questions
        const questionTemplates = [
            {
                question: "If a train travels at a speed of 60 km/hr, how long will it take to cover a distance of 240 km?",
                options: ["3 hours", "4 hours", "5 hours", "6 hours"],
                correctAnswer: 1
            },
            {
                question: "A shopkeeper sells an item at a 20% profit. If the cost price is ₹250, what is the selling price?",
                options: ["₹275", "₹300", "₹325", "₹350"],
                correctAnswer: 1
            },
            {
                question: "If 6 men can complete a work in 12 days, how many days will 8 men take to complete the same work?",
                options: ["8 days", "9 days", "10 days", "15 days"],
                correctAnswer: 0
            },
            {
                question: "The average of 5 consecutive numbers is 30. What is the largest number?",
                options: ["28", "30", "32", "34"],
                correctAnswer: 2
            },
            {
                question: "A car travels at a speed of 50 km/hr for 2 hours and then at 70 km/hr for 3 hours. What is the average speed?",
                options: ["58 km/hr", "60 km/hr", "62 km/hr", "65 km/hr"],
                correctAnswer: 1
            },
            {
                question: "If A:B = 3:4 and B:C = 2:3, then A:C = ?",
                options: ["1:2", "2:3", "3:4", "1:4"],
                correctAnswer: 0
            },
            {
                question: "A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?",
                options: ["10%", "12.5%", "15%", "20%"],
                correctAnswer: 1
            },
            {
                question: "If the perimeter of a square is 40 cm, what is its area?",
                options: ["64 sq cm", "81 sq cm", "100 sq cm", "121 sq cm"],
                correctAnswer: 2
            },
            {
                question: "A boat travels 20 km upstream in 4 hours and the same distance downstream in 2 hours. What is the speed of the boat in still water?",
                options: ["5 km/hr", "7.5 km/hr", "10 km/hr", "15 km/hr"],
                correctAnswer: 1
            },
            {
                question: "If 3x + 4y = 10 and 5x - 2y = 16, then x + y = ?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 1
            }
        ];
        
        // Logical reasoning questions
        const logicalQuestions = [
            {
                question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
                options: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBOC"],
                correctAnswer: 1
            },
            {
                question: "In a certain code, COMPUTER is written as RFUVQNPC. How will MEDICINE be written in the same code?",
                options: ["MFEDJJOE", "EOJDEJFM", "MFEJDJOE", "EOJDJEFM"],
                correctAnswer: 2
            },
            {
                question: "If A is coded as C, B as D, C as E, and so on, what will be the code for APPLE?",
                options: ["CRRNG", "CRRNF", "CRRNG", "DQQMF"],
                correctAnswer: 0
            },
            {
                question: "In a row of children, Rahul is 7th from the left and Mohan is 5th from the right. If they interchange their positions, Rahul becomes 11th from the left. How many children are there in the row?",
                options: ["15", "16", "17", "18"],
                correctAnswer: 1
            },
            {
                question: "If South-East becomes North, North-East becomes West, and so on, what will South become?",
                options: ["North-East", "North-West", "South-West", "East"],
                correctAnswer: 3
            }
        ];
        
        // Verbal ability questions
        const verbalQuestions = [
            {
                question: "Choose the word that is most nearly opposite in meaning to 'BENEVOLENT':",
                options: ["Malevolent", "Beneficial", "Benign", "Malignant"],
                correctAnswer: 0
            },
            {
                question: "Choose the word that is most nearly similar in meaning to 'ELOQUENT':",
                options: ["Elegant", "Fluent", "Graceful", "Intelligent"],
                correctAnswer: 1
            },
            {
                question: "Fill in the blank: The concert was _____ by the storm, so it had to be rescheduled.",
                options: ["Interrupted", "Disturbed", "Discontinued", "Intervened"],
                correctAnswer: 0
            },
            {
                question: "Choose the correctly spelt word:",
                options: ["Accomodation", "Accommodation", "Acommodation", "Accomodattion"],
                correctAnswer: 1
            },
            {
                question: "Choose the correct meaning of the idiom 'To bite the dust':",
                options: ["To be defeated", "To die", "To be humiliated", "To be dirty"],
                correctAnswer: 0
            }
        ];
        
        // Combine all question types
        const allQuestions = [...questionTemplates, ...logicalQuestions, ...verbalQuestions];
        
        // Randomly select questions based on count
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);
            questions.push(allQuestions[randomIndex]);
            // Remove the selected question to avoid duplicates
            allQuestions.splice(randomIndex, 1);
            
            // If we run out of questions, reset the array
            if (allQuestions.length === 0) {
                allQuestions.push(...questionTemplates, ...logicalQuestions, ...verbalQuestions);
            }
        }
        
        return questions;
    };
    
    // Calculate mock score
    const calculateMockScore = (answers, questions) => {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                score++;
            }
        });
        return score;
    };
    
    return `
        <div class="container py-5">
            <div id="practice-test-container">
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading practice test...</p>
                </div>
            </div>
        </div>
    `;
};

// Practice Test List Component
export const PracticeTestList = () => {
    // Fetch practice tests
    const fetchPracticeTests = () => {
        // Return mock data instead of API call
        return mockPracticeTests;
    };
    
    // Initialize practice test list
    const initPracticeTestList = () => {
        const tests = fetchPracticeTests();
        
        const testListContainer = document.getElementById('practice-test-list-container');
        
        if (tests.length === 0) {
            testListContainer.innerHTML = `
                <div class="alert alert-info">
                    No practice tests available yet.
                </div>
            `;
            return;
        }
        
        testListContainer.innerHTML = `
            <div class="row">
                ${tests.map(test => `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${test.title}</h5>
                                <p class="card-text">${test.description}</p>
                                <div class="test-details mb-3">
                                    <span class="badge bg-primary me-2">${test.duration} min</span>
                                    <span class="badge bg-secondary me-2">${test.questions} questions</span>
                                    <span class="badge bg-info">${test.difficulty}</span>
                                </div>
                                <div class="category-badge mb-2">${test.category}</div>
                            </div>
                            <div class="card-footer bg-white border-0">
                                <a href="/practice-test?id=${test.id}" class="btn btn-primary">Start Test</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };
    
    setTimeout(() => {
        initPracticeTestList();
    }, 500);
    
    return `
        <div class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Practice Tests</h2>
                <a href="/dashboard" class="btn btn-outline-primary" data-link>Back to Dashboard</a>
            </div>
            <div class="alert alert-info mb-4">
                <i class="fas fa-info-circle me-2"></i>
                Practice tests help you prepare for competitive exams by simulating the actual test environment. Complete these tests to improve your speed and accuracy.
            </div>
            <div id="practice-test-list-container">
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading practice tests...</p>
                </div>
            </div>
        </div>
    `;
}; 