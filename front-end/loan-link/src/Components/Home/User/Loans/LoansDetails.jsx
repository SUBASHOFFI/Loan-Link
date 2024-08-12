import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoansDetails = () => {
  const [loanDetails, setLoanDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        // Hardcoded backend URL
        const response = await axios.get('http://localhost:5454/auth/api/users_list');
        setLoanDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className='leftsideofpageofloandetails'>
        <h2>Loan Details</h2>
        <ul>
          {loanDetails.map((loan) => (
            <li key={loan.id}>
              <h3>{loan.loanName}</h3>
              <p><strong>Amount:</strong> ${loan.loanAmount}</p>
              <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
              <p><strong>Tenure:</strong> {loan.loanTenure} months</p>
              <p><strong>Eligibility:</strong> {loan.eligibilityCriteria}</p>
              <p><strong>Fees and Charges:</strong> {loan.feesAndCharges}</p>
              <p><strong>Documentation Requirements:</strong> {loan.documentationRequirements}</p>
              <p><strong>Disbursement Details:</strong> {loan.disbursementDetails}</p>
              <p><strong>Support and Services:</strong> {loan.supportAndServices}</p>
              <p><strong>Terms and Conditions:</strong> {loan.termsAndConditions}</p>
              <p><strong>Risk Assessment:</strong> {loan.riskAssessment}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='rightsideofpageofloandetails'>
        {/* You can add additional content or styling here */}
      </div>
    </div>
  );
};

export default LoansDetails;
