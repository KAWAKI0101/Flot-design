// src/DummyData/DummyPaymentData.js

export const PaymentHistory = [
  {
    id: '1',
    paymentId: 'PAY-10001',
    loanNo: 'FLT-10001',
    amount: 15000,
    paymentMethod: 'UPI',
    status: 'Success',
    date: '2025-01-15',
    time: '14:30',
    transactionId: 'TXN123456789',
  },
  {
    id: '2',
    paymentId: 'PAY-10002',
    loanNo: 'FLT-10001',
    amount: 7000,
    paymentMethod: 'Net Banking',
    status: 'Success',
    date: '2025-01-10',
    time: '11:45',
    transactionId: 'TXN987654321',
  },
  {
    id: '3',
    paymentId: 'PAY-10003',
    loanNo: 'FLT-10005',
    amount: 8000,
    paymentMethod: 'UPI',
    status: 'Pending',
    date: '2025-01-20',
    time: '16:20',
    transactionId: 'TXN456789123',
  },
  {
    id: '4',
    paymentId: 'PAY-10004',
    loanNo: 'FLT-10002',
    amount: 31500,
    paymentMethod: 'Credit Card',
    status: 'Success',
    date: '2025-01-05',
    time: '09:15',
    transactionId: 'TXN789123456',
  },
  {
    id: '5',
    paymentId: 'PAY-10005',
    loanNo: 'FLT-10004',
    amount: 62000,
    paymentMethod: 'Net Banking',
    status: 'Success',
    date: '2024-12-20',
    time: '13:45',
    transactionId: 'TXN321654987',
  },
  {
    id: '6',
    paymentId: 'PAY-10006',
    loanNo: 'FLT-10001',
    amount: 5000,
    paymentMethod: 'Debit Card',
    status: 'Failed',
    date: '2025-01-25',
    time: '10:15',
    transactionId: 'TXN654321987',
  },
  {
    id: '7',
    paymentId: 'PAY-10007',
    loanNo: 'FLT-10005',
    amount: 12000,
    paymentMethod: 'UPI',
    status: 'Success',
    date: '2025-01-18',
    time: '15:45',
    transactionId: 'TXN147258369',
  },
];

export const PaymentMethods = [
  { id: '1', name: 'UPI', icon: '💳', isDefault: true },
  { id: '2', name: 'Net Banking', icon: '🏦', isDefault: false },
  { id: '3', name: 'Credit Card', icon: '💳', isDefault: false },
  { id: '4', name: 'Debit Card', icon: '💳', isDefault: false },
  { id: '5', name: 'Wallet', icon: '👛', isDefault: false },
  { id: '6', name: 'Cash', icon: '💵', isDefault: false },
]; 