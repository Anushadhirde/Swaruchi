import { FRAC_PILLARS } from '../data/fracFramework';

export function calculateCompetencyGap(userScores, targetScores) {
  const gaps = {};
  let totalGapWeight = 0;
  let totalTargetWeight = 0;
  let highestDeficitPillar = null;
  let maxDeficit = -1;

  FRAC_PILLARS.forEach((pillar) => {
    const userVal = userScores[pillar.id] || 0;
    const targetVal = targetScores[pillar.id] || 80;
    const deficit = Math.max(0, targetVal - userVal);
    const percentageAchieved = Math.min(100, Math.round((userVal / targetVal) * 100));

    gaps[pillar.id] = {
      pillarId: pillar.id,
      pillarName: pillar.name,
      userScore: userVal,
      targetScore: targetVal,
      deficit: deficit,
      percentageAchieved: percentageAchieved,
      status: deficit === 0 ? "Achieved" : deficit > 25 ? "High Deficit" : "Moderate Deficit"
    };

    totalGapWeight += userVal;
    totalTargetWeight += targetVal;

    if (deficit > maxDeficit) {
      maxDeficit = deficit;
      highestDeficitPillar = pillar.id;
    }
  });

  const overallReadinessIndex = Math.min(100, Math.round((totalGapWeight / totalTargetWeight) * 100));

  return {
    gaps,
    overallReadinessIndex,
    highestDeficitPillar,
    maxDeficit
  };
}

export function generatePersonalizedPathway(gapAnalysis, igotCourses, nsstaWorkshops) {
  const { gaps } = gapAnalysis;

  // Rank pillars by deficit size descending
  const sortedPillars = Object.values(gaps).sort((a, b) => b.deficit - a.deficit);

  const recommendedIgot = [];
  const recommendedNssta = [];

  sortedPillars.forEach((pillarGap) => {
    if (pillarGap.deficit > 0) {
      // Find matching iGOT courses for this pillar
      const matchingIgot = igotCourses.filter(c => c.pillar === pillarGap.pillarId);
      recommendedIgot.push(...matchingIgot);

      // Find matching NSSTA workshops
      const matchingNssta = nsstaWorkshops.filter(w => w.targetedPillar === pillarGap.pillarId);
      recommendedNssta.push(...matchingNssta);
    }
  });

  return {
    recommendedIgot: recommendedIgot.slice(0, 6),
    recommendedNssta: recommendedNssta.slice(0, 4),
    topPriorityPillar: sortedPillars[0]?.pillarName || "Statistical Competencies"
  };
}
