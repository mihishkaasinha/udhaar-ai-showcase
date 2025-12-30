
import React, { useState } from 'react';
import { RecoveryInput } from '../types';

interface Props {
  onSubmit: (data: RecoveryInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<RecoveryInput>({
    customerName: '',
    amount: '',
    daysOverdue: '',
    customerType: 'SMB',
    paymentHistory: 'New Customer',
    previousAttempts: '0',
    paymentLink: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputContainerClasses = "relative group";
  const inputClasses = "w-full px-5 py-4 bg-slate-50/50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-semibold text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm group-hover:border-indigo-200 dark:group-hover:border-indigo-800";
  const labelClasses = "block text-[10px] font-black text-slate-700 dark:text-slate-200 ml-1 mb-2 uppercase tracking-[0.2em] transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400";

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/60 dark:shadow-none p-8 md:p-12 space-y-10 border border-white/50 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        <div className={inputContainerClasses}>
          <label className={labelClasses}>Debtor Identity</label>
          <input
            required
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="e.g., Rajesh Ji / TechCorp"
            className={inputClasses}
          />
          <div className="absolute right-4 bottom-4 text-indigo-200 dark:text-indigo-900 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className={inputContainerClasses}>
          <label className={labelClasses}>Stuck Amount</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-indigo-400 dark:text-indigo-500 text-lg transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">₹</span>
            <input
              required
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="50,000"
              className={`${inputClasses} pl-12`}
            />
          </div>
        </div>

        <div className={inputContainerClasses}>
          <label className={labelClasses}>Days Past Due</label>
          <input
            required
            type="number"
            name="daysOverdue"
            value={formData.daysOverdue}
            onChange={handleChange}
            placeholder="15"
            className={inputClasses}
          />
        </div>

        <div className={inputContainerClasses}>
          <label className={labelClasses}>Payment Link / UPI (Optional)</label>
          <input
            type="text"
            name="paymentLink"
            value={formData.paymentLink}
            onChange={handleChange}
            placeholder="e.g., upi://pay?pa=rajesh@vpa or bank details"
            className={inputClasses}
          />
        </div>

        <div className={inputContainerClasses}>
          <label className={labelClasses}>Client Profile</label>
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="Startup">Startup (Agile/Informal)</option>
            <option value="SMB">SMB (Traditional/Seth Ji)</option>
            <option value="Enterprise">Enterprise (Corporate/Slow)</option>
          </select>
        </div>

        <div className={inputContainerClasses}>
          <label className={labelClasses}>Payment Reliability</label>
          <select
            name="paymentHistory"
            value={formData.paymentHistory}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="New Customer">Untested (First Time)</option>
            <option value="Usually On Time">Loyal (Accidental Delay)</option>
            <option value="Usually Late">Chronic (Needs Firmness)</option>
          </select>
        </div>

        <div className={inputContainerClasses + " md:col-span-2"}>
          <label className={labelClasses}>Prior Nudges</label>
          <input
            required
            type="number"
            name="previousAttempts"
            value={formData.previousAttempts}
            onChange={handleChange}
            placeholder="0"
            className={inputClasses}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="group relative w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-[900] text-2xl rounded-3xl shadow-2xl shadow-slate-300 dark:shadow-none hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all transform hover:-translate-y-1.5 hover:scale-[1.01] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-4">
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white dark:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            <>
              Get My Money Back 💸
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
    </form>
  );
};

export default InputForm;
