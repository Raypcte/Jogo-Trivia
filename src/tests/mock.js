const triviaSuccess = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Video Games',
      correct_answer: '21 de janeiro de 1998',
      difficulty: 'easy',
      incorrect_answers: [
        '21 de agosto de 1998',
        '21 de janeiro de 1999',
        '12 de fevereiro de 1997',
      ],
      question: 'Em qual ano fora lançado o jogo Resident Evil 2?',
      type: 'multiple',
    },
    {
      category: 'Entertainment: Video Games',
      correct_answer: 'Cayde-6',
      difficulty: 'easy',
      incorrect_answers: [
        'Zavala',
        'Eris',
        'Ikora',
      ],
      question: 'Qual o nome do(a) mentor(a) dos caçadores no jogo Destiny 2?',
      type: 'multiple',
    },
    {
      category: "Geography",
      correct_answer: "Jakarta",
      difficulty: 'easy',
      incorrect_answers: ['Bandung', 'Medan', 'Palembang'],
      question: "What is the capital of Indonesia?",
      type: "multiple",
    },
    {
      category: 'Entertainment: Video Games',
      correct_answer: 'Shao Kahn',
      difficulty: 'easy',
      incorrect_answers: ['Liu Kang', 'Shang Tsung', 'Raiden'],
      question: 'Who turns out to be the true victor in the Battle of Armageddon in Mortal Kombat?',
      type: 'multiple',
    },
    {
      category: 'Geography',
      correct_answer: '12',
      difficulty: 'medium',
      incorrect_answers: [
        'Zavala',
        'Eris',
        'Ikora',
      ],
      question: 'Qual o nome do(a) mentor(a) dos caçadores no jogo Destiny 2?',
      type: 'multiple',
    },
  ],
}
export const triviaFailed = {
  response_code: 3,
  results: [],
}

export default triviaSuccess;
