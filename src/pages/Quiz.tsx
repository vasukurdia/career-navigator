import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Quiz as QuizComponent } from '@/components/quiz/Quiz';
import { jsBasicsQuestions } from '@/components/quiz/quizData';
import DashboardNavbar from '@/components/DashboardNavbar';

const QuizPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <>
      <Helmet>
        <title>Javascript Basics Quiz</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <DashboardNavbar />

        <main className="w-full px-6 pt-20 pb-12 flex flex-col items-center gap-6">
          <QuizComponent
            title="Javascript Basics Quiz"
            questions={jsBasicsQuestions}
            answers={answers}
            onAnswerChange={(qId, optId) => setAnswers((prev) => ({ ...prev, [qId]: optId }))}
            onQuizSubmit={(finalAnswers) => {
              console.log('Quiz submitted:', finalAnswers);
            }}
            className="w-full max-w-none"
          />
          <button
            onClick={() => navigate('/resume-screening')}
            className="text-sm text-muted-foreground underline hover:text-primary"
          >
            Back to Resume Screening
          </button>
        </main>
      </div>
    </>
  );
};

export default QuizPage;