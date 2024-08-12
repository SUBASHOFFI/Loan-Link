import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoansDetails.css';
import { useNavigate } from 'react-router-dom';

const LoansDetails = () => {
  const navaigate = useNavigate();
  const [loanDetails, setLoanDetails] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [userDetails, setUserDetails] = useState({
    aadharNumber: '',
    panNumber: '',
    bankDetails: '',
    documents: null,
  });
  const GOBACKFROMLD =()=>{
    navaigate('/Home')
  }
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
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

  const handleApplyClick = (loan) => {
    setSelectedLoan(loan);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setUserDetails({
      ...userDetails,
      documents: e.target.files[0],
    });
  };

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      setPaymentStatus(true);
      alert('Payment Successful!');
    }, 1000);
  };

  const handleSubmit = () => {
    // Submit form data to backend
    const formData = {
      ...userDetails,
      loanId: selectedLoan.id,
      loanName: selectedLoan.loanName,
      loanAmount: selectedLoan.loanAmount,
      interestRate: selectedLoan.interestRate,
      loanTenure: selectedLoan.loanTenure,
    };
    console.log('Form Submitted:', formData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="loans-details-page">
      <div className="leftsideofpageofloandetails">
        <h2>Available Loans</h2>
        <ul>
          {loanDetails.map((loan) => (
            <li key={loan.id} className="loan-item">
              <h3>{loan.loanName}</h3>
              <p><strong>Amount:</strong> ${loan.loanAmount}</p>
              <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
              <p><strong>Tenure:</strong> {loan.loanTenure} months</p>
              <button 
                className="apply-button" 
                onClick={() => handleApplyClick(loan)}
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rightsideofpageofloandetails">
        {selectedLoan && (
          <div className="loan-application-form">
            <h2>Apply for {selectedLoan.loanName}</h2>
            <form>
              <div className="form-group">
                <label>Loan Amount</label>
                <input type="text" value={selectedLoan.loanAmount} disabled />
              </div>
              <div className="form-group">
                <label>Interest Rate</label>
                <input type="text" value={selectedLoan.interestRate} disabled />
              </div>
              <div className="form-group">
                <label>Loan Tenure</label>
                <input type="text" value={selectedLoan.loanTenure} disabled />
              </div>
              <div className="form-group">
                <label>Aadhaar Number</label>
                <input 
                  type="text" 
                  name="aadharNumber" 
                  value={userDetails.aadharNumber} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>PAN Number</label>
                <input 
                  type="text" 
                  name="panNumber" 
                  value={userDetails.panNumber} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Bank Details</label>
                <input 
                  type="text" 
                  name="bankDetails" 
                  value={userDetails.bankDetails} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Upload Documents</label>
                <input 
                  type="file" 
                  name="documents" 
                  onChange={handleFileChange} 
                />
              </div>
              <div className="payment-section">
                <button 
                  type="button" 
                  className="payment-button" 
                  onClick={handlePayment}
                >
                  Make Payment
                </button>
                {paymentStatus && <p className="payment-success">Payment Completed Successfully!</p>}
              </div>
              <button 
                type="button" 
                className="submit-button" 
                onClick={handleSubmit}
                disabled={!paymentStatus} // Disable submit if payment is not completed
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <button className="back-button" onClick={GOBACKFROMLD}>Back</button>
    </div>
  );
};

export default LoansDetails;
