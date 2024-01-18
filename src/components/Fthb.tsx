import React, { useState, useEffect } from "react";
const FirstTimeHomeBuyerCalculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [downpaymentPercent, setDownpaymentPercent] = useState(10);
  const [propertyType, setPropertyType] = useState(10);
  const [resultValue, setResultValue] = useState("$0");
  const [messageContent, setMessageContent] = useState("");
  const [isIneligible, setIsIneligible] = useState(false);
  const [downPaymentDolla, setDownPaymentDolla] = useState(50000);

  useEffect(() => {
    calc();
  }, [homePrice, annualIncome, downpaymentPercent, propertyType]);

  useEffect(() => {
    let downpayment: number = parseInt(
      ((homePrice * downpaymentPercent) / 100).toString(),
      10
    );
    setDownPaymentDolla(downpayment);
  }, [homePrice, downpaymentPercent]);

  const calc = () => {
    let FourTimesAnnualIncome = Number(
      (annualIncome * 4).toFixed(0)
    ).toLocaleString("en");
    let resultVal = 0;
    resultVal = homePrice * (propertyType / 100);
    let result = "$" + Number(resultVal.toFixed(0)).toLocaleString("en");

    let downpaymentDolla: number = parseInt(
      ((homePrice * downpaymentPercent) / 100).toString(),
      10
    );

    let mortgage = homePrice - downpaymentDolla;
    let message = "";

    if (annualIncome > 120000) {
      message =
        "You are ineligible for the Government Shared-Equity Incentive because your household income exceeds $120,000;";
      setIsIneligible(true);
      setResultValue("Ineligible");
    } else if (mortgage > annualIncome * 4) {
      message = `You are ineligible for the Government Shared-Equity Incentive because your mortgage amount (purchase price minus down payment) of $${FourTimesAnnualIncome} exceeds four times your annual household income.`;
      setIsIneligible(true);
      setResultValue("Ineligible");
    } else {
      setIsIneligible(false);
    }

    if (homePrice >= 525000) {
      message =
        "You are ineligible for the Government Shared-Equity Incentive because your asking price is $525,000 or higher. See the FAQ for details.";
      setIsIneligible(true);
      setResultValue("Ineligible");
    }

    setMessageContent(message);
    setResultValue(result);
  };

  return (
    <div className="uk-section uk-section-small">
      <div className="uk-container uk-container-large">
        <h2 className="pt-5 text-center">
          First Time Home Buyer Incentive Program Calculator
        </h2>
        <div className="first-buyer-calculator pt-5">
          <div className="row first-buyer-calculator-card">
            <div className="col-md-6 calculator-left">
              <h2 className="d-block text-center font-weight-bold py-2">
                Inputs
              </h2>
              <div className="input-icon-left form-group">
                <label>Home Price</label>
                <div className="input-group">
                  <div className="input-group-prepend input-group-prepend-custom uk-position-left">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    name="homePrice"
                    type="number"
                    className="form-control home-price padding-left-40"
                    pattern="^\d*(\.\d{0,2})?$"
                    value={homePrice}
                    onKeyUp={calc}
                    onInput={(e) =>
                      (e.target as HTMLInputElement).validity.valid ||
                      ((e.target as HTMLInputElement).value = "")
                    }
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="input-icon-left form-group">
                <label>Annual Household Income</label>
                <div className="input-group">
                  <div
                    className={`input-group-prepend input-group-prepend-custom uk-position-left`}
                  >
                    <span className={`input-group-text`}>$</span>
                  </div>
                  <input
                    name="annualIncome"
                    type="number"
                    className={`form-control annualIncome padding-left-40`}
                    pattern="^\d*(\.\d{0,2})?$"
                    value={annualIncome}
                    onKeyUp={calc}
                    onInput={(e) =>
                      (e.target as HTMLInputElement).validity.valid ||
                      ((e.target as HTMLInputElement).value = "")
                    }
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="input-icon-right form-group">
                <label>Down Payment</label>
                <div className="d-flex">
                  <div className="input-group">
                    <input
                      name="downpayment-percent"
                      type="number"
                      className="form-control downpayment-percent"
                      value={downpaymentPercent}
                      min="0"
                      max="100"
                      onKeyUp={calc}
                      onInput={(e) =>
                        (e.target as HTMLInputElement).validity.valid ||
                        ((e.target as HTMLInputElement).value = "")
                      }
                      onChange={(e) =>
                        setDownpaymentPercent(Number(e.target.value))
                      }
                    />
                    <div className="input-group-prepend input-group-prepend-custom end-0">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  <span className="font-symbol">=</span>
                  <div className="input-group">
                    <div className="input-group-prepend input-group-prepend-custom uk-position-left">
                      <span className="input-group-text">$</span>
                    </div>
                    <input
                      name="downpayment-dolla"
                      type="number"
                      className="form-control downpayment-dolla padding-left-40"
                      pattern="^\d*(\.\d{0,2})?$"
                      readOnly
                      value={downPaymentDolla}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 calculator-right">
              <h2 className="d-block text-center font-weight-bold py-2">
                Results
              </h2>
              <h2 className="d-block text-center py-2">
                You could qualify for...
              </h2>
              <div className="divider"></div>
              <div
                className={`results-container text-center py-2 ${
                  isIneligible ? "text-red-800" : ""
                }`}
              >
                <div className="results-header text-center">
                  Shared-Equity Incentive
                </div>
                {isIneligible ? (
                  <>
                    <span className="result-value font-2rem text-center py-2">
                      Ineligible
                    </span>
                  </>
                ) : (
                  <>
                    <span className="result-value font-2rem text-center py-2">
                      {resultValue}
                    </span>
                  </>
                )}
              </div>
              <div
                className={`text-center ${isIneligible ? "d-flex" : "d-none"}`}
              >
                <div className={`message-wrapper message-warning`}>
                  <svg
                    className="mui-svg-icon-root"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{
                      marginRight: "10px",
                      fontSize: "32px",
                      color: "#ED8936",
                    }}
                  >
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                  </svg>
                  <div className="message-content">{messageContent}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeHomeBuyerCalculator;
