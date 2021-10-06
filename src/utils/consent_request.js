const {
  CONSENT_MODE,
  FETCH_TYPE,
  FI_TYPE,
  CONSENT_TYPE,
  PURPOSE_CODE,
  DATA_LIFE_UNIT,
  FREQUENCY_UNIT,
} = require('./enums');
const uuid = require('./uuid');

const dateNow = new Date();
// const OneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
const FIDATA_start = new Date(2020, 0, 1);
const FIDATA_end = new Date(2023, 0, 1);

const consentStart = dateNow.toISOString();
const consentExpiry = FIDATA_end.toISOString();
const fiDataFrom = FIDATA_start.toISOString();

const ver = process.env.SETU_API_VERSION;
const fiu_id = process.env.FIU_ID;

const data_life_value = 10; // 10 years
const data_fetching_frequency = 10; // 10 times a day or month

const createConsentArtifact = mobileNumber => {
  const aa_handle = `${mobileNumber}@setu-aa`;
  const data = JSON.stringify({
    ver,
    timestamp: consentStart,
    txnid: uuid.create_UUID(),
    ConsentDetail: {
      consentStart,
      consentExpiry,
      consentMode: CONSENT_MODE.STORE,
      fetchType: FETCH_TYPE.PERIODIC,
      consentTypes: [CONSENT_TYPE.PROFILE, CONSENT_TYPE.SUMMARY, CONSENT_TYPE.TRANSACTIONS],
      fiTypes: [
        FI_TYPE.DEPOSIT,
        FI_TYPE.RECURRING_DEPOSIT,
        FI_TYPE.TERM_DEPOSIT,
        FI_TYPE.CREDIT_CARD,
        FI_TYPE.INSURANCE_POLICIES,
        FI_TYPE.MUTUAL_FUNDS,
        FI_TYPE.UNIT_LINKED_INSURANCE_PLANS,
        FI_TYPE.EMPLOYEE_PROVIDENT_FUND,
        FI_TYPE.PUBLIC_PROVIDENT_FUND,
        FI_TYPE.EQUITIES,
        FI_TYPE.BONDS,
        FI_TYPE.EXCHANGE_TRADED_FUNDS,
        FI_TYPE.GOVT_SECURITIES,
        FI_TYPE.SYSTEM_INVESTMENT_PLAN,
        FI_TYPE.NATIONAL_PENSION_SYSTEM,
      ],
      DataConsumer: { id: fiu_id },
      Customer: { id: aa_handle },
      Purpose: {
        code: PURPOSE_CODE['101'].code,
        refUri: PURPOSE_CODE['101'].refUri,
        text: PURPOSE_CODE['101'].description,
        Category: { type: PURPOSE_CODE['101'].category.name },
      },
      FIDataRange: {
        from: fiDataFrom,
        to: consentExpiry,
      },
      DataLife: { unit: DATA_LIFE_UNIT.YEAR, value: data_life_value },
      Frequency: { unit: FREQUENCY_UNIT.DAY, value: data_fetching_frequency },
    },
  });

  return data;
};

module.exports = createConsentArtifact;
