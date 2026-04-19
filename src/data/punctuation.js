// Each question is one of two types:
// fill:   show sentence with ___ blank, choose the correct punctuation mark
// choice: show a prompt, choose the correctly punctuated sentence from 4 options
// answer is always the index of the correct option (shuffled at runtime)

export const punctuationData = {

  // ── Level A: full stops · question marks · exclamation marks · commas in lists · contractions ──
  A: [
    { sentence: "The cat sat on the warm mat ___",             options: [".", "!", "?", ","],    answer: 0 },
    { sentence: "My favourite colour is blue ___",             options: [".", "!", "?", ","],    answer: 0 },
    { sentence: "The library opens at nine o'clock ___",       options: [".", "!", "?", ";"],    answer: 0 },
    { sentence: "She walked slowly to the park ___",           options: [".", "!", "?", ","],    answer: 0 },

    { sentence: "Watch out for the car ___",                   options: ["!", ".", "?", ","],    answer: 0 },
    { sentence: "What a brilliant idea ___",                   options: ["!", ".", "?", ";"],    answer: 0 },
    { sentence: "I can't believe we won ___",                  options: ["!", ".", "?", ","],    answer: 0 },

    { sentence: "What time does the film start ___",           options: ["?", ".", "!", ","],    answer: 0 },
    { sentence: "Have you seen my pencil case ___",            options: ["?", ".", "!", ";"],    answer: 0 },
    { sentence: "Where did you put the scissors ___",          options: ["?", ".", "!", ","],    answer: 0 },
    { sentence: "Did you remember to lock the door ___",       options: ["?", ".", "!", ","],    answer: 0 },

    { sentence: "I bought apples ___ bananas and oranges.",    options: [",", ".", ";", ":"],    answer: 0 },
    { sentence: "We visited Paris ___ Rome and Madrid.",       options: [",", ";", ".", ":"],    answer: 0 },
    { sentence: "He likes swimming ___ running and cycling.",  options: [",", ";", ".", ":"],    answer: 0 },
    { sentence: "She packed her bag ___ her lunch and her coat.", options: [",", ".", ";", "!"], answer: 0 },

    { sentence: "___ raining heavily outside.",                options: ["It's", "Its", "It'z", "Its'"],          answer: 0 },
    { sentence: "I ___ want any more cake.",                   options: ["don't", "dont", "do'nt", "d'ont"],      answer: 0 },
    { sentence: "She ___ be back until tomorrow.",             options: ["won't", "wont", "wo'nt", "wont'"],      answer: 0 },
    { sentence: "They ___ going to the park later.",           options: ["aren't", "arent", "are'nt", "arent'"],  answer: 0 },
    { sentence: "I ___ find my homework anywhere.",            options: ["can't", "cant", "ca'nt", "can'tt"],     answer: 0 },
    { sentence: "We ___ go swimming today.",                   options: ["couldn't", "couldnt", "could'nt", "cou'ldnt"], answer: 0 },
    { sentence: "He ___ know the answer.",                     options: ["didn't", "didnt", "di'dnt", "did'nt'"], answer: 0 },
    { sentence: "You ___ run in the corridor.",                options: ["mustn't", "mustnt", "must'nt", "mustnt'"], answer: 0 },
    { sentence: "I ___ finished my homework yet.",             options: ["haven't", "havent", "have'nt", "haven't'"], answer: 0 },
  ],

  // ── Level B: possessive apostrophes · colons · semi-colons · subordinate clause commas ──
  B: [
    // Singular possessives
    { sentence: "The ___ bone was buried in the garden.",      options: ["dog's", "dogs", "dogs'", "dog'z"],          answer: 0 },
    { sentence: "My ___ car is parked outside.",               options: ["sister's", "sisters", "sister'z", "sisters'"], answer: 0 },
    { sentence: "The ___ coat was left on the chair.",         options: ["teacher's", "teachers", "teacher'z", "teachers'"], answer: 0 },
    { sentence: "The ___ bedroom is painted blue.",            options: ["boy's", "boys", "boys'", "boy'z"],           answer: 0 },
    { sentence: "We found the ___ keys on the table.",         options: ["manager's", "managers", "managers'", "manager'z"], answer: 0 },

    // Plural possessives
    { sentence: "The ___ playground was full of noise.",       options: ["children's", "childrens", "childrens'", "children'z"], answer: 0 },
    { sentence: "The ___ changing rooms are at the back.",     options: ["girls'", "girl's", "girls", "girl'z"],       answer: 0 },
    { sentence: "The ___ locker room is on the left.",         options: ["boys'", "boy's", "boys", "boy'z"],           answer: 0 },
    { sentence: "The ___ staffroom is on the top floor.",      options: ["teachers'", "teacher's", "teachers", "teacher'z"], answer: 0 },

    // Colons introducing lists
    { sentence: "You will need the following ___ a pen, a ruler and a rubber.", options: [":", ",", ";", "."], answer: 0 },
    { sentence: "She had three pets ___ a cat, a rabbit and a goldfish.",        options: [":", ",", ";", "."], answer: 0 },
    { sentence: "The recipe uses four ingredients ___ flour, eggs, butter and sugar.", options: [":", ";", ",", "."], answer: 0 },
    { sentence: "There are three reasons ___ the first, the second and the third.",    options: [":", ";", ",", "."], answer: 0 },

    // Semi-colons
    { sentence: "It was raining heavily ___ we decided to stay inside.",         options: [";", ",", ":", "."], answer: 0 },
    { sentence: "Tom finished his homework ___ his sister was still working.",   options: [";", ",", ":", "."], answer: 0 },
    { sentence: "The museum was closed ___ we went to the park instead.",        options: [";", ",", ":", "."], answer: 0 },
    { sentence: "She was nervous about the exam ___ she had studied very hard.", options: [";", ",", ":", "."], answer: 0 },

    // Subordinate clause commas
    { sentence: "Although it was cold ___ we went for a walk.",             options: [",", ";", ":", "."], answer: 0 },
    { sentence: "Because she was tired ___ she went to bed early.",         options: [",", ";", ":", "."], answer: 0 },
    { sentence: "After the match ___ the team celebrated their win.",       options: [",", ";", ":", "."], answer: 0 },
    { sentence: "When the bell rings ___ you may leave the classroom.",     options: [",", ";", ":", "."], answer: 0 },
    { sentence: "Before you leave ___ make sure to sign the register.",     options: [",", ";", ":", "."], answer: 0 },
    { sentence: "I wanted to go swimming ___ however the pool was closed.", options: [",", ";", ":", "."], answer: 0 },
  ],

  // ── Level C: fronted adverbials · dashes · ellipsis · brackets · colon explanations · tricky possessives ──
  C: [
    // Fronted adverbials
    { sentence: "Slowly and carefully ___ she opened the ancient chest.",      options: [",", ";", ":", "."], answer: 0 },
    { sentence: "In the middle of the night ___ a strange noise woke her.",    options: [",", ";", ":", "."], answer: 0 },
    { sentence: "Trembling with excitement ___ he tore open the envelope.",    options: [",", ";", ":", "."], answer: 0 },
    { sentence: "After many years of practice ___ she mastered the piano.",    options: [",", ";", ":", "."], answer: 0 },
    { sentence: "Running as fast as she could ___ Maya reached the finish line.", options: [",", ";", ":", "."], answer: 0 },
    { sentence: "Despite the heavy rain ___ the match continued.",             options: [",", ";", ":", "."], answer: 0 },
    { sentence: "Having eaten his breakfast ___ James rushed to school.",      options: [",", ";", ":", "."], answer: 0 },
    { sentence: "With a loud crash ___ the vase fell to the floor.",           options: [",", ";", ":", "."], answer: 0 },

    // Dashes
    { sentence: "She had one goal ___ to win the championship.",               options: ["—", ":", ",", ";"], answer: 0 },
    { sentence: "There was one thing he feared ___ spiders.",                  options: ["—", ":", ",", ";"], answer: 0 },
    { sentence: "The concert ___ held in the open air ___ was magical.",       options: ["—", ",", "(", ";"], answer: 0 },

    // Ellipsis
    { sentence: "She opened the door and saw ___ nothing at all.",             options: ["…", "—", ";", ","], answer: 0 },
    { sentence: "He took a deep breath ___ and then he spoke.",                options: ["…", "—", ";", ","], answer: 0 },
    { sentence: "The story was just beginning ___",                            options: ["…", ".", "—", "!"], answer: 0 },

    // Colons introducing an explanation
    { sentence: "There was one problem ___ nobody had brought the key.",       options: [":", ";", ",", "."], answer: 0 },
    { sentence: "The experiment revealed something surprising ___ the liquid glowed in the dark.", options: [":", ";", ",", "."], answer: 0 },
    { sentence: "I have always believed one thing ___ hard work pays off.",    options: [":", ";", ",", "."], answer: 0 },

    // Semi-colons in complex lists
    { sentence: "She visited London, England ___ Paris, France and Rome, Italy.", options: [";", ",", ":", "."], answer: 0 },
    { sentence: "The team included Ali, the captain ___ Priya, the striker and Sam, the goalkeeper.", options: [";", ",", ":", "."], answer: 0 },

    // Brackets – choose the correctly punctuated sentence
    {
      type: "choice",
      prompt: "Which sentence uses brackets correctly?",
      options: [
        "The Eiffel Tower (completed in 1889) stands 330 metres tall.",
        "The Eiffel Tower (completed in 1889 stands 330 metres tall.",
        "The (Eiffel Tower completed in 1889) stands 330 metres tall.",
        "The Eiffel Tower completed (in 1889 stands) 330 metres tall.",
      ],
      answer: 0,
    },
    {
      type: "choice",
      prompt: "Which sentence uses brackets correctly?",
      options: [
        "My teacher (who had been ill) returned to school on Monday.",
        "My teacher (who had been ill returned to school on Monday.",
        "My (teacher who had been ill) returned to school on Monday.",
        "My teacher who had been ill) returned to school on Monday.",
      ],
      answer: 0,
    },

    // Tricky possessives
    { sentence: "The ___ decision at the end of the trial was final.",         options: ["jury's", "jurys'", "jurys", "jury'z"],     answer: 0 },
    { sentence: "We went to ___ house for the birthday party.",                options: ["Marcus's", "Marcus'", "Marcuss", "Marc'us"], answer: 0 },
  ],
};
