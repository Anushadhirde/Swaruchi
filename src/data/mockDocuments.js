export const MOCK_DOCUMENTS = [
  {
    id: "doc-01",
    title: "NSSO 78th Round Instruction Manual - Household Social Consumption (Education)",
    category: "Survey Guidelines",
    fileSize: "4.2 MB",
    pages: 142,
    dateUploaded: "2025-11-10",
    description: "Official field operational manual for NSS 78th Round covering household identification, sample allocation across rural/urban FSU blocks, and expenditure categorization.",
    content: `CHAPTER 2: CONCEPTS AND DEFINITIONS
2.1 First Stage Units (FSU): The First Stage Units (FSUs) are villages in the rural sector and Urban Frame Survey (UFS) blocks in the urban sector. For large FSUs requiring sub-division, Hamlet-groups (hg) / Sub-blocks (sb) are formed according to the population size specified in Chapter 3.

2.2 Neyman Allocation in Stratification: Sample size for each stratum within a state/UT is allocated in proportion to the total population as per Census 2011, adjusted by a multiplicative variance factor (S_h). In rural strata, villages with population exceeding 5,000 as per Census 2011 are split into two or more equal sub-strata.

2.3 Monthly Per Capita Expenditure (MPCE): MPCE is derived by dividing total household consumer expenditure during the 30-day reference period by household size. Household consumer expenditure includes food, non-food consumables, durable goods depreciation, and educational fees paid during the reference period.

CHAPTER 4: FIELD CAPI DATA AUDITS
4.5 Field Data Validation Protocols: Field investigators must record tablet GPS coordinates at the commencement of each household interview. A spatial deviation greater than 150 meters from the FSU centroid triggers an automatic supervisor warning flag in the CAPI portal.`
  },
  {
    id: "doc-02",
    title: "System of National Accounts (SNA 2008) India Implementation Manual",
    category: "National Accounts",
    fileSize: "6.8 MB",
    pages: 215,
    dateUploaded: "2026-01-15",
    description: "Comprehensive technical manual for GVA calculation, FISIM allocation across institutional sectors, and constant price series deflator adjustments.",
    content: `SECTION 3: GROSS VALUE ADDED & PRODUCTION BOUNDARY
3.1 Production Boundary Definition: Under SNA 2008, the production boundary includes all goods produced by institutional units for domestic consumption or sale, including own-account production of agricultural goods and housing services by owner-occupiers.

3.2 Derivation of GVA at Basic Prices: Gross Value Added (GVA) at basic prices is calculated as Gross Output at basic prices minus Intermediate Consumption at purchasers' prices. Basic price is the amount receivable by the producer excluding any tax payable and including any subsidy receivable on the product.

3.3 Financial Intermediation Services Indirectly Measured (FISIM): FISIM represents the interest differential earned by financial intermediaries between reference rate of interest and actual rates charged on loans / paid on deposits. FISIM is allocated to intermediate consumption of user industries and final consumption of households based on outstanding loan and deposit balances.`
  },
  {
    id: "doc-03",
    title: "MoSPI Technical Handbook on Consumer Price Index (CPI) Rebase Methodology",
    category: "Price Statistics",
    fileSize: "3.1 MB",
    pages: 98,
    dateUploaded: "2026-02-01",
    description: "Methodological guide for Laspeyres price index compilation, geometric mean item-level aggregation, and price outlier truncation algorithms.",
    content: `CHAPTER 1: CPI BASKET WEIGHTING & INDEX FORMULA
1.1 Index Aggregation: The Consumer Price Index (CPI) for Rural, Urban, and Combined sectors uses a modified Laspeyres formula. Elementary aggregate price indices are calculated using the geometric mean of price relatives (Jevons index formula) to eliminate substitution bias at the lowest item level.

1.2 Outlier Truncation Algorithm: If the month-on-month price relative (P_t / P_t-1) for any price quotation exceeds 2.5 times the interquartile range (IQR) of the item group in a state, the quotation is flagged for mandatory field verification within 48 hours.`
  }
];
