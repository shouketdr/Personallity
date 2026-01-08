const quizData = [
    { q: "Do you enjoy fixing mechanical things or assembling furniture?", type: "Realistic" },
    { q: "Do you like spending time solving complex math or logic puzzles?", type: "Investigative" },
    { q: "Do you prefer expressing yourself through writing, music, or art?", type: "Artistic" },
    { q: "Do you feel energized when helping others solve personal problems?", type: "Social" },
    { q: "Do you enjoy leading a team to achieve a high-stakes goal?", type: "Enterprising" },
    { q: "Do you find satisfaction in organizing files and checking data for errors?", type: "Conventional" },
    { q: "Would you rather work outdoors than in a traditional office?", type: "Realistic" },
    { q: "Are you interested in studying how the universe or human body works?", type: "Investigative" },
    { q: "Do you like to come up with 'outside the box' creative solutions?", type: "Artistic" },
    { q: "Is teaching or mentoring others something you are passionate about?", type: "Social" }
];

let currentIdx = 0;
let scores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };

const resultsMap = {
    Realistic: { desc: "You are practical and hands-on. You prefer working with tools and objects.", jobs: ["Mechanical Engineer", "Surgeon", "Pilot"] },
    Investigative: { desc: "You are analytical and observant. You enjoy research and solving problems.", jobs: ["Data Scientist", "Software Engineer", "Researcher"] },
    Artistic: { desc: "You are imaginative and original. You thrive in creative environments.", jobs: ["UX Designer", "Architect", "Content Creator"] },
    Social: { desc: "You are helpful and empathetic. You excel at teaching and teamwork.", jobs: ["Psychologist", "Teacher", "Nurse Manager"] },
    Enterprising: { desc: "You are ambitious and persuasive. You enjoy leadership and business.", jobs: ["Entrepreneur", "Lawyer", "Marketing Director"] },
    Conventional: { desc: "You are organized and methodical. You value accuracy and data.", jobs: ["Financial Analyst", "Accountant", "Operations Manager"] }
};

function showQuestion() {
    document.getElementById("question-text").innerText = quizData[currentIdx].q;
    document.getElementById("progress").style.width = (currentIdx / quizData.length) * 100 + "%";
}

function handleAnswer(isYes) {
    if (isYes) {
        let type = quizData[currentIdx].type;
        scores[type]++;
    }
    currentIdx++;
    if (currentIdx < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-card").classList.remove("hidden");

    let winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    let data = resultsMap[winner];

    document.getElementById("user-type-title").innerText = winner;
    document.getElementById("type-description").innerText = data.desc;
    
    let list = document.getElementById("career-list");
    data.jobs.forEach(job => {
        let li = document.createElement("li");
        li.innerText = job;
        list.appendChild(li);
    });
}

function downloadPDF() {
    const element = document.getElementById('certificate-content');
    html2pdf().from(element).save('My_Career_Path.pdf');
}

showQuestion();