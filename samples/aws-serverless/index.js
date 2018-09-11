const { VoxaApp, AlexaPlatform } = require("voxa");

const views = {
  en: {
    translation: {
      FACTS: [
        "Pipeline Test fron English: A year on Mercury is just 88 days long.",
        "Pipeline Test: Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
        "Pipeline Test: Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.",
        "Pipeline Test: On Mars, the Sun appears about half the size as it does on Earth.",
        "Pipeline Test: Earth is the only planet not named after a god.",
        "Pipeline Test: Jupiter has the shortest day of all the planets.",
        "Pipeline Test: The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
        "Pipeline Test: The Sun contains 99.86% of the mass in the Solar System.",
        "Pipeline Test: The Sun is an almost perfect sphere.",
        "Pipeline Test: A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
        "Pipeline Test: Saturn radiates two and a half times more energy into space than it receives from the sun.",
        "Pipeline Test: The temperature inside the Sun can reach 15 million degrees Celsius.",
        "Pipeline Test: The Moon is moving approximately 3.8 cm away from our planet every year."
      ],
      SKILL_NAME: "Space Facts",
      GET_FACT_MESSAGE: "Here's your fact: ",
      HELP_MESSAGE:
        "You can say tell me a space fact, or, you can say exit... What can I help you with?",
      HELP_REPROMPT: "What can I help you with?",
      STOP_MESSAGE: "Goodbye!"
    }
  },
  "en-US": {
    translation: {
      FACTS: [
        "Pipeline Test fron English-US: A year on Mercury is just 88 days long.",
        "Pipeline Test fron English-US: Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
        "Pipeline Test fron English-US: Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.",
        "Pipeline Test fron English-US: On Mars, the Sun appears about half the size as it does on Earth.",
        "Pipeline Test fron English-US: Earth is the only planet not named after a god.",
        "Pipeline Test fron English-US: Jupiter has the shortest day of all the planets.",
        "Pipeline Test fron English-US: The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
        "Pipeline Test fron English-US: The Sun contains 99.86% of the mass in the Solar System.",
        "Pipeline Test fron English-US: The Sun is an almost perfect sphere.",
        "Pipeline Test fron English-US: A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
        "Pipeline Test fron English-US: Saturn radiates two and a half times more energy into space than it receives from the sun.",
        "Pipeline Test fron English-US: The temperature inside the Sun can reach 15 million degrees Celsius.",
        "Pipeline Test fron English-US: The Moon is moving approximately 3.8 cm away from our planet every year."
      ],
      SKILL_NAME: "American Space Facts"
    }
  },
  "en-GB": {
    translation: {
      FACTS: [
        "Pipeline Test fron English-GB: A year on Mercury is just 88 days long.",
        "Pipeline Test fron English-GB: Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
        "Pipeline Test fron English-GB: Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.",
        "Pipeline Test fron English-GB: On Mars, the Sun appears about half the size as it does on Earth.",
        "Pipeline Test fron English-GB: Earth is the only planet not named after a god.",
        "Pipeline Test fron English-GB: Jupiter has the shortest day of all the planets.",
        "Pipeline Test fron English-GB: The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
        "Pipeline Test fron English-GB: The Sun contains 99.86% of the mass in the Solar System.",
        "Pipeline Test fron English-GB: The Sun is an almost perfect sphere.",
        "Pipeline Test fron English-GB: A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
        "Pipeline Test fron English-GB: Saturn radiates two and a half times more energy into space than it receives from the sun.",
        "Pipeline Test fron English-GB: The temperature inside the Sun can reach 15 million degrees Celsius.",
        "Pipeline Test fron English-GB: The Moon is moving approximately 3.8 cm away from our planet every year."
      ],
      SKILL_NAME: "British Space Facts"
    }
  },
  de: {
    translation: {
      FACTS: [
        "Ein Jahr dauert auf dem Merkur nur 88 Tage.",
        "Die Venus ist zwar weiter von der Sonne entfernt, hat aber höhere Temperaturen als Merkur.",
        "Venus dreht sich entgegen dem Uhrzeigersinn, möglicherweise aufgrund eines früheren Zusammenstoßes mit einem Asteroiden.",
        "Auf dem Mars erscheint die Sonne nur halb so groß wie auf der Erde.",
        "Die Erde ist der einzige Planet, der nicht nach einem Gott benannt ist.",
        "Jupiter hat den kürzesten Tag aller Planeten.",
        "Die Milchstraßengalaxis wird in etwa 5 Milliarden Jahren mit der Andromeda-Galaxis zusammenstoßen.",
        "Die Sonne macht rund 99,86 % der Masse im Sonnensystem aus.",
        "Die Sonne ist eine fast perfekte Kugel.",
        "Eine Sonnenfinsternis kann alle ein bis zwei Jahre eintreten. Sie ist daher ein seltenes Ereignis.",
        "Der Saturn strahlt zweieinhalb mal mehr Energie in den Weltraum aus als er von der Sonne erhält.",
        "Die Temperatur in der Sonne kann 15 Millionen Grad Celsius erreichen.",
        "Der Mond entfernt sich von unserem Planeten etwa 3,8 cm pro Jahr."
      ],
      SKILL_NAME: "Weltraumwissen auf Deutsch",
      GET_FACT_MESSAGE: "Hier sind deine Fakten: ",
      HELP_MESSAGE:
        "Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?",
      HELP_REPROMPT: "Wie kann ich dir helfen?",
      STOP_MESSAGE: "Auf Wiedersehen!"
    }
  }
};

const voxaApp = new VoxaApp({ views });

voxaApp.onState("entry", {
  LaunchIntent: "GetFact",
  GetNewFactIntent: "GetFact"
});

voxaApp.onIntent("HelpIntent", {
  ask: "HELP_MESSAGE",
  reprompt: "HELP_REPROMPT",
  to: "entry"
});

voxaApp.onIntent("CancelIntent", {
  tell: "STOP_MESSAGE",
  to: "die"
});

voxaApp.onIntent("StopIntent", {
  tell: "STOP_MESSAGE",
  to: "die"
});

voxaApp.onState("GetFact", voxaEvent => {
  const factArr = voxaEvent.t("FACTS", { returnObjects: true });
  const factIndex = Math.floor(Math.random() * factArr.length);
  const randomFact = factArr[factIndex];

  // Create speech output
  const speechOutput = voxaEvent.t("GET_FACT_MESSAGE") + randomFact;
  return {
    flow: "terminate",
    sayp: speechOutput,
    alexaCard: {
      type: "Simple",
      title: voxaEvent.t("SKILL_NAME"),
      content: randomFact
    }
  };
});

const alexaSkill = new AlexaPlatform(voxaApp);
exports.handler = alexaSkill.lambda();
