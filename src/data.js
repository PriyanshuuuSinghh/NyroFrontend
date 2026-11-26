// All amounts use integer paise. This is a local, non-production demo service.
export const money = (paise, compact=false) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:compact?0:2,minimumFractionDigits:compact?0:2}).format(paise/100);
export const initialWallets = {main:12485000,settlement:3250000,upi:824000};
export const beneficiaries = [
  {id:'b1',name:'Aarav Shah',bank:'HDFC Bank',last4:'4821',initial:'AS'},
  {id:'b2',name:'Diya Mehta',bank:'ICICI Bank',last4:'0973',initial:'DM'},
  {id:'b3',name:'Neel Patel',bank:'Axis Bank',last4:'6308',initial:'NP'}
];
export const initialTransactions = [
  {id:'NYR-10482',name:'Aarav Shah',type:'Payout',amount:250000,fee:1000,status:'Completed',date:'Today, 10:42 AM',direction:'out',last4:'4821',bank:'HDFC Bank'},
  {id:'NYR-10481',name:'Wallet top-up',type:'Add money',amount:1000000,fee:0,status:'Completed',date:'Today, 09:15 AM',direction:'in'},
  {id:'NYR-10480',name:'Card bill payment',type:'Bill payment',amount:345000,fee:0,status:'Pending',date:'Yesterday, 4:30 PM',direction:'out'},
  {id:'NYR-10479',name:'Diya Mehta',type:'Payout',amount:720000,fee:1000,status:'Completed',date:'Yesterday, 2:08 PM',direction:'out',last4:'0973',bank:'ICICI Bank'},
  {id:'NYR-10478',name:'UPI collection',type:'Collection',amount:158000,fee:0,status:'Completed',date:'Yesterday, 11:26 AM',direction:'in'},
  {id:'NYR-10477',name:'Neel Patel',type:'Payout',amount:180000,fee:1000,status:'Failed',date:'23 Nov, 3:50 PM',direction:'out',last4:'6308',bank:'Axis Bank'}
];
export const feeFor = amount => amount>0?1000:0;
export function parseAmount(text){
  const raw=String(text).trim();
  if(!/^\d{1,9}(\.\d{1,2})?$/.test(raw)) return null;
  const [whole, decimal='']=raw.split('.');
  return Number(whole)*100+Number(decimal.padEnd(2,'0'));
}
export function validatePayout(text,balance){
  const amount=parseAmount(text);
  if(amount===null||amount<100) return 'Enter an amount of at least ₹1 with up to two decimal places.';
  if(amount+feeFor(amount)>balance) return 'Insufficient available balance, including the demo fee.';
  return '';
}
export function simulatePayout({amount,beneficiary,outcome,sequence}){
  if(!Number.isSafeInteger(amount)||amount<100||!beneficiary||!['Completed','Pending','Failed'].includes(outcome))throw Error('Invalid demo transfer');
  return {id:`NYR-${10500+sequence}`,name:beneficiary.name,type:'Payout',amount,fee:feeFor(amount),status:outcome,date:'Just now',direction:'out',last4:beneficiary.last4,bank:beneficiary.bank};
}
export function debitFor(tx){ return tx.status==='Completed'||tx.status==='Pending'?tx.amount+tx.fee:0; }
// Pending demo transfers reserve funds; failed transfers never debit the wallet.
