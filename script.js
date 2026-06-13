const chapters = document.querySelectorAll(".chapter");

const answerKey = {
  2: {
    q1: "B",
    q2: "D",
    q3: "C",
    q4: "D"
  },
  3: {
    q1: "B",
    q2: "B",
    q3: "B",
    q4: "C"
  },
  4: {
    q1: "C",
    q2: "B",
    q3: "B",
    q4: "C"
  }
};

function unlockSavedChapters() {
  chapters.forEach((chapter) => {
    const chapterNumber = Number(chapter.dataset.chapter);

    if (
      chapterNumber === 1 ||
      localStorage.getItem(`chapter${chapterNumber - 1}Passed`) === "true"
    ) {
      chapter.classList.remove("locked");
    }
  });
}

document.querySelectorAll(".continue-button").forEach((button) => {
  button.addEventListener("click", () => {
    const nextChapterNumber = Number(button.dataset.unlock);
    localStorage.setItem(`chapter${nextChapterNumber - 1}Passed`, "true");
    unlockSavedChapters();

    document.querySelector(`[data-chapter="${nextChapterNumber}"]`).scrollIntoView({
      behavior: "smooth"
    });
  });
});

document.querySelectorAll(".quiz").forEach((quiz) => {
  quiz.addEventListener("submit", (event) => {
    event.preventDefault();

    const chapterNumber = Number(quiz.dataset.passChapter);
    const correctAnswers = answerKey[chapterNumber];
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    Object.keys(correctAnswers).forEach((questionName) => {
      const selectedAnswer = quiz.querySelector(`input[name="${questionName}"]:checked`);

      if (selectedAnswer && selectedAnswer.value === correctAnswers[questionName]) {
        score++;
      }
    });

    if (score === totalQuestions) {
      localStorage.setItem(`chapter${chapterNumber}Passed`, "true");

      if (chapterNumber === 4) {
        alert("Well done. You have completed the module.");
      } else {
        alert("Correct. The next chapter is now unlocked.");
      }

      unlockSavedChapters();

      const nextChapter = document.querySelector(`[data-chapter="${chapterNumber + 1}"]`);
      if (nextChapter) {
        nextChapter.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      alert(`You scored ${score} out of ${totalQuestions}. Please try again.`);
    }
  });
});

unlockSavedChapters();