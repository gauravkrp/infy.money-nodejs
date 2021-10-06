/**
 * Lists out all enums and constants being used in AA APIs
 * Taken from RBI AA Specs at https://swagger-ui.rebit.org.in/?url=https://specifications.rebit.org.in/api_specifications/account_aggregator/AA_1_1_3.yaml#/
 * Author: Gaurav | https://github.com/gauravkrp
 * Last Updated on : 02 Oct, 2021
 */

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const CONSENT_MODE = {
  VIEW: 'VIEW',
  STORE: 'STORE',
  QUERY: 'QUERY',
  STREAM: 'STREAM',
};

const FETCH_TYPE = {
  ONETIME: 'ONETIME',
  PERIODIC: 'PERIODIC',
};

const CONSENT_TYPE = {
  PROFILE: 'PROFILE',
  SUMMARY: 'SUMMARY',
  TRANSACTIONS: 'TRANSACTIONS',
};

const FI_TYPE = {
  DEPOSIT: 'DEPOSIT',
  TERM_DEPOSIT: 'TERM_DEPOSIT',
  RECURRING_DEPOSIT: 'RECURRING_DEPOSIT',
  CREDIT_CARD: 'CREDIT_CARD',
  CERTIFICATES_OF_DEPOSIT: 'CD',
  SYSTEM_INVESTMENT_PLAN: 'SIP',
  COMMERCIAL_PAPER: 'CP',
  GOVT_SECURITIES: 'GOVT_SECURITIES',
  EQUITIES: 'EQUITIES',
  BONDS: 'BONDS',
  DEBENTURES: 'DEBENTURES',
  MUTUAL_FUNDS: 'MUTUAL_FUNDS',
  EXCHANGE_TRADED_FUNDS: 'ETF',
  EMPLOYEE_PROVIDENT_FUND: 'EPF',
  PUBLIC_PROVIDENT_FUND: 'PPF',
  INDIAN_REPOSITORY_RECEIPTS: 'IDR',
  COLLECTIVE_INVESTMENT_SCHEMES: 'CIS',
  ALTERNATIVE_INVESTMENT_FUNDS: 'AIF',
  INSURANCE_POLICIES: 'INSURANCE_POLICIES',
  UNIT_LINKED_INSURANCE_PLANS: 'ULIP',
  NATIONAL_PENSION_SYSTEM: 'NPS',
  INFRASTRUCTURE_INVESTMENT_TRUSTS: 'INVIT',
  REAL_ESTATE_INVESTMENT_TRUSTS: 'REIT',
  OTHER: 'OTHER',
};

const DATA_LIFE_UNIT = {
  MONTH: 'MONTH',
  YEAR: 'YEAR',
  DAY: 'DAY',
  INF: 'INF',
};

const FREQUENCY_UNIT = {
  HOUR: 'HOUR',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
  DAY: 'DAY',
  INF: 'INF',
};

const DATA_FILTER_TYPE = {
  TRANSACTIONTYPE: 'TRANSACTIONTYPE',
  TRANSACTIONAMOUNT: 'TRANSACTIONAMOUNT',
};

const DATA_FILTER_OPERATOR = {
  EQUAL_TO: '=',
  NOT_EQUAL_TO: '!= ',
  GREATER_THAN: '>',
  LESS_THAN: '<',
  GREATER_THAN_EQUAL_TO: '>=',
  LESS_THAN_EQUAL_TO: '<=',
};

const PURPOSE_CODE = {
  101: {
    code: '101',
    description: 'Wealth management service',
    refUri: 'https://api.rebit.org.in/aa/purpose/101.xml',
    category: {
      code: '01',
      name: 'Personal Finance',
    },
  },
  102: {
    code: '102',
    description: 'Customer spending patterns, budget or other reportings',
    refUri: 'https://api.rebit.org.in/aa/purpose/101.xml',
    category: {
      code: '01',
      name: 'Personal Finance',
    },
  },
  103: {
    code: '103',
    description: 'Aggregated statement',
    refUri: 'https://api.rebit.org.in/aa/purpose/101.xml',
    category: {
      code: '02',
      name: 'Financial Reporting',
    },
  },
  104: {
    code: '104',
    description: 'Explicit consent for monitoring of the accounts',
    refUri: 'https://api.rebit.org.in/aa/purpose/101.xml',
    category: {
      code: '03',
      name: 'Account Query and Monitoring',
    },
  },
  105: {
    code: '105',
    description: 'Explicit one-time consent for the accounts',
    refUri: 'https://api.rebit.org.in/aa/purpose/101.xml',
    category: {
      code: '03',
      name: 'Account Query and Monitoring',
    },
  },
};

const CONSENT_ARTEFACT_STATUS = {
  READY: 'READY',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
};

const SIGNED_CONSENT_STATUS = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  REVOKED: 'REVOKED',
  EXPIRED: 'EXPIRED',
};

const DATA_CONSUMER_TYPE = {
  FIU: 'FIU',
  AA: 'AA',
};

const DATA_PROVIDE_TYPE = {
  FIP: 'FIP',
  AA: 'AA',
};

const CONSENT_NOTIFICATION_STATUS = {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED',
  PAUSED: 'PAUSED',
  REJECTED: 'REJECTED',
};

const FI_NOTIFICATION_DATA_STATUS = {
  READY: 'READY',
  DENIED: 'DENIED',
  PENDING: 'PENDING',
  DELIVERED: 'DELIVERED',
  TIMEOUT: 'TIMEOUT',
};

const FI_NOTIFICATION_SESSION_STATUS = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
  FAILED: 'FAILED',
};

const HEART_BEAT_STATUS = {
  UP: 'UP',
  DOWN: 'DOWN',
};

module.exports = {
  HTTP_METHOD,
  CONSENT_MODE,
  FETCH_TYPE,
  CONSENT_TYPE,
  FI_TYPE,
  DATA_LIFE_UNIT,
  FREQUENCY_UNIT,
  DATA_FILTER_TYPE,
  DATA_FILTER_OPERATOR,
  PURPOSE_CODE,
  CONSENT_ARTEFACT_STATUS,
  SIGNED_CONSENT_STATUS,
  DATA_CONSUMER_TYPE,
  DATA_PROVIDE_TYPE,
  CONSENT_NOTIFICATION_STATUS,
  FI_NOTIFICATION_DATA_STATUS,
  FI_NOTIFICATION_SESSION_STATUS,
  HEART_BEAT_STATUS,
};
