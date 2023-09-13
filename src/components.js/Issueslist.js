import React, { useState, useEffect } from "react";
import axios from "axios";

function IssueList() {
 const [issues, setIssues] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const owner = "github-username";
 const repo = "repository-name";

 useEffect(() => {
  // Replace 'YOUR-TOKEN' with your actual GitHub personal access token
  const token = "YOUR-TOKEN";

  const config = {
   headers: {
    Authorization: `token ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
   },
  };

  // Construct the URL for fetching issues
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

  axios
   .get(apiUrl, config)
   .then((response) => {
    setIssues(response.data);
    console.log(response);
    setLoading(false);
   })
   .catch((err) => {
    setError(err);
    setLoading(false);
   });
 }, []);

 return (
  <div>
   {loading ? (
    <p>Loading...</p>
   ) : error ? (
    <p>Error: {error.message}</p>
   ) : (
    <ul>
     {issues.map((issue) => (
      <li key={issue.id}>{issue.title}</li>
     ))}
    </ul>
   )}
  </div>
 );
}

export default IssueList;
