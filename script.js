const careerQuestions = [
    { q: "Do you enjoy fixing mechanical things?", type: "Realistic" },
    { q: "Do you like solving complex math puzzles?", type: "Investigative" },
    { q: "Do you prefer expressing yourself through art?", type: "Artistic" },
    { q: "Do you feel energized when helping others?", type: "Social" },
    { q: "Do you enjoy leading a high-stakes team?", type: "Enterprising" },
    { q: "Do you like organizing data and files?", type: "Conventional" },
    { q: "Would you rather work outdoors?", type: "Realistic" },
    { q: "Do you like researching how things work?", type: "Investigative" },
    { q: "Do you like 'outside the box' solutions?", type: "Artistic" },
    { q: "Is mentoring others your passion?", type: "Social" }
];

const temperamentQuestions = [
    { q: "Are you quick to react and often feel 'fired up'?", m: "Fire" },
    { q: "Are you very social and love being around people?", m: "Air" },
    { q: "Are you calm, cool, and rarely get angry?", m: "Water" },
    { q: "Are you very deep, serious, and grounded?", m: "Earth" },
    { q: "Do you prefer hot weather over cold weather?", m: "Fire" },
    { q: "Do you find it easy to make new friends quickly?", m: "Air" },
    { q: "Do you prefer a slow-paced, steady lifestyle?", m: "Water" },
    { q: "Do you often overthink details before acting?", m: "Earth" },
    { q: "Are you naturally competitive and want to win?", m: "Fire" },
    { q: "Do you get bored easily and need constant change?", m: "Air" }
];

let currentIdx = 0;
let careerScores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };
let mijazScores = { Fire: 0, Air: 0, Water: 0, Earth: 0 };

function showQuestion() {
    let allQs = [...careerQuestions, ...temperamentQuestions];
    document.getElementById("question-text").innerText = allQs[currentIdx].q;
    document.getElementById("progress").style.width = (currentIdx / allQs.length) * 100 + "%";
}

function handleAnswer(isYes) {
    let allQs = [...careerQuestions, ...temperamentQuestions];
    let currentQ = allQs[currentIdx];

    if (isYes) {
        if (currentQ.type) careerScores[currentQ.type]++;
        if (currentQ.m) mijazScores[currentQ.m]++;
    }

    currentIdx++;
    if (currentIdx < allQs.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-card").classList.remove("hidden");

    let topCareer = Object.keys(careerScores).reduce((a, b) => careerScores[a] > careerScores[b] ? a : b);
    let topMijaz = Object.keys(mijazScores).reduce((a, b) => mijazScores[a] > mijazScores[b] ? a : b);

    const mijazInfo = {
        Fire: { name: "Choleric (Fire)", symbol: "🔥", desc: "You are bold, ambitious, and decisive. You have a high-energy 'hot' mijaz that drives you to lead." },
        Air: { name: "Sanguine (Air)", symbol: "🌬️", desc: "You are creative, talkative, and cheerful. Your 'air' mijaz makes you flexible and highly social." },
        Water: { name: "Phlegmatic (Water)", symbol: "💧", desc: "You are calm, patient, and reliable. Your 'cool' mijaz allows you to be a steady force in any team." },
        Earth: { name: "Melancholic (Earth)", symbol: "🌍", desc: "You are wise, analytical, and stable. Your 'dry' mijaz makes you a master of detail and planning." }
    };

    const careerPaths = {
        Realistic: ["Mechanical Engineer", "Surgeon", "Aviator"],
        Investigative: ["Research Scientist", "Data Analyst", "Professor"],
        Artistic: ["Creative Director", "Architect", "Author"],
        Social: ["Counselor", "Education Specialist", "Nurse"],
        Enterprising: ["Business Founder", "Lawyer", "Marketing Head"],
        Conventional: ["Financial Auditor", "Actuary", "Project Coordinator"]
    };

    // Update Certificate Content
    document.getElementById("mijaz-symbol").innerText = mijazInfo[topMijaz].symbol;
    document.getElementById("user-type-title").innerText = `${mijazInfo[topMijaz].name}`;
    document.getElementById("type-description").innerText = mijazInfo[topMijaz].desc + " Your professional leaning is " + topCareer + ".";
    
    let list = document.getElementById("career-list");
    list.innerHTML = ""; // Clear old list
    careerPaths[topCareer].forEach(job => {
        let li = document.createElement("li");
        li.innerText = job;
        list.appendChild(li);
    });
}

function downloadPDF() {
    const element = document.getElementById('certificate-content');
    const opt = {
        margin: 10,
        filename: 'My_Personality_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

showQuestion();


function sendFeedback(status) {
    // In a real app, this would send data to a database. 
    // For now, we will show a thank you message.
    console.log("User feedback received: " + status);
    document.querySelector(".feedback-btns").classList.add("hidden");
    document.getElementById("feedback-thanks").classList.remove("hidden");
}