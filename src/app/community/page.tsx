'use client';
import React, { useState } from 'react';
import { summarizeContribution } from '@/ai/flows/actions';

export default function CommunityPage() {
  const [contributionText, setContributionText] = useState('');
  const [sourceQuality, setSourceQuality] = useState(0);
  const [artifactName, setArtifactName] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    setLoading(true);
    try {
      // Call your server action (adjust as needed if using Next.js server actions)
      const result = await summarizeContribution({
        contributionText,
        sourceQuality,
        artifactName,
      });
      setSummary(result.summary);
    } catch (error) {
      setSummary('Error summarizing contribution.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Community Contribution Summary</h1>

      <label>
        Artifact Name:
        <input
          type="text"
          value={artifactName}
          onChange={(e) => setArtifactName(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
      </label>

      <label>
        Contribution Text:
        <textarea
          value={contributionText}
          onChange={(e) => setContributionText(e.target.value)}
          rows={6}
          style={{ width: '100%', marginBottom: 10 }}
        />
      </label>

      <label>
        Source Quality (0-10):
        <input
          type="number"
          value={sourceQuality}
          min={0}
          max={10}
          onChange={(e) => setSourceQuality(Number(e.target.value))}
          style={{ width: '100%', marginBottom: 10 }}
        />
      </label>

      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize Contribution'}
      </button>

      {summary && (
        <section style={{ marginTop: 20 }}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}
    </main>
  );
}




