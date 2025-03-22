import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from './Input';
import { FormatCurrency } from './currencyFormatter';

interface NewTransferProps {
  onBack: () => void;
  walletAddress: string;
}

interface FormData {
  date: Date | null;
  time: string;
  walletAddress: string;
  amount: string;
  currency: string;
  note: string;
}

interface Errors {
  amount?: string;
  note?: string;
}

export default function NewTransfer({
  onBack,
  walletAddress,
}: NewTransferProps) {
  const [formData, setFormData] = useState<FormData>({
    date: null,
    time: '',
    walletAddress,
    amount: '',
    currency: 'USDC',
    note: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      currency: e.target.value, // Update currency dynamically
    }));
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    setFormData((prev) => ({
      ...prev,
      amount: rawValue,
    }));
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.note) newErrors.note = 'Note is required';
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validating form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Get current date and time
    const now = new Date();

    // Format amount with the selected currency
    const formattedAmount = FormatCurrency(
      Number(formData.amount),
      formData.currency
    );

    // Update form data with date and time
    setFormData((prev) => ({
      ...prev,
      amount: formattedAmount,
      date: now,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    console.log('Form Data:', {
      ...formData,
      amount: formattedAmount,
      date: now,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    alert(`Transfer submitted successfully: ${formattedAmount}`);
    onBack();
  };

  return (
    <section>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-[#EBEBEB] text-[14px] mt-5"
        >
          <ArrowLeft size={'40'} />
        </button>
      </div>

      <div className="shadow-[0px_0px_4px_0px_#EBEBEB40] rounded-[12px] p-[30px]">
        <form className="font-['Montserrat']" onSubmit={handleSubmit}>
          <div className="w-full max-w-[650px] grid sm:grid-cols-2 grid-rows-2 gap-[30px]">
            <div className="w-[244px] col-span-1 flex flex-col">
              <label className="text-[#4F4AE6] text-[16px] font-thin pb-1">
                Date
              </label>
              <div className="flex items-center gap-2 text-[#848484]">
                <DatePicker
                  selected={formData.date}
                  className="w-full py-[10px] text-center rounded-[5px] outline-none border-none bg-[#28283A] text-[#848484]"
                  dateFormat="dd/MM/yyyy"
                  placeholderText={new Date().toLocaleDateString()}
                  readOnly={true}
                />
                <span>*Fixed</span>
              </div>
            </div>
            <Input
              label="Time"
              type="text"
              name="time"
              value={formData.time}
              fixed={true}
              readOnly={true}
              placeholder={`${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC`}
              onChange={() => {}}
            />
            <Input
              label="Wallet Address"
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              readOnly={true}
              fixed={true}
              onChange={() => {}}
              placeholder="0x4f4ae6...58jekrek"
            />

            <div className="w-[200px] col-span-1 flex flex-col">
              <label
                className="text-[#4F4AE6] text-[16px] font-thin pb-1"
                htmlFor="amount"
              >
                Amount to Withdraw
              </label>
              <div className="flex justify-between text-[#848484] items-center rounded-[5px] p-[10px] bg-[#28283A]">
                <span>$</span>
                <input
                  className="w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield] focus:outline-none bg-transparent outline-none border-none"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  placeholder="****"
                />
                <select
                  className="bg-transparent text-[12px] outline-none border-none"
                  value={formData.currency}
                  onChange={handleCurrencyChange}
                >
                  <option value="USD">USD</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="TON">TON</option>
                  <option value="STRK">STRK</option>
                </select>
              </div>
              {errors.amount && (
                <span className="text-[#E20008] text-[12px]">
                  {errors.amount}
                </span>
              )}
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col">
            <label
              className="text-[#4F4AE6] text-[16px] font-thin pb-1"
              htmlFor="note"
            >
              Description/Note
            </label>
            <textarea
              className="outline-none w-full min-h-[200px] bg-[#28283A] text-[#848484] p-[10px] rounded-[5px]"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Write details of what you’ll be using the funds for"
            ></textarea>
            {errors.note && (
              <span className="text-[#E20008] text-[12px]">{errors.note}</span>
            )}
          </div>

          <div className="w-full mt-8">
            <button
              type="submit"
              className="w-[240px] sm:w-[302px] font-[600] h-[40px] bg-[#4F4AE6] rounded-[8px] p-[10px] text-white text-[14px]"
            >
              Make Transfer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
