// --- NAVIGASI MENU TAB ---
function switchTab(tabId) {
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-cyan-600', 'text-white', 'shadow-sm');
        btn.classList.add('text-slate-300');
    });

    document.getElementById(tabId).classList.add('active');
    const activeBtn = document.getElementById('btn-' + tabId);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-300');
        activeBtn.classList.add('bg-cyan-600', 'text-white', 'shadow-sm');
    }
}

// --- LAB SIMULASI REFLEKS PUPIL (Dioptimalkan agar ringan) ---
function setLightMode(mode) {
    const pupil = document.getElementById('sim-pupil');
    const title = document.getElementById('sim-status-title');
    const desc = document.getElementById('sim-status-desc');

    if (!pupil) return;

    if (mode === 'gelap') {
        pupil.style.width = '4.5rem';
        pupil.style.height = '4.5rem';
        title.innerText = "Kondisi: Ruangan Gelap / Redup";
        desc.innerText = "Pupil melebar secara otomatis agar cahaya minim dari ruangan gelap dapat diserap maksimal oleh retina.";
    } else if (mode === 'normal') {
        pupil.style.width = '2.5rem';
        pupil.style.height = '2.5rem';
        title.innerText = "Kondisi: Cahaya Normal / Seimbang";
        desc.innerText = "Pupil berukuran sedang untuk menyaring cahaya yang masuk secara ideal ke dalam mata.";
    } else if (mode === 'terang') {
        pupil.style.width = '1.2rem';
        pupil.style.height = '1.2rem';
        title.innerText = "Kondisi: Cahaya Terang Menyilaukan";
        desc.innerText = "Pupil mengecil secara otomatis untuk membatasi jumlah cahaya berlebih agar sel reseptor di retina tidak rusak.";
    }
}

// --- DATABASE SOAL KUIS IPA ---
const quizData = [
    {
        question: "Bagian luar bening pada mata yang berfungsi melindungi jaringan dalam sekaligus membiaskan cahaya pertama kali adalah...",
        options: ["Kornea", "Iris", "Lensa", "Retina"],
        answer: 0
    },
    {
        question: "Komponen mata yang bertanggung jawab memberikan warna khas mata dan mengatur besar kecilnya celah pupil ialah...",
        options: ["Saraf optik", "Iris", "Koroid", "Sklera"],
        answer: 1
    },
    {
        question: "Tempat menempelnya sel batang dan sel kerucut tempat terbentuknya bayangan objek penglihatan terletak di bagian...",
        options: ["Pupil", "Lensa mata", "Retina", "Kornea"],
        answer: 2
    },
    {
        question: "Penderita rabun jauh (miopi) tidak mampu melihat benda jauh dengan jelas karena bayangan jatuh di depan retina. Jenis lensa kacamata koreksinya adalah...",
        options: ["Lensa cembung (+)", "Lensa cekung (-)", "Lensa silindris", "Lensa datar"],
        answer: 1
    },
    {
        question: "Impuls sinyal elektrik visual dari retina diteruskan menuju pusat penglihatan di otak melalui perantara...",
        options: ["Otot siliaris", "Saraf optik", "Vreus humor", "Kornea"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let lockAnswer = false;

function startQuiz() {
    const startDiv = document.getElementById('quiz-start');
    const questionBox = document.getElementById('quiz-question-box');
    
    if (startDiv) startDiv.classList.add('hidden');
    if (questionBox) questionBox.classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    lockAnswer = false;
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.classList.add('hidden');

    const q = quizData[currentQuestionIndex];
    
    const qNum = document.getElementById('question-number');
    const qScore = document.getElementById('quiz-score');
    const qText = document.getElementById('question-text');

    if (qNum) qNum.innerText = `Soal ${currentQuestionIndex + 1} dari ${quizData.length}`;
    if (qScore) qScore.innerText = `Skor: ${score}`;
    if (qText) qText.innerText = q.question;

    const optionsContainer = document.getElementById('options-container');
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left px-4 py-3 bg-slate-950 border border-slate-800 hover:border-cyan-500 rounded-xl text-xs sm:text-sm font-medium text-slate-200 transition";
        btn.innerText = opt;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, buttonElement) {
    if (lockAnswer) return;
    lockAnswer = true;

    const q = quizData[currentQuestionIndex];
    const optionsContainer = document.getElementById('options-container');
    if (!optionsContainer) return;
    
    const allButtons = optionsContainer.children;

    if (selectedIndex === q.answer) {
        buttonElement.classList.remove('bg-slate-950', 'border-slate-800');
        buttonElement.classList.add('bg-emerald-950', 'border-emerald-600', 'text-emerald-300');
        score += 20;
    } else {
        buttonElement.classList.remove('bg-slate-950', 'border-slate-800');
        buttonElement.classList.add('bg-rose-950', 'border-rose-600', 'text-rose-300');
        if (allButtons[q.answer]) {
            allButtons[q.answer].classList.remove('bg-slate-950', 'border-slate-800');
            allButtons[q.answer].classList.add('bg-emerald-950', 'border-emerald-600', 'text-emerald-300');
        }
    }

    const qScore = document.getElementById('quiz-score');
    if (qScore) qScore.innerText = `Skor: ${score}`;
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const questionBox = document.getElementById('quiz-question-box');
    const resultDiv = document.getElementById('quiz-result');
    
    if (questionBox) questionBox.classList.add('hidden');
    if (resultDiv) resultDiv.classList.remove('hidden');

    const finalScoreText = document.getElementById('final-score-text');
    if (finalScoreText) finalScoreText.innerText = `Perolehan Skor Total: ${score} dari 100`;

    let badgeMsg = "";
    if (score === 100) {
        badgeMsg = "🌟 LUAR BIASA! Anda meraih predikat Pustakawan Ahli Biologi Mata Tingkat Sempurna.";
    } else if (score >= 60) {
        badgeMsg = "👏 KEREN! Pemahaman materi sistem penglihatan Anda sudah sangat baik.";
    } else {
        badgeMsg = "📚 Jangan menyerah! Silakan pelajari kembali menu Ensiklopedia Pustaka dan coba lagi.";
    }
    
    const badgeResult = document.getElementById('badge-result');
    if (badgeResult) badgeResult.innerText = badgeMsg;
}

function resetQuiz() {
    const resultDiv = document.getElementById('quiz-result');
    const startDiv = document.getElementById('quiz-start');
    
    if (resultDiv) resultDiv.classList.add('hidden');
    if (startDiv) startDiv.classList.remove('hidden');
}
