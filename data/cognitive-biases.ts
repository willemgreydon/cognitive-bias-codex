export interface CognitiveBias {
  id: string;
  name: string;
  description: string;
  example: string;
  category: string;
}

export interface BiasCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  biases: CognitiveBias[];
}

export const biasCategories: BiasCategory[] = [
  {
    id: "too-much-info",
    name: "Too Much Information",
    description: "We notice things already primed in memory or repeated often",
    color: "#4A90A4",
    biases: [
      {
        id: "availability-heuristic",
        name: "Availability Heuristic",
        description: "We overestimate the likelihood of events based on how easily examples come to mind",
        example: "Thinking shark attacks are more common after seeing news coverage",
        category: "too-much-info"
      },
      {
        id: "confirmation-bias",
        name: "Confirmation Bias",
        description: "We search for, interpret, and recall information that confirms our preexisting beliefs",
        example: "Only reading news sources that align with your political views",
        category: "too-much-info"
      },
      {
        id: "anchoring-bias",
        name: "Anchoring Bias",
        description: "We rely too heavily on the first piece of information encountered",
        example: "The first price you see for a product influences your perception of value",
        category: "too-much-info"
      },
      {
        id: "recency-effect",
        name: "Recency Effect",
        description: "We better remember the most recently presented information",
        example: "Remembering the last few items on a shopping list better than the middle ones",
        category: "too-much-info"
      }
    ]
  },
  {
    id: "not-enough-meaning",
    name: "Not Enough Meaning",
    description: "We fill in characteristics from stereotypes, generalities, and prior histories",
    color: "#5B9BD5",
    biases: [
      {
        id: "stereotyping",
        name: "Stereotyping",
        description: "We expect a member of a group to have certain characteristics without actual knowledge",
        example: "Assuming someone's abilities based on their age or appearance",
        category: "not-enough-meaning"
      },
      {
        id: "halo-effect",
        name: "Halo Effect",
        description: "Our overall impression of a person influences how we feel about their character",
        example: "Thinking attractive people are more competent",
        category: "not-enough-meaning"
      },
      {
        id: "fundamental-attribution-error",
        name: "Fundamental Attribution Error",
        description: "We attribute others' behavior to their character but our own to circumstances",
        example: "Thinking someone is late because they're disorganized, not traffic",
        category: "not-enough-meaning"
      },
      {
        id: "projection-bias",
        name: "Projection Bias",
        description: "We assume others share our beliefs, values, and opinions",
        example: "Thinking everyone finds the same things funny as you do",
        category: "not-enough-meaning"
      }
    ]
  },
  {
    id: "need-to-act-fast",
    name: "Need To Act Fast",
    description: "We favor simple-looking options and complete information over complex, ambiguous options",
    color: "#70AD47",
    biases: [
      {
        id: "default-effect",
        name: "Default Effect",
        description: "We tend to accept the default option when making decisions",
        example: "Sticking with pre-selected options in software or insurance plans",
        category: "need-to-act-fast"
      },
      {
        id: "loss-aversion",
        name: "Loss Aversion",
        description: "We prefer avoiding losses over acquiring equivalent gains",
        example: "Being more upset about losing $50 than happy about finding $50",
        category: "need-to-act-fast"
      },
      {
        id: "sunk-cost-fallacy",
        name: "Sunk Cost Fallacy",
        description: "We continue investing in something based on previously invested resources",
        example: "Continuing to watch a boring movie because you already paid for it",
        category: "need-to-act-fast"
      },
      {
        id: "urgency-effect",
        name: "Urgency Effect",
        description: "We prioritize tasks with shorter deadlines over more important tasks",
        example: "Doing urgent but unimportant emails before important long-term projects",
        category: "need-to-act-fast"
      }
    ]
  },
  {
    id: "what-should-we-remember",
    name: "What Should We Remember?",
    description: "We store memories differently based on how they were experienced",
    color: "#A5A5A5",
    biases: [
      {
        id: "peak-end-rule",
        name: "Peak-End Rule",
        description: "We judge experiences largely based on how they felt at their peak and end",
        example: "Remembering a vacation by its best moment and how it ended",
        category: "what-should-we-remember"
      },
      {
        id: "rosy-retrospection",
        name: "Rosy Retrospection",
        description: "We remember past events as being more positive than they actually were",
        example: "Thinking school days were better than they really were",
        category: "what-should-we-remember"
      },
      {
        id: "google-effect",
        name: "Google Effect",
        description: "We forget information that we know is easily accessible",
        example: "Not remembering phone numbers because they're saved in your contacts",
        category: "what-should-we-remember"
      },
      {
        id: "serial-position-effect",
        name: "Serial Position Effect",
        description: "We remember the first and last items in a series better than the middle items",
        example: "Remembering the beginning and end of a presentation but not the middle",
        category: "what-should-we-remember"
      }
    ]
  }
];