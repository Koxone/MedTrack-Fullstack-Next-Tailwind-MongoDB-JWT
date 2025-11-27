'use client';

import MedicalHistoryForm from '@/components/sections/auth/signUp/medical-history/MedicalHistoryForm';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/useGetAllQuestions';
import React from 'react';

function page() {
  const { questions, loading, error } = useGetAllQuestions();

  const filteredQuestions = questions?.filter(
    (question) => question?.specialty === 'weight' && question?.version === 'short'
  );

  const sortedQuestions = questions?.sort((a, b) => a.questionId - b.questionId);

  console.log(sortedQuestions);
  return (
    <div className='overflow-y-auto h-screen'>
      <MedicalHistoryForm />
      <div>
        {filteredQuestions?.map((question) => (
          <div key={question._id}>
            <h2>{question.text}</h2>
            <h3>{filteredQuestions?.length}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
