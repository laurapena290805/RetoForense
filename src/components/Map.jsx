import React from "react";
import ChallengeNode from "./ChallengeNode";
import "./Map.css";

export default function Map({ challenges, onComplete }) {
  return (
    <div className="challenges-container">
      {challenges.map((challenge) => (
        <ChallengeNode
  key={challenge.id}
  name={challenge.name}
  description={challenge.description}
  correctFlag={challenge.correctFlag}
  status={challenge.status}
  onComplete={() => onComplete(challenge.id)}
  folderHint={challenge.folderHint}
  challengeHint={challenge.challengeHint}  // Changed from hintContent to challengeHint
/>
      ))}
    </div>
  );
}