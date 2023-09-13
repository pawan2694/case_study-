import React, { useState, useEffect } from "react";
import axios from "axios";
import IssueList from "./IssueList";
import IssueMetrics from "./IssueMetrics";
import IssueModal from "./IssueModal";
import "./App.css";

function App() {
 const [issues, setIssues] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const [selectedIssue, setSelectedIssue] = useState(null);
 const [showModal, setShowModal] = useState(false);

 const openModal = (issue) => {
  setSelectedIssue(issue);
  setShowModal(true);
 };

 const closeModal = () => {
  setSelectedIssue(null);
  setShowModal(false);
 };

 useEffect(() => {
  // Replace 'YOUR-TOKEN' with your actual GitHub personal access token
  const token = "YOUR-TOKEN";

  const config = {
   headers: {
    Authorization: `token ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
   },
  };

  // Replace 'ORG' and 'REPO' with the organization and repository name
  const org = "ORG";
  const repo = "REPO";

  axios
   .get(`https://api.github.com/repos/${org}/${repo}/issues`, config)
   .then((response) => {
    setIssues(response.data);
    setLoading(false);
   })
   .catch((err) => {
    setError(err);
    setLoading(false);
   });
 }, []);

 return (
  <div className="App">
   <h1>Github Issue Tracker</h1>
   <IssueMetrics issues={issues} />

   {loading ? <p>Loading issues...</p> : error ? <p>Error: {error.message}</p> : <IssueList issues={issues} openModal={openModal} />}

   <IssueModal issue={selectedIssue} show={showModal} onHide={closeModal} />
  </div>
 );
}

export default App;
