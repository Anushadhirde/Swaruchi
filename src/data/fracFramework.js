export const FRAC_PILLARS = [
  {
    id: "statistical",
    name: "Statistical Competencies",
    icon: "BarChart3",
    color: "#ff9933",
    gradient: "from-amber-500 to-orange-600",
    description: "Core methodologies for survey design, national accounting, price indices, sampling, and SDG tracking.",
    subdomains: [
      "Survey Design & Sampling Methods",
      "National Accounts & SNA 2008",
      "Price Statistics (CPI / WPI / IIP)",
      "Labour & Agricultural Statistics",
      "SDG Indicators & Metadata Standards",
      "Data Quality Frameworks (NQAF)"
    ]
  },
  {
    id: "technical",
    name: "Technical Competencies",
    icon: "Code2",
    color: "#38bdf8",
    gradient: "from-sky-500 to-blue-600",
    description: "Modern data science tools including Python, R, SQL, Stata, GIS mapping, AI/ML, and Open Data APIs.",
    subdomains: [
      "Python for Data Analysis",
      "R Statistical Computing",
      "SQL & Database Querying",
      "Stata & SPSS Econometrics",
      "GIS & Spatial Analytics",
      "AI/ML & Cloud Computing (MeghRaj)"
    ]
  },
  {
    id: "digital_governance",
    name: "Digital Governance",
    icon: "ShieldCheck",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    description: "Cybersecurity standards, DPDP Act compliance, digital signatures, government cloud infrastructure, and DPI.",
    subdomains: [
      "Cybersecurity & Threat Awareness",
      "Data Privacy (DPDP Act 2023)",
      "Digital Signatures & e-Office",
      "Government Cloud (MeghRaj / NIC)",
      "Digital Public Infrastructure (DPI)"
    ]
  },
  {
    id: "behavioural",
    name: "Behavioural & Managerial",
    icon: "Users",
    color: "#a855f7",
    gradient: "from-purple-500 to-indigo-600",
    description: "Leadership in public statistical systems, evidence-based policy communication, project management, and ethics.",
    subdomains: [
      "Evidence-Based Policy Leadership",
      "Public Communication & Data Storytelling",
      "Project & Survey Operations Management",
      "Professional Ethics & Impartiality",
      "Change Management & Agility"
    ]
  }
];

export const MOSPI_ROLES = [
  {
    id: "sso",
    title: "Senior Statistical Officer (SSO)",
    department: "National Sample Survey Office (NSSO)",
    cadre: "Indian Statistical Service (ISS) / Subordinate Statistical Service (SSS)",
    experienceYears: 6,
    description: "Responsible for field survey supervision, sample allocation, data validation, and quarterly survey report synthesis.",
    targets: {
      statistical: 85,
      technical: 75,
      digital_governance: 80,
      behavioural: 70
    }
  },
  {
    id: "asst_dir_na",
    title: "Assistant Director - National Accounts",
    department: "Central Statistics Office (CSO) - National Accounts Division",
    cadre: "Indian Statistical Service (ISS)",
    experienceYears: 8,
    description: "Leads GDP estimation, Gross Value Added (GVA) sector breakdown, input-output matrices, and SNA international alignment.",
    targets: {
      statistical: 92,
      technical: 82,
      digital_governance: 75,
      behavioural: 85
    }
  },
  {
    id: "data_analyst_cpi",
    title: "Data Analyst - Price Statistics & Indices",
    department: "Economic Statistics Division (ESD)",
    cadre: "Subordinate Statistical Service (SSS)",
    experienceYears: 4,
    description: "Monitors monthly CPI market price collections, IIP index calculations, and automated anomaly detection.",
    targets: {
      statistical: 80,
      technical: 88,
      digital_governance: 75,
      behavioural: 65
    }
  },
  {
    id: "field_investigator",
    title: "Field Investigator Supervisor",
    department: "Field Operations Division (FOD) - Regional Office",
    cadre: "Subordinate Statistical Service (SSS)",
    experienceYears: 3,
    description: "Executes CAPI mobile device survey data collection, household interviews, and regional quality audits.",
    targets: {
      statistical: 70,
      technical: 65,
      digital_governance: 85,
      behavioural: 75
    }
  },
  {
    id: "dir_it_analytics",
    title: "Director - IT & Advanced Big Data Analytics",
    department: "Computer Centre & Data Informatics Division",
    cadre: "Indian Statistical Service (ISS) / IT Division",
    experienceYears: 12,
    description: "Oversees MoSPI Big Data infrastructure, Cloud integration, automated AI web scrapers, and Open Data API architecture.",
    targets: {
      statistical: 85,
      technical: 95,
      digital_governance: 92,
      behavioural: 88
    }
  }
];

export const DIAGNOSTIC_QUESTIONS = [
  // Statistical
  {
    id: "stat_1",
    pillar: "statistical",
    question: "In Stratified Random Sampling across NSSO socio-economic rounds, what primary condition determines Neyman Optimum Allocation?",
    options: [
      "Sample size per stratum is inversely proportional to stratum standard deviation.",
      "Sample size per stratum is directly proportional to stratum size multiplied by stratum standard deviation.",
      "Sample size is distributed equally across all geographical regions regardless of variance.",
      "Stratum sample size depends solely on enumerator availability."
    ],
    correct: 1,
    explanation: "Under Neyman Optimum Allocation, stratum sample size ni is proportional to Ni * Si (where Ni is stratum population size and Si is stratum standard deviation)."
  },
  {
    id: "stat_2",
    pillar: "statistical",
    question: "When calculating Gross Domestic Product (GDP) using the Production Approach under SNA 2008, how is Gross Value Added (GVA) derived?",
    options: [
      "GVA = Total Final Consumption Expenditure + Exports - Imports",
      "GVA = Gross Output at basic prices minus Intermediate Consumption",
      "GVA = Total Taxes on Products minus Subsidies on Products",
      "GVA = Gross National Income minus Net Factor Income from Abroad"
    ],
    correct: 1,
    explanation: "Under SNA 2008, GVA at basic prices equals Gross Output minus Intermediate Consumption."
  },
  {
    id: "stat_3",
    pillar: "statistical",
    question: "Which index formula is currently utilized as the standard for India's Consumer Price Index (CPI) basket weight aggregator?",
    options: [
      "Unweighted Carli Index",
      "Laspeyres Modified Formula with base year fixed weights",
      "Paasche Index with current period dynamic weights",
      "Fisher's Ideal Geometric Mean Index"
    ],
    correct: 1,
    explanation: "India's CPI uses a Modified Laspeyres Price Index formula with fixed basket weights determined by Consumer Expenditure Surveys."
  },
  // Technical
  {
    id: "tech_1",
    pillar: "technical",
    question: "In Python (Pandas), which code snippet correctly handles missing values in a MoSPI survey dataframe 'df' by imputing stratum median values?",
    options: [
      "df.dropna(inplace=True)",
      "df['income'] = df.groupby('stratum_id')['income'].transform(lambda x: x.fillna(x.median()))",
      "df.replace(np.nan, 0)",
      "df.fillna(method='ffill')"
    ],
    correct: 1,
    explanation: "Grouping by stratum_id and transforming with fillna(x.median()) ensures stratum-specific median imputation without data leakage."
  },
  {
    id: "tech_2",
    pillar: "technical",
    question: "In SQL querying over NSSO household tables, which window function ranks households by monthly per capita consumption (MPCE) within each district?",
    options: [
      "RANK() OVER (PARTITION BY district_id ORDER BY mpce DESC)",
      "ROW_NUMBER() GROUP BY district_id HAVING mpce > 5000",
      "DENSE_RANK() BY mpce ORDER BY district_id",
      "SUM(mpce) OVER (ORDER BY district_id)"
    ],
    correct: 0,
    explanation: "PARTITION BY district_id combined with ORDER BY mpce DESC correctly ranks households within district boundaries."
  },
  {
    id: "tech_3",
    pillar: "technical",
    question: "Which GIS spatial join operation is required to map point-location GPS coordinates of field survey enterprises to District Administrative Polygons?",
    options: [
      "Point-in-Polygon Spatial Intersect",
      "Raster Resampling",
      "Buffer Zone Generation",
      "Convex Hull Delaunay Triangulation"
    ],
    correct: 0,
    explanation: "Point-in-Polygon spatial join assigns each GPS enterprise point to its containing district polygon boundary."
  },
  // Digital Governance
  {
    id: "gov_1",
    pillar: "digital_governance",
    question: "Under India's Digital Personal Data Protection (DPDP) Act 2023, what is the mandatory requirement before collecting microdata from households?",
    options: [
      "Informal oral confirmation",
      "Notice accompanied by explicit, informed consent specifying purpose in clear language",
      "Automated opt-in via mobile SMS without explicit notice",
      "No consent is necessary for any survey conducted by any agency"
    ],
    correct: 1,
    explanation: "DPDP Act 2023 mandates clear notice with explicit, granular consent specifying exact processing purpose."
  },
  {
    id: "gov_2",
    pillar: "digital_governance",
    question: "What primary encryption protocol and standard is mandatory for transferring confidential field survey microdata to MeghRaj Government Cloud?",
    options: [
      "Unencrypted FTP",
      "TLS 1.3 / AES-256 Bit Encryption with digital signatures",
      "Base64 string encoding",
      "MD5 hashing without key distribution"
    ],
    correct: 1,
    explanation: "Government cyber standards require TLS 1.3 in transit and AES-256 at rest with PKI digital signatures."
  },
  // Behavioural
  {
    id: "beh_1",
    pillar: "behavioural",
    question: "When presenting controversial or sensitive statistical inflation findings to public stakeholders, what is the core ethical duty of a Statistical Officer?",
    options: [
      "Modify figures to match public opinion trends",
      "Ensure total transparency, adherence to statistical methodology standards, and clear objective explanations",
      "Delay releasing data indefinitely until requested by external media",
      "Omit methodology details to simplify the report"
    ],
    correct: 1,
    explanation: "The Fundamental Principles of Official Statistics mandate methodological transparency, independence, and scientific objectivity."
  }
];
