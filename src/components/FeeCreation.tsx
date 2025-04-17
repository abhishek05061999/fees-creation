import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBuilding, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './FeeCreation.css';

interface FeeCreationProps {
  onLogout: () => void;
}

interface FeeDetail {
  id: number;
  feeName: string;
  feeAmount: string;
}

const FeeCreation: React.FC<FeeCreationProps> = ({ onLogout }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [programLevel, setProgramLevel] = useState<string>('');
  const [programType, setProgramType] = useState<string>('');
  const [programName, setProgramName] = useState<string>('');
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [feeDetails, setFeeDetails] = useState<FeeDetail[]>([
    { id: 1, feeName: '', feeAmount: '' }
  ]);
  const [totalFeeAmount, setTotalFeeAmount] = useState<string>('0.00');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(true);
  const [filteredFeeDetails, setFilteredFeeDetails] = useState<FeeDetail[]>([]);

  // Sample data for dropdowns
  const programLevels = ['Graduate', 'Undergraduate', 'Diploma'];
  const programTypes = ['Regular', 'Distance', 'Online'];
  const colleges = [
    { id: 1, name: 'College of Engineering' },
    { id: 2, name: 'College of Business' },
    { id: 3, name: 'College of Arts' }
  ];

  // Move calculateTotalFeeAmount to useCallback to prevent re-creation on each render
  const calculateTotalFeeAmount = useCallback((details: FeeDetail[]) => {
    const total = details.reduce((sum, detail) => {
      const amount = parseFloat(detail.feeAmount) || 0;
      return sum + amount;
    }, 0);

    setTotalFeeAmount(total.toFixed(2));
  }, []);

  // Move checkAddButtonStatus to useCallback to prevent re-creation on each render
  const checkAddButtonStatus = useCallback((details: FeeDetail[]) => {
    // Check if any fee detail is missing a name or amount
    const hasEmptyFields = details.some(detail => 
      !detail.feeName.trim() || !detail.feeAmount.trim()
    );
    
    // Allow adding more rows as long as all existing rows are filled and we haven't reached the maximum
    const MAX_ROWS = 10;
    setAddButtonDisabled(hasEmptyFields || details.length >= MAX_ROWS);
  }, []);

  useEffect(() => {
    // Calculate initial total
    calculateTotalFeeAmount(feeDetails);

    // Check if add button should be enabled
    checkAddButtonStatus(feeDetails);
    
    // Initialize filtered fee details
    setFilteredFeeDetails(feeDetails);
  }, [calculateTotalFeeAmount, checkAddButtonStatus, feeDetails]);

  // Handle search functionality
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      // If search query is empty, show all fee details
      setFilteredFeeDetails(feeDetails);
      return;
    }

    // Filter fee details based on feeName containing the search query (case insensitive)
    const filtered = feeDetails.filter(detail =>
      detail.feeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredFeeDetails(filtered);
  }, [searchQuery, feeDetails]);

  // Update filtered details when search query changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery, handleSearch]); // Added handleSearch to the dependency array

  const handleStepClick = (step: number) => {
    setActiveStep(step);
    // Reset search when changing steps
    setSearchQuery('');
  };

  const handleAddFeeDetail = () => {
    const newId = feeDetails.length > 0 ? Math.max(...feeDetails.map(d => d.id)) + 1 : 1;
    const updatedDetails = [...feeDetails, { id: newId, feeName: '', feeAmount: '' }];
    setFeeDetails(updatedDetails);
    setAddButtonDisabled(true); // Disable button until new fields are filled
  };

  const handleRemoveFeeDetail = (id: number) => {
    const updatedDetails = feeDetails.filter(detail => detail.id !== id);
    setFeeDetails(updatedDetails);
    calculateTotalFeeAmount(updatedDetails);
  };

  const handleFeeDetailChange = (id: number, field: 'feeName' | 'feeAmount', value: string) => {
    // Simply update the field without the validation that prevents emptying
    const updatedDetails = feeDetails.map(detail => {
      if (detail.id === id) {
        return { ...detail, [field]: value };
      }
      return detail;
    });

    setFeeDetails(updatedDetails);

    if (field === 'feeAmount') {
      calculateTotalFeeAmount(updatedDetails);
    }
    
    // Check if the add button should be enabled or disabled
    checkAddButtonStatus(updatedDetails);
  };

  const handleSaveAndApply = () => {
    // In a real application, this would submit the data to a backend API
    alert('Fee structure saved successfully!');
  };

  return (
    <div className="container py-4">
      <div className="fee-creation-container">
        <div className="page-title-area">
          <h4>Fees Creation</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item active">Fees Creation</li>
            </ol>
          </nav>
        </div>

        <div className="fee-main-content">
          <div className="input-group search-container mb-4">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search fees..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={() => {
                handleSearch();
              }}
            >
              <FontAwesomeIcon icon={faSearch} className="me-2" /> Search
            </button>
          </div>
          
          <div className="card custom-card mb-4">
            <div className="card-body">
              <div className="steps-container mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                  <button
                    key={step}
                    className={`step-button ${activeStep === step ? 'active' : ''}`}
                    onClick={() => handleStepClick(step)}
                  >
                    Sem {step}
                  </button>
                ))}
              </div>

              <div className="section mb-4">
                <h5 className="section-title">Program Information</h5>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Program Level</label>
                    <select
                      className="form-select"
                      value={programLevel}
                      onChange={(e) => setProgramLevel(e.target.value)}
                    >
                      <option value="">Select</option>
                      {programLevels.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Program Type</label>
                    <select
                      className="form-select"
                      value={programType}
                      onChange={(e) => setProgramType(e.target.value)}
                    >
                      <option value="">Select</option>
                      {programTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Program Name</label>
                  <select
                    className="form-select"
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                  </select>
                </div>
              </div>

              <div className="section mb-4">
                <h5 className="section-title">Program Run in Colleges</h5>
                <div className="colleges-container">
                  {colleges.map((college) => (
                    <div
                      key={college.id}
                      className={`college-card ${selectedCollege === college.name ? 'selected' : ''}`}
                      onClick={() => setSelectedCollege(college.name)}
                    >
                      <div className="college-icon">
                        <FontAwesomeIcon icon={faBuilding} />
                      </div>
                      <div className="college-name">{college.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section">
                <h5 className="section-title">Fees Details</h5>
                
                <div className="mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="selectFeePayment">Select Fees Payment Type/grades</label>
                        <select className="form-select" id="selectFeePayment">
                          <option value="">Select</option>
                          <option value="1">Tuition Fee</option>
                          <option value="2">Lab Fee</option>
                          <option value="3">Sports Fee</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive mb-4">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>No.</th>
                        <th style={{ width: '45%' }}>Fees Name</th>
                        <th style={{ width: '35%' }}>Fees Amount</th>
                        <th style={{ width: '15%' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFeeDetails.map((detail, index) => (
                        <tr key={detail.id}>
                          <td>{index + 1}</td>
                          <td>
                            <input
                              type="text"
                              className={`form-control ${!detail.feeName.trim() ? 'is-invalid empty-field' : ''}`}
                              value={detail.feeName}
                              onChange={(e) => handleFeeDetailChange(detail.id, 'feeName', e.target.value)}
                              placeholder="Enter fee name"
                            />
                            {!detail.feeName.trim() && (
                              <div className="invalid-feedback d-block">
                                Fee name is required
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="input-group">
                              <span className="input-group-text">$</span>
                              <input
                                type="number"
                                className={`form-control ${!detail.feeAmount.trim() ? 'is-invalid empty-field' : ''}`}
                                value={detail.feeAmount}
                                onChange={(e) => handleFeeDetailChange(detail.id, 'feeAmount', e.target.value)}
                                placeholder="0.00"
                              />
                            </div>
                            {!detail.feeAmount.trim() && (
                              <div className="invalid-feedback d-block">
                                Fee amount is required
                              </div>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveFeeDetail(detail.id)}
                              disabled={feeDetails.length === 1}
                            >
                              <FontAwesomeIcon icon={faTrash} className="me-2" />Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="fee-summary mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <button 
                        className="btn btn-primary add-fee-btn" 
                        onClick={handleAddFeeDetail}
                        disabled={addButtonDisabled}
                        title={addButtonDisabled 
                          ? feeDetails.length >= 10 
                            ? "Maximum number of fee details reached (10)" 
                            : "Fill in all existing fee name and amount fields first"
                          : "Add new fee detail"
                        }
                      >
                        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />Add Fee Detail
                      </button>
                    </div>
                    <div className="col-md-6">
                      <div className="total-fee">
                        <span className="total-label">Total Fees Amount:</span>
                        <span className="total-value">${totalFeeAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="btn btn-light">
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveAndApply}>
                    Save & Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeCreation; 