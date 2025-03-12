const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// Set proper MIME type for JavaScript modules
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.type('application/javascript');
    }
    next();
});

// Mock database for demo purposes
const users = [];
const courses = [
    {
        id: 1,
        title: "Quantitative Aptitude Mastery",
        description: "Master mathematical concepts for competitive exams with comprehensive coverage of arithmetic, algebra, geometry, and more.",
        fullDescription: "This course is designed to help you master the quantitative aptitude section of competitive exams. You'll learn strategies to solve complex problems quickly and accurately. The course covers arithmetic, algebra, geometry, trigonometry, mensuration, and data interpretation. Each topic includes theory, solved examples, shortcuts, and practice questions.",
        image: "https://img.freepik.com/free-vector/realistic-math-chalkboard-background_23-2148154055.jpg",
        category: "Mathematics",
        price: 8000,
        rating: 4.8,
        students: 1250,
        duration: "12 weeks",
        level: "Intermediate",
        lastUpdated: "2023-12-15",
        instructor: {
            name: "Mohan Rajamani",
            avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
            designation: "Lead Instructor",
            bio: "Mohan Rajamani has been teaching aptitude for over 15 years and has helped thousands of students crack competitive exams.",
            courses: 12,
            students: 15000,
            rating: 4.9
        },
        sections: [
            {
                title: "Number Systems and Arithmetic",
                lessons: [
                    { title: "Introduction to Number Systems", duration: "45 min", preview: true },
                    { title: "HCF and LCM", duration: "60 min", preview: false },
                    { title: "Percentages and Applications", duration: "75 min", preview: false },
                    { title: "Profit and Loss", duration: "60 min", preview: false },
                    { title: "Simple and Compound Interest", duration: "90 min", preview: false }
                ]
            },
            {
                title: "Algebra and Equations",
                lessons: [
                    { title: "Linear Equations", duration: "60 min", preview: false },
                    { title: "Quadratic Equations", duration: "75 min", preview: false },
                    { title: "Progressions and Series", duration: "90 min", preview: false },
                    { title: "Permutation and Combination", duration: "120 min", preview: false }
                ]
            },
            {
                title: "Geometry and Mensuration",
                lessons: [
                    { title: "Lines and Angles", duration: "45 min", preview: false },
                    { title: "Triangles and Theorems", duration: "90 min", preview: false },
                    { title: "Circles and Properties", duration: "75 min", preview: false },
                    { title: "Area and Volume", duration: "90 min", preview: false }
                ]
            }
        ],
        features: [
            "60+ hours of video content",
            "500+ practice questions",
            "25 mock tests",
            "Downloadable resources",
            "Mobile and TV access",
            "Certificate of completion",
            "Lifetime access"
        ],
        reviews: [
            {
                name: "Priya Sharma",
                avatar: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
                rating: 5,
                date: "2023-11-20",
                comment: "This course completely transformed my approach to quantitative aptitude. The shortcuts and techniques taught by Mohan sir are invaluable!"
            },
            {
                name: "Rahul Verma",
                avatar: "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
                rating: 4,
                date: "2023-10-15",
                comment: "Very comprehensive coverage of topics. The practice questions are challenging and helped me prepare well for my exam."
            },
            {
                name: "Ananya Patel",
                avatar: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
                rating: 5,
                date: "2023-09-28",
                comment: "The best aptitude course I've taken. Mohan sir explains complex concepts in a simple manner. Highly recommended!"
            }
        ]
    },
    {
        id: 2,
        title: "Logical Reasoning Pro",
        description: "Enhance your logical thinking and problem-solving skills for competitive exams and interviews.",
        fullDescription: "Develop your logical reasoning skills with this comprehensive course designed for competitive exams and job interviews. Learn to tackle various types of reasoning questions including verbal, non-verbal, and analytical reasoning. Master techniques to solve puzzles, coding-decoding, blood relations, syllogisms, and more.",
        image: "https://img.freepik.com/free-vector/brain-mechanism-gears-human-head-brainstorm-idea-generation_107791-8061.jpg",
        category: "Logic",
        price: 8000,
        rating: 4.7,
        students: 980,
        duration: "10 weeks",
        level: "All Levels",
        lastUpdated: "2023-11-20",
        instructor: {
            name: "Mohan Rajamani",
            avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
            designation: "Lead Instructor",
            bio: "Mohan Rajamani has been teaching aptitude for over 15 years and has helped thousands of students crack competitive exams.",
            courses: 12,
            students: 15000,
            rating: 4.9
        },
        sections: [
            {
                title: "Verbal Reasoning",
                lessons: [
                    { title: "Introduction to Logical Reasoning", duration: "30 min", preview: true },
                    { title: "Series Completion", duration: "45 min", preview: false },
                    { title: "Analogy and Classification", duration: "60 min", preview: false },
                    { title: "Coding-Decoding", duration: "75 min", preview: false },
                    { title: "Blood Relations", duration: "60 min", preview: false }
                ]
            },
            {
                title: "Non-Verbal Reasoning",
                lessons: [
                    { title: "Pattern Recognition", duration: "60 min", preview: false },
                    { title: "Figure Series", duration: "75 min", preview: false },
                    { title: "Mirror Images and Water Images", duration: "45 min", preview: false },
                    { title: "Paper Folding and Cutting", duration: "60 min", preview: false }
                ]
            },
            {
                title: "Analytical Reasoning",
                lessons: [
                    { title: "Statements and Arguments", duration: "60 min", preview: false },
                    { title: "Logical Deduction", duration: "90 min", preview: false },
                    { title: "Syllogisms", duration: "75 min", preview: false },
                    { title: "Puzzles and Arrangements", duration: "120 min", preview: false }
                ]
            }
        ],
        features: [
            "50+ hours of video content",
            "400+ practice questions",
            "20 mock tests",
            "Downloadable resources",
            "Mobile and TV access",
            "Certificate of completion",
            "Lifetime access"
        ],
        reviews: [
            {
                name: "Vikram Singh",
                avatar: "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
                rating: 5,
                date: "2023-10-25",
                comment: "The puzzles and arrangements section is particularly well-taught. I was able to solve complex problems with ease after taking this course."
            },
            {
                name: "Neha Gupta",
                avatar: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
                rating: 4,
                date: "2023-09-18",
                comment: "Very structured approach to logical reasoning. The practice questions are diverse and challenging."
            }
        ]
    },
    {
        id: 3,
        title: "Verbal Ability Excellence",
        description: "Improve your verbal reasoning and comprehension skills for competitive exams and professional growth.",
        fullDescription: "Enhance your verbal ability with this comprehensive course covering all aspects of English language proficiency required for competitive exams and professional communication. Master grammar, vocabulary, reading comprehension, and verbal reasoning. Learn techniques to tackle questions on synonyms, antonyms, sentence correction, para jumbles, and more.",
        image: "https://img.freepik.com/free-vector/hand-drawn-literature-concept_23-2149153543.jpg",
        category: "Verbal",
        price: 8000,
        rating: 4.6,
        students: 850,
        duration: "8 weeks",
        level: "Beginner to Advanced",
        lastUpdated: "2023-12-05",
        instructor: {
            name: "Mohan Rajamani",
            avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
            designation: "Lead Instructor",
            bio: "Mohan Rajamani has been teaching aptitude for over 15 years and has helped thousands of students crack competitive exams.",
            courses: 12,
            students: 15000,
            rating: 4.9
        },
        sections: [
            {
                title: "Grammar and Vocabulary",
                lessons: [
                    { title: "Parts of Speech", duration: "45 min", preview: true },
                    { title: "Tenses and Their Usage", duration: "60 min", preview: false },
                    { title: "Common Grammatical Errors", duration: "75 min", preview: false },
                    { title: "Vocabulary Building Techniques", duration: "60 min", preview: false },
                    { title: "Idioms and Phrases", duration: "45 min", preview: false }
                ]
            },
            {
                title: "Reading Comprehension",
                lessons: [
                    { title: "Comprehension Strategies", duration: "60 min", preview: false },
                    { title: "Inference and Deduction", duration: "75 min", preview: false },
                    { title: "Critical Reading", duration: "90 min", preview: false },
                    { title: "Speed Reading Techniques", duration: "45 min", preview: false }
                ]
            },
            {
                title: "Verbal Reasoning",
                lessons: [
                    { title: "Sentence Completion", duration: "60 min", preview: false },
                    { title: "Para Jumbles", duration: "75 min", preview: false },
                    { title: "Sentence Correction", duration: "60 min", preview: false },
                    { title: "Critical Reasoning", duration: "90 min", preview: false }
                ]
            }
        ],
        features: [
            "40+ hours of video content",
            "300+ practice questions",
            "15 mock tests",
            "Downloadable resources",
            "Mobile and TV access",
            "Certificate of completion",
            "Lifetime access"
        ],
        reviews: [
            {
                name: "Aditya Kumar",
                avatar: "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
                rating: 5,
                date: "2023-11-10",
                comment: "The reading comprehension section is excellent. I've seen a significant improvement in my speed and accuracy."
            },
            {
                name: "Sneha Reddy",
                avatar: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
                rating: 4,
                date: "2023-10-05",
                comment: "Very helpful for improving vocabulary and grammar. The idioms and phrases section was particularly useful."
            }
        ]
    }
];

const quizzes = [
    {
        id: 1,
        title: "Number Systems Quiz",
        courseId: 1,
        questions: [
            {
                question: "What is the HCF of 54 and 24?",
                options: ["6", "12", "18", "24"],
                correctAnswer: 0
            },
            {
                question: "If a number is divisible by 9, then it is also divisible by:",
                options: ["3", "6", "18", "27"],
                correctAnswer: 0
            },
            {
                question: "The LCM of 12, 15 and 20 is:",
                options: ["30", "60", "120", "180"],
                correctAnswer: 1
            }
        ]
    },
    {
        id: 2,
        title: "Logical Reasoning Quiz",
        courseId: 2,
        questions: [
            {
                question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
                options: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBOC"],
                correctAnswer: 1
            },
            {
                question: "In a certain code, COMPUTER is written as RFUVQNPC. How will MEDICINE be written in the same code?",
                options: ["MFEDJJOE", "EOJDEJFM", "MFEJDJOE", "EOJDJEFM"],
                correctAnswer: 2
            }
        ]
    }
];

const practiceTests = [
    {
        id: 1,
        title: "Quantitative Aptitude Practice Test 1",
        description: "Test your knowledge of number systems, arithmetic, and algebra",
        duration: 60,
        questions: 30,
        difficulty: "Medium"
    },
    {
        id: 2,
        title: "Logical Reasoning Practice Test 1",
        description: "Test your skills in verbal and non-verbal reasoning",
        duration: 45,
        questions: 25,
        difficulty: "Medium"
    },
    {
        id: 3,
        title: "Verbal Ability Practice Test 1",
        description: "Test your grammar, vocabulary, and reading comprehension",
        duration: 40,
        questions: 20,
        difficulty: "Easy"
    }
];

// API Routes
app.get('/api/courses', (req, res) => {
    const simplifiedCourses = courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        image: course.image,
        category: course.category,
        price: course.price,
        rating: course.rating,
        students: course.students,
        instructor: {
            name: course.instructor.name,
            avatar: course.instructor.avatar,
            designation: course.instructor.designation
        }
    }));
    res.json(simplifiedCourses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
});

app.get('/api/quizzes/course/:courseId', (req, res) => {
    const courseQuizzes = quizzes.filter(q => q.courseId === parseInt(req.params.courseId));
    if (courseQuizzes.length === 0) return res.status(404).json({ message: 'No quizzes found for this course' });
    res.json(courseQuizzes);
});

app.get('/api/practice-tests', (req, res) => {
    res.json(practiceTests);
});

// Authentication routes (mock implementation)
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    // In a real app, you would hash the password
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // In production, this would be hashed
        enrolledCourses: [],
        completedLessons: [],
        quizResults: []
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, you would generate a JWT token
    res.json({
        message: 'Login successful',
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// Course enrollment
app.post('/api/courses/:id/enroll', (req, res) => {
    const { userId } = req.body;
    const courseId = parseInt(req.params.id);
    
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    
    if (user.enrolledCourses.includes(courseId)) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    user.enrolledCourses.push(courseId);
    
    res.json({
        message: 'Enrolled successfully',
        enrolledCourses: user.enrolledCourses
    });
});

// Lesson completion
app.post('/api/courses/:courseId/lessons/:lessonId/complete', (req, res) => {
    const { userId } = req.body;
    const courseId = parseInt(req.params.courseId);
    const lessonId = req.params.lessonId;
    
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    const completedLesson = {
        userId,
        courseId,
        lessonId,
        completedAt: new Date().toISOString()
    };
    
    user.completedLessons.push(completedLesson);
    
    res.json({
        message: 'Lesson marked as complete',
        completedLessons: user.completedLessons
    });
});

// Quiz submission
app.post('/api/quizzes/:quizId/submit', (req, res) => {
    const { userId, answers } = req.body;
    const quizId = parseInt(req.params.quizId);
    
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
        if (index < quiz.questions.length && answer === quiz.questions[index].correctAnswer) {
            score++;
        }
    });
    
    const percentage = (score / quiz.questions.length) * 100;
    
    const quizResult = {
        userId,
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        percentage,
        submittedAt: new Date().toISOString()
    };
    
    user.quizResults.push(quizResult);
    
    res.json({
        message: 'Quiz submitted successfully',
        result: quizResult
    });
});

// Handle all routes for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

// Create server with error handling for port in use
const startServer = () => {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    server.on('error', (e) => {
        if (e.code === 'EADDRINUSE') {
            console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
            setTimeout(() => {
                server.close();
                app.listen(PORT + 1, () => {
                    console.log(`Server is running on http://localhost:${PORT + 1}`);
                });
            }, 1000);
        }
    });
};

startServer(); 