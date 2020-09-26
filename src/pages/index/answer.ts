const QUESTION = {
  1: {
    key: "gender",
    res: ["MALE", "FEMALE"]
  },
  2: {
    key: "age",
    res: []
  },
  3: {
    key: "height",
    res: []
  },
  4: {
    key: "weight",
    res: []
  },
  5: {
    key: "pregnancy_status",
    res: ["NON_PREGNANT", "PREGNANT", "LACTATING", "PREPARING"]
  },
  6: {
    key: "health_goals",
    res: [
      "IMMUNITY",
      "FATIGUE",
      "WEIGHT",
      "SKIN",
      "FAT_LOSS",
      "WORKOUT",
      "EYES",
      "BRAIN",
      "SLEEP",
      "DIGESTION",
      "BONES"
    ]
  },
  7: {
    key: "weight_change",
    res: []
  },
  8: {
    key: "health_concerns",
    res: [
      "APPETITE",
      "MASTICATION",
      "CONSTIPATION",
      "DIARRHEA",
      "BLOATING",
      "DIGESTION",
      "WEIGHT",
      "MENSTRUATION",
      "SLEEP",
      "NONE"
    ]
  },
  9: {
    key: "disease",
    res: [
      "HYPERLIPIDEMIA",
      "HYPERTENSION",
      "HYPERURICEMIA",
      "HYPERGLYCEMIA",
      "ANEMIA",
      "OTHERS"
    ]
  },
  10: {
    key: "allergic",
    res: [true, false]
  },
  11: {
    key: "allergies",
    res: [
      "DAIRIES",
      "EGGS",
      "PEANUTS",
      "NUTS",
      "SOYBEANS",
      "WHEAT",
      "FISH",
      "SHELLFISH",
      "OTHERS"
    ]
  },
  12: {
    key: "lactose_intolerant",
    res: [true, false]
  },
  13: {
    key: "drinking",
    res: [true, false]
  },
  14: {
    key: "smoking",
    res: [true, false]
  },
  15: {
    key: "special_diet",
    res: [
      "LOW_CALORIES",
      "VEGETARIAN",
      "DASH",
      "MEDITERRANEAN",
      "KETO",
      "GLUTEN_FREE",
      "INTERMITTENT_FASTING",
      "OTHERS",
      "LOW_FAT",
      "NONE"
    ]
  },
  16: {
    key: "dietary_supplements",
    res: [
      "MULTIVITAMINS",
      "FISH_OIL",
      "VITAMIN_B_COMPLEX",
      "FIBER",
      "VITAMIN_B1",
      "VITAMIN_B2",
      "VITAMIN_B3",
      "VITAMIN_B6_B12_FOLATE",
      "VITAMIN_B5",
      "VITAMIN_B7",
      "CHOLINE",
      "VITAMIN_C",
      "CALCIUM",
      "VITAMIN_D",
      "PROTEIN"
    ]
  },
  17: {
    key: "picky",
    res: [true, false]
  },
  18: {
    key: "avoid_food",
    res: []
  },
  19: {
    key: "water_consumed",
    res: []
  },
  20: {
    key: "workout_freq",
    res: ["LOW", "MEDIUM", "HIGH", "NONE"]
  },
  21: {
    key: "cardio_time",
    res: []
  },
  22: {
    key: "cardio_time",
    res: []
  }
};

const storeResult = (result, question_index, inputs, freetext) => {
  console.log("question_index", question_index, inputs, freetext);
  console.log("inputs", inputs);
  console.log("freetext", freetext);
  console.log(result);
  const { key, res } = QUESTION[question_index];
  if (question_index < 6) {
    console.log(QUESTION[question_index]);
    console.log(QUESTION[question_index]["res"][inputs[0]]);
    // const key = QUESTION[question_index]["key"];
    // const res = QUESTION[question_index]["res"];
    if (freetext) {
      result["basic_info"][key] = freetext;
    } else {
      result["basic_info"][key] = QUESTION[question_index]["res"][inputs[0]];
    }
  }
  if (question_index == 7) {
    const key = QUESTION[question_index]["key"];
    const res = QUESTION[question_index]["res"];
    if (inputs == [1]) {
      result["weight_history"][key] = 0;
    }
  }
  if (question_index == 8) {
    const key = QUESTION[question_index]["key"];
    const res = QUESTION[question_index]["res"];
    if (freetext) {
      result["weight_history"][key] = freetext;
    }
    if (inputs.length == 2 && inputs[0] == 0) {
      result["weight_history"][key] = inputs[1] + 1;
    }
    if (inputs.length == 2 && inputs[0] == 1) {
      result["weight_history"][key] = -(inputs[1] + 1);
    }
  }
  if (question_index > 8 && question_index < 14) {
    console.log(result["health_history"]);
    if (result["health_history"][key] == undefined) {
      result[key] = [];
    }
    if ([6, 9, 10].includes(question_index)) {
      console.log(key, res);
      // const res = QUESTION[question_index]["res"];

      inputs.forEach(element => {
        result[key].push(QUESTION[question_index]["res"][element]);
      });
    }
    if ([10].includes(question_index)) {
      console.log(key, res);
      // const res = QUESTION[question_index]["res"];
      if (result[key] == undefined) {
        result[key] = [];
      }
      if (freetext != undefined || freetext != "") {
        result[key].push(freetext);
      }
    }
  }

  const basicInfo = {};
  const weightHisoty = {};
  return result;
};

export default storeResult;
