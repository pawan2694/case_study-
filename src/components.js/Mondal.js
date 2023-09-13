import React from "react";
import { Modal, Button } from "react-bootstrap";

function IssueModal({ issue, show, onHide }) {
 return (
  <Modal show={show} onHide={onHide}>
   <Modal.Header closeButton>
    <Modal.Title>Issue Details</Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <h4>{issue.title}</h4>
    <p>{issue.body}</p>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={onHide}>
     Close
    </Button>
   </Modal.Footer>
  </Modal>
 );
}

export default IssueModal;
