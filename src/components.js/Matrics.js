import React from "react";

function IssueMetrics({ issues }) {
 // Calculate status-wise counts
 const statusCounts = issues.reduce((counts, issue) => {
  const status = issue.state;
  counts[status] = (counts[status] || 0) + 1;
  return counts;
 }, {});

 // Calculate week-wise issue counts and average closure rate
 const weekData = issues.reduce(
  (data, issue) => {
   const createdAt = new Date(issue.created_at);
   const closedAt = issue.closed_at ? new Date(issue.closed_at) : null;

   const weekNumber = getWeekNumber(createdAt);
   data.weekCounts[weekNumber] = (data.weekCounts[weekNumber] || 0) + 1;

   if (closedAt) {
    data.closureCounts[weekNumber] = (data.closureCounts[weekNumber] || 0) + 1;
    const daysToClose = (closedAt - createdAt) / (1000 * 60 * 60 * 24);
    data.closureRates[weekNumber] = (data.closureRates[weekNumber] || 0) + 1 / daysToClose;
   }

   return data;
  },
  { weekCounts: {}, closureCounts: {}, closureRates: {} }
 );

 // Calculate ratio of new vs. closed issues per week
 const weeklyRatios = {};
 for (const weekNumber in weekData.weekCounts) {
  const newIssues = weekData.weekCounts[weekNumber];
  const closedIssues = weekData.closureCounts[weekNumber] || 0;
  const closureRate = weekData.closureRates[weekNumber] || 0;
  weeklyRatios[weekNumber] = {
   newIssues,
   closedIssues,
   ratio: closedIssues > 0 ? newIssues / closedIssues : newIssues,
   averageClosureRate: closedIssues > 0 ? closureRate / closedIssues : 0,
  };
 }

 return (
  <div>
   <h2>Issue Metrics</h2>
   <div>
    <h3>Status-wise Counts</h3>
    <pre>{JSON.stringify(statusCounts, null, 2)}</pre>
   </div>
   <div>
    <h3>Week-wise Issue Counts</h3>
    <pre>{JSON.stringify(weekData.weekCounts, null, 2)}</pre>
   </div>
   <div>
    <h3>Ratio of New vs. Closed Issues per Week</h3>
    <pre>{JSON.stringify(weeklyRatios, null, 2)}</pre>
   </div>
  </div>
 );
}

// Helper function to get week number
function getWeekNumber(date) {
 const d = new Date(date);
 d.setHours(0, 0, 0, 0);
 d.setDate(d.getDate() + 4 - (d.getDay() || 7));
 const yearStart = new Date(d.getFullYear(), 0, 1);
 const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
 return weekNumber;
}

export default IssueMetrics;
