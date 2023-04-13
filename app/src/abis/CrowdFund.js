export const crowdFundABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lastVaccTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'doseNumber',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_aadhar',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_nameOfLastVaccination',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_placeOfLastVaccination',
        type: 'string',
      },
    ],
    name: 'vaccinate',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_bytes32',
        type: 'bytes32',
      },
    ],
    name: 'bytes32ToString',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'individuals',
    outputs: [
      {
        internalType: 'uint256',
        name: 'vaccinationReceived',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'timeOfLastVaccination',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'nameOfLastVaccination',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'placeOfLastVaccination',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
