import React, { useState } from 'react';

function AppleDistributor() {
  const [appleWeights, setAppleWeights] = useState([]);
  const [result, setResult] = useState(null);
  const [weightInput, setWeightInput] = useState("");
  const [contributions, setContributions] = useState({ Ram: 50, Sham: 30, Rahim: 20 });

  const handleAddWeight = () => {
    const weight = parseInt(weightInput);
    if (!isNaN(weight) && weight > 0) {
      setAppleWeights([...appleWeights, weight]);
    }
    setWeightInput("");
  };

  const handleContributionChange = (e, person) => {
    const value = parseInt(e.target.value);
    setContributions(prev => ({ ...prev, [person]: isNaN(value) ? 0 : value }));
  };

  const distributeApples = () => {
    const totalAmount = 100;
    const totalWeight = appleWeights.reduce((acc, weight) => acc + weight, 0);

    const allocation = {
      Ram: Math.round((contributions.Ram / totalAmount) * totalWeight),
      Sham: Math.round((contributions.Sham / totalAmount) * totalWeight),
      Rahim: Math.round((contributions.Rahim / totalAmount) * totalWeight),
    };

    const distribution = { Ram: [], Sham: [], Rahim: [] };
    const sortedWeights = [...appleWeights].sort((a, b) => b - a);

    const assignApple = (person, weight) => {
      distribution[person].push(weight);
      allocation[person] -= weight;
    };

    const distributeLargestThenSmallest = () => {
      for (let i = 0; i < sortedWeights.length; i++) {
        if (allocation.Ram >= sortedWeights[i]) {
          assignApple('Ram', sortedWeights[i]);
        } else if (allocation.Sham >= sortedWeights[i]) {
          assignApple('Sham', sortedWeights[i]);
        } else {
          assignApple('Rahim', sortedWeights[i]);
        }
      }
    };

    distributeLargestThenSmallest();

    setResult(distribution);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Apple Distributor</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="number"
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
          placeholder="Enter apple weight in grams"
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddWeight}>Add Apple Weight</button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Set Contributions</h2>
        <label>
          Ram:
          <input
            type="number"
            value={contributions.Ram}
            onChange={(e) => handleContributionChange(e, 'Ram')}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label>
          Sham:
          <input
            type="number"
            value={contributions.Sham}
            onChange={(e) => handleContributionChange(e, 'Sham')}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label>
          Rahim:
          <input
            type="number"
            value={contributions.Rahim}
            onChange={(e) => handleContributionChange(e, 'Rahim')}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={distributeApples}>Distribute Apples</button>
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>Apple Weights: {appleWeights.join(', ')}</h2>
      </div>

      {result && (
        <div style={{ textAlign: "center" }}>
          <h2>Distribution Result:</h2>
          <p>Ram: {result.Ram.join(', ')} (Total: {result.Ram.reduce((acc, w) => acc + w, 0)}g)</p>
          <p>Sham: {result.Sham.join(', ')} (Total: {result.Sham.reduce((acc, w) => acc + w, 0)}g)</p>
          <p>Rahim: {result.Rahim.join(', ')} (Total: {result.Rahim.reduce((acc, w) => acc + w, 0)}g)</p>
        </div>
      )}
    </div>
  );
}

export default AppleDistributor;
