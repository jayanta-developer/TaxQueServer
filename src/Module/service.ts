import mongoose from "mongoose";

const stepsType = new mongoose.Schema({
  title: String,
  summary: [
    {
      summary: String,
    },
  ],
  steps: [
    {
      step: String,
    },
  ],
});
const dueDateType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summarys: [
    {
      type: String,
    },
  ],
  tableData: {
    headers: [String],
    rows: [
      {
        type: Map,
        of: String
      }
    ]
  },
});
const eligibilityType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summarys: [
    {
      type: String,
    },
  ],
  eligibilityPoints: [
    {
      title: String,
      bulletPoints: [{ bullet: String }],
    },
  ],
});
const ThresholdType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summarys: [
    {
      type: String,
    },
  ],
});
const ComplianceType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summarys: [
    {
      type: String,
    },
  ],
  tableData: {
    headers: [String],
    rows: [
      {
        type: Map,
        of: String
      }
    ]
  },
});
const docRequiredType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summarys: [
    {
      type: String,
    },
  ],
  tableData: {
    headers: [String],
    rows: [
      {
        type: Map,
        of: String
      }
    ]
  },
});
const differenceType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summarys: [
    {
      type: String,
    },
  ],
  tableData: {
    headers: [String],
    rows: [
      {
        type: Map,
        of: String
      }
    ]
  }
});
const FAQItem = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const BenefitsType = new mongoose.Schema({
  title: {
    type: String,
  },
  summarys: [
    {
      type: String,
    },
  ],
  benefitsItems: [
    {
      title: {
        type: String,
      },
      summary: {
        type: String,
      },
    },
  ],
});

const keyFeatureType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summarys: [
    {
      type: String,
    },
  ],
  keyFeatureItems: [
    {
      title: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
    },
  ],
});

const overViewType = new mongoose.Schema({
  summarys: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
});
const productPriceItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  basicPrice: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ["Quarterly", "Monthly ", "Annually", "OneTime"],
    default: "Monthly"
  },
  summary: {
    type: String,
    required: true,
  },
  fetures: [
    {
      type: String,
      required: true,
    },
  ],
  MostPopular: {
    type: Boolean,
  },
});

const SummaryItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  category: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  feturePoints: [SummaryItem],
  overView: overViewType,
  whatIs: {
    summarys: [
      {
        type: String,
      },
    ],
    liList: [
      {
        title: {
          type: String,
        },
        summary: {
          type: String,
        },
      },
    ],
    Notice: {
      noticeTitle: String,
      noticeSummary: String,
    },
  },
  keyFeature: keyFeatureType,
  benefits: BenefitsType,
  difference: differenceType,
  documentsRequired: docRequiredType,
  MCACompliance: ComplianceType,
  ThresholdLimits: ThresholdType,
  Eligibility: eligibilityType,
  DueDate: dueDateType,
  Steps: [stepsType],

  priceData: [productPriceItem],
  display: String,
  FAQ: [FAQItem],
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  Slug: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "draft"],
    default: "active"
  }
});

module.exports = mongoose.model("service", ServiceSchema);
