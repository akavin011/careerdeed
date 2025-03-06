const CourseDetails = () => {
    const course = {
        title: "Quantitative Aptitude Mastery",
        description: "Master mathematical concepts for competitive exams with our comprehensive course. Learn from industry expert Mohan Rajamani and practice with real exam questions.",
        image: "https://img.freepik.com/free-vector/realistic-math-chalkboard-background_23-2148154055.jpg",
        category: "Mathematics",
        price: "8000",
        duration: "3 months",
        lessons: "36 lessons",
        level: "All Levels",
        instructor: {
            name: "Mohan Rajamani",
            avatar: "https://img.freepik.com/free-photo/portrait-experienced-indian-businessman_23-2149383810.jpg",
            bio: "Expert Aptitude Trainer with extensive experience in preparing students for competitive exams",
            designation: "Lead Instructor"
        },
        curriculum: [
            {
                week: 1,
                title: "Foundation of Quantitative Aptitude",
                topics: [
                    "Number System Fundamentals",
                    "BODMAS and Its Applications",
                    "Percentages and Ratios",
                    "Practice Problems"
                ]
            },
            {
                week: 2,
                title: "Advanced Calculations",
                topics: [
                    "Time and Work",
                    "Speed, Time, and Distance",
                    "Profit and Loss",
                    "Real-world Applications"
                ]
            },
            {
                week: 3,
                title: "Critical Problem Solving",
                topics: [
                    "Data Interpretation",
                    "Complex Word Problems",
                    "Mock Tests",
                    "Performance Analysis"
                ]
            }
        ],
        features: [
            {
                icon: "fas fa-video",
                text: "36 hours of video content"
            },
            {
                icon: "fas fa-file",
                text: "Comprehensive study materials"
            },
            {
                icon: "fas fa-infinity",
                text: "Lifetime access"
            },
            {
                icon: "fas fa-mobile-alt",
                text: "Access on mobile and desktop"
            },
            {
                icon: "fas fa-certificate",
                text: "Certificate of completion"
            },
            {
                icon: "fas fa-comments",
                text: "Direct interaction with instructor"
            }
        ]
    };

    return `
        <div class="course-details-page">
            ${Navigation()}
            
            <div class="course-header py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <img src="${course.image}" class="img-fluid rounded mb-4" alt="${course.title}">
                            <h1 class="mb-3">${course.title}</h1>
                            <p class="lead">${course.description}</p>
                            
                            <div class="course-meta d-flex gap-4 mb-4">
                                <div>
                                    <i class="fas fa-clock me-2"></i>
                                    ${course.duration}
                                </div>
                                <div>
                                    <i class="fas fa-book me-2"></i>
                                    ${course.lessons}
                                </div>
                                <div>
                                    <i class="fas fa-signal me-2"></i>
                                    ${course.level}
                                </div>
                            </div>
                            
                            <div class="instructor-section mb-4">
                                <h3>Your Instructor</h3>
                                <div class="d-flex align-items-center gap-3">
                                    <img src="${course.instructor.avatar}" class="rounded-circle" width="60" height="60" alt="${course.instructor.name}">
                                    <div>
                                        <h5 class="mb-1">${course.instructor.name}</h5>
                                        <p class="mb-1">${course.instructor.designation}</p>
                                        <p class="mb-0">${course.instructor.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4">
                            <div class="card enrollment-card">
                                <div class="card-body">
                                    <h2 class="price-tag mb-4">₹${course.price}</h2>
                                    <button class="btn btn-primary w-100 mb-3">Enroll Now</button>
                                    <button class="btn btn-outline-primary w-100">Add to Wishlist</button>
                                    
                                    <div class="course-includes mt-4">
                                        <h5>This course includes:</h5>
                                        <ul class="list-unstyled">
                                            ${course.features.map(feature => `
                                                <li><i class="${feature.icon} me-2"></i> ${feature.text}</li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="curriculum-section py-5 bg-light">
                <div class="container">
                    <h2 class="mb-4">Course Curriculum</h2>
                    <div class="accordion" id="curriculumAccordion">
                        ${course.curriculum.map((week, index) => `
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#week${week.week}">
                                        Week ${week.week}: ${week.title}
                                    </button>
                                </h2>
                                <div id="week${week.week}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#curriculumAccordion">
                                    <div class="accordion-body">
                                        <ul class="list-group list-group-flush">
                                            ${week.topics.map(topic => `
                                                <li class="list-group-item">
                                                    <i class="fas fa-play-circle me-2"></i>
                                                    ${topic}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            ${Footer()}
        </div>
    `;
};

// Export the component
export { CourseDetails }; 