export interface CognitiveBias {
  id: string;
  name: string;
  description: string;
  example: string;
  category: string;
  explanation?: string;
  howToRecognize?: string[];
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
    description: "We notice things already primed in memory or repeated often, and filter information through our existing knowledge",
    color: "#4A90A4",
    biases: [
      {
        id: "availability-heuristic",
        name: "Availability Heuristic",
        description: "We estimate the likelihood of events based on how easily examples come to mind, not actual frequency",
        example: "After watching news about plane crashes, you might feel flying is more dangerous than driving, even though statistically driving is far riskier",
        category: "too-much-info",
        explanation: "This happens because vivid, recent, or emotionally charged events are easier to recall, making them seem more common than they actually are. Our brain uses memory accessibility as a shortcut for probability estimation.",
        howToRecognize: [
          "You change risk assessment after consuming media coverage",
          "Recent events feel more likely to happen again",
          "You overestimate dramatic but rare events",
          "Personal experiences heavily influence your probability judgments"
        ]
      },
      {
        id: "confirmation-bias",
        name: "Confirmation Bias",
        description: "We actively seek information that confirms our existing beliefs while avoiding contradictory evidence",
        example: "Only following social media accounts and news sources that align with your political views, creating an echo chamber that reinforces your existing opinions",
        category: "too-much-info",
        explanation: "This bias helps us maintain cognitive consistency but prevents learning and adaptation. We unconsciously filter information to protect our worldview from challenge.",
        howToRecognize: [
          "You dismiss opposing viewpoints without consideration",
          "Your information sources all share similar perspectives",
          "You feel uncomfortable when your beliefs are challenged",
          "You interpret ambiguous information as supporting your position"
        ]
      },
      {
        id: "anchoring-bias",
        name: "Anchoring Bias",
        description: "We rely too heavily on the first piece of information encountered when making decisions",
        example: "When negotiating salary, the first number mentioned heavily influences the final agreement, even if that initial number was arbitrary",
        category: "too-much-info",
        explanation: "The anchor serves as a reference point that distorts our judgment. Even when we try to adjust from the initial value, we typically don't move far enough away from it.",
        howToRecognize: [
          "Initial prices strongly influence your perception of value",
          "First impressions heavily weight your final judgment",
          "You struggle to ignore irrelevant starting information",
          "Your estimates cluster around recently mentioned numbers"
        ]
      },
      {
        id: "selective-attention",
        name: "Selective Attention",
        description: "We focus on certain information while ignoring other equally important details",
        example: "When looking to buy a specific car model, you suddenly notice that car everywhere, though the actual frequency hasn't changed",
        category: "too-much-info",
        explanation: "Our attention is limited, so we unconsciously filter information based on current goals, interests, and concerns. This can cause us to miss important but unrelated information.",
        howToRecognize: [
          "You notice things related to recent purchases or interests more often",
          "Important details are missed when focused on specific goals",
          "You're surprised by 'obvious' things others point out",
          "Your attention seems drawn to particular topics or objects"
        ]
      },
      {
        id: "illusory-truth",
        name: "Illusory Truth Effect",
        description: "Information feels more true the more often we hear it, regardless of its actual accuracy",
        example: "A false rumor spread repeatedly on social media starts to feel believable, even without any supporting evidence",
        category: "too-much-info",
        explanation: "Repetition increases familiarity, and our brain mistakes familiarity for truth. This is why propaganda and advertising often rely on repeated exposure rather than logical arguments.",
        howToRecognize: [
          "Claims feel more believable after hearing them multiple times",
          "You accept statements without checking their source",
          "Familiar phrases seem more credible than unfamiliar ones",
          "Repeated myths feel true despite lacking evidence"
        ]
      }
    ]
  },
  {
    id: "not-enough-meaning",
    name: "Not Enough Meaning",
    description: "We construct meaning from sparse information using patterns, stereotypes, and prior experiences",
    color: "#5B9BD5",
    biases: [
      {
        id: "clustering-illusion",
        name: "Clustering Illusion",
        description: "We see patterns in random data where none actually exist",
        example: "Believing a basketball player has a 'hot hand' and will make the next shot after making several in a row, when each shot is actually independent",
        category: "not-enough-meaning",
        explanation: "Our pattern-seeking brain evolved to detect real threats and opportunities, but this causes us to see meaningful connections in random events. This helps explain superstitions and conspiracy theories.",
        howToRecognize: [
          "You see patterns in random sequences or events",
          "Coincidences feel meaningful rather than chance",
          "You develop superstitions based on apparent patterns",
          "Random data seems to show trends or clusters"
        ]
      },
      {
        id: "halo-effect",
        name: "Halo Effect",
        description: "One positive trait creates a positive impression that extends to unrelated characteristics",
        example: "Assuming an attractive person is also intelligent, kind, and successful, or thinking a company with good customer service must also have superior products",
        category: "not-enough-meaning",
        explanation: "We unconsciously assume traits cluster together. If someone excels in one area, we assume they excel in others, even when there's no logical connection.",
        howToRecognize: [
          "First impressions strongly influence all subsequent judgments",
          "You attribute multiple positive qualities based on one trait",
          "Brand reputation influences product quality perception",
          "Physical attractiveness affects competence assumptions"
        ]
      },
      {
        id: "fundamental-attribution-error",
        name: "Fundamental Attribution Error",
        description: "We attribute others' behavior to their character while attributing our own behavior to circumstances",
        example: "When someone cuts you off in traffic, you think they're a rude person. When you cut someone off, it's because you're late for an important meeting",
        category: "not-enough-meaning",
        explanation: "We have access to our own thoughts and circumstances but can only observe others' actions. This asymmetry leads us to overemphasize personality factors for others while emphasizing situational factors for ourselves.",
        howToRecognize: [
          "You judge others by their actions but yourself by your intentions",
          "Others' mistakes reflect their character, yours reflect circumstances",
          "You assume others' behavior represents their typical pattern",
          "You give yourself benefit of the doubt but not others"
        ]
      },
      {
        id: "stereotyping",
        name: "Stereotyping",
        description: "We make assumptions about individuals based on their group membership",
        example: "Assuming an older person is not tech-savvy, or that someone from a certain profession has specific personality traits, without knowing them individually",
        category: "not-enough-meaning",
        explanation: "Stereotypes are mental shortcuts that help us quickly categorize information, but they often oversimplify complex individuals and can perpetuate unfair assumptions.",
        howToRecognize: [
          "You make assumptions about people based on their appearance",
          "Group membership influences individual trait expectations",
          "You're surprised when someone doesn't fit a stereotype",
          "Initial categorization affects subsequent information processing"
        ]
      },
      {
        id: "just-world-hypothesis",
        name: "Just-World Hypothesis",
        description: "We believe that people generally get what they deserve and deserve what they get",
        example: "Assuming someone who experienced misfortune must have done something wrong, or believing hard work always leads to success",
        category: "not-enough-meaning",
        explanation: "This bias helps us feel the world is predictable and fair, but it can lead to victim blaming and oversimplified explanations for complex outcomes.",
        howToRecognize: [
          "You blame victims for their circumstances",
          "Success is attributed mainly to merit, failure to character flaws",
          "You believe people generally deserve their fate",
          "Random misfortune feels like it must have a reason"
        ]
      }
    ]
  },
  {
    id: "need-to-act-fast",
    name: "Need To Act Fast",
    description: "We prefer simple options and quick decisions over complex analysis when under pressure",
    color: "#70AD47",
    biases: [
      {
        id: "loss-aversion",
        name: "Loss Aversion",
        description: "We feel the pain of losing more intensely than the pleasure of equivalent gains",
        example: "Refusing to sell a stock that's down 20% because you don't want to 'realize' the loss, even when better investment opportunities exist",
        category: "need-to-act-fast",
        explanation: "Psychologically, losses feel about twice as powerful as gains. This bias evolved to help us avoid dangerous risks, but it can prevent beneficial changes and rational decision-making.",
        howToRecognize: [
          "You avoid changing your situation to prevent potential losses",
          "The thought of losing something feels worse than gaining it feels good",
          "You hold onto declining investments or relationships",
          "You prefer the status quo even when change could benefit you"
        ]
      },
      {
        id: "sunk-cost-fallacy",
        name: "Sunk Cost Fallacy",
        description: "We continue investing in failing endeavors because of previously invested resources",
        example: "Staying in an unfulfilling job because you've already spent years there, or continuing to watch a boring movie because you paid for the ticket",
        category: "need-to-act-fast",
        explanation: "We irrationally factor in past investments when making future decisions. Resources already spent are gone regardless of future choices, but we struggle to ignore them.",
        howToRecognize: [
          "Past investment influences decisions about future investment",
          "You continue failing projects because of time already spent",
          "Previous costs make you reluctant to abandon strategies",
          "You think about what you've 'wasted' when considering changes"
        ]
      },
      {
        id: "status-quo-bias",
        name: "Status Quo Bias",
        description: "We prefer things to stay the same and resist change, even when change would be beneficial",
        example: "Keeping the same bank account, insurance, or phone plan for years without comparing alternatives, missing potential savings and improvements",
        category: "need-to-act-fast",
        explanation: "Change requires mental effort and involves uncertainty. Our brain conserves energy by maintaining current situations, even when alternatives might be better.",
        howToRecognize: [
          "You automatically renew subscriptions without considering alternatives",
          "Change feels risky even when current situation isn't ideal",
          "You stick with default options rather than customizing",
          "Inertia governs many of your decisions"
        ]
      },
      {
        id: "urgency-effect",
        name: "Urgency Effect",
        description: "We prioritize tasks with shorter deadlines over more important but less urgent tasks",
        example: "Spending time on immediate emails rather than working on a crucial long-term project that would have greater impact",
        category: "need-to-act-fast",
        explanation: "Deadlines create pressure that makes tasks feel important regardless of their actual significance. This bias helps us respond to immediate threats but can prevent progress on meaningful goals.",
        howToRecognize: [
          "Your schedule is dominated by urgent but minor tasks",
          "Important projects get delayed for immediate requests",
          "You feel busy but not productive",
          "Deadlines drive your priorities more than impact or value"
        ]
      },
      {
        id: "hyperbolic-discounting",
        name: "Hyperbolic Discounting",
        description: "We heavily discount future rewards in favor of immediate gratification",
        example: "Choosing to spend money on immediate pleasures rather than saving for retirement, or procrastinating on important tasks for immediate entertainment",
        category: "need-to-act-fast",
        explanation: "Present rewards feel much more valuable than future ones, even when future rewards are objectively larger. This bias helped our ancestors survive but can undermine long-term planning.",
        howToRecognize: [
          "You struggle with long-term planning and delayed gratification",
          "Present benefits always seem more appealing than future ones",
          "You procrastinate on important but non-urgent tasks",
          "Short-term pleasures consistently override long-term goals"
        ]
      }
    ]
  },
  {
    id: "what-should-we-remember",
    name: "What Should We Remember?",
    description: "We edit and reinforce memories based on how they were experienced and their perceived importance",
    color: "#A5A5A5",
    biases: [
      {
        id: "peak-end-rule",
        name: "Peak-End Rule",
        description: "We judge experiences based primarily on their peak moment and how they ended",
        example: "Rating a vacation based on the best day and the last day, while forgetting about mediocre days in between, or judging a medical procedure by its worst moment and final moments",
        category: "what-should-we-remember",
        explanation: "Our memory doesn't average all moments equally. The most intense point and the conclusion disproportionately influence our overall assessment, which can lead to surprising preferences.",
        howToRecognize: [
          "You judge experiences by their highlights and endings",
          "Duration of positive experiences doesn't affect overall rating much",
          "A good ending can redeem an otherwise poor experience",
          "Peak moments dominate your memory of events"
        ]
      },
      {
        id: "rosy-retrospection",
        name: "Rosy Retrospection",
        description: "We remember past events as more positive than they actually were",
        example: "Nostalgically remembering high school as 'the best years' while forgetting the stress, social drama, and uncertainty you felt at the time",
        category: "what-should-we-remember",
        explanation: "Over time, negative emotions fade faster than positive ones. We also tend to remember the general feeling of an experience rather than specific details, leading to an optimistic distortion.",
        howToRecognize: [
          "Past experiences seem better than they felt at the time",
          "You minimize previous negative emotions and challenges",
          "Older events feel more positive than recent similar events",
          "You're surprised by diary entries about 'good times'"
        ]
      },
      {
        id: "google-effect",
        name: "Google Effect (Digital Amnesia)",
        description: "We forget information that we know is easily accessible through external sources",
        example: "Not remembering your friends' phone numbers because they're in your phone, or forgetting facts because you know you can Google them",
        category: "what-should-we-remember",
        explanation: "Our brain optimizes storage by forgetting information that's readily available elsewhere. This adaptive strategy can become problematic when we lose access to external sources.",
        howToRecognize: [
          "You remember where to find information rather than the information itself",
          "Basic facts feel less important to memorize",
          "You feel lost without access to search engines or devices",
          "You rely on external memory more than internal knowledge"
        ]
      },
      {
        id: "self-serving-bias",
        name: "Self-Serving Bias",
        description: "We remember our successes more vividly than our failures and attribute them differently",
        example: "Clearly remembering times when your advice helped someone while forgetting when it backfired, or attributing successes to skill and failures to bad luck",
        category: "what-should-we-remember",
        explanation: "This bias protects our self-esteem by preserving positive self-image. We selectively remember and interpret events in ways that make us look good.",
        howToRecognize: [
          "Your memories make you look better than objective records",
          "You remember successes more clearly than failures",
          "Positive outcomes are attributed to your actions, negative ones to external factors",
          "You're surprised when others remember events differently"
        ]
      },
      {
        id: "hindsight-bias",
        name: "Hindsight Bias",
        description: "After learning an outcome, we believe we could have predicted it, distorting our memory of prior uncertainty",
        example: "After a stock market crash, feeling like the signs were obvious and you 'knew it would happen,' even though you were uncertain beforehand",
        category: "what-should-we-remember",
        explanation: "Knowing the outcome makes the path to that outcome seem inevitable. We unconsciously rewrite our memories to make past events seem more predictable than they actually were.",
        howToRecognize: [
          "Past events seem more predictable after they occur",
          "You feel like you 'knew it all along' when outcomes are revealed",
          "Your confidence in past predictions increases retrospectively",
          "Surprise outcomes suddenly seem obvious in hindsight"
        ]
      }
    ]
  }
];