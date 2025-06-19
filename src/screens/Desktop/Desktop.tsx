import React from "react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { supabase } from "../../lib/supabase";

export const Desktop = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits (US phone number without country code)
    const limitedDigits = digits.slice(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (limitedDigits.length >= 6) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
    } else if (limitedDigits.length >= 3) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    } else if (limitedDigits.length > 0) {
      return `(${limitedDigits}`;
    }
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleApplyClick = () => {
    if (isTermsAccepted) {
      setShowModal(true);
    }
  };

  const handleSubmit = async () => {
    // Extract digits and validate
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length === 10) {
      const fullNumber = `+1${digits}`;
      
      setIsSubmitting(true);
      
      try {
        // Store in Supabase
        const { error } = await supabase
          .from('phone_submissions')
          .insert([
            { phone_number: fullNumber }
          ]);

        if (error) {
          console.error('Error storing phone number:', error);
          alert('There was an error submitting your phone number. Please try again.');
        } else {
          console.log("Phone number submitted:", fullNumber);
          setShowModal(false);
          setShowSuccessModal(true);
          setPhoneNumber(""); // Reset form
        }
      } catch (error) {
        console.error('Error submitting phone number:', error);
        alert('There was an error submitting your phone number. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please enter a valid 10-digit US phone number");
    }
  };

  const handleDismiss = () => {
    setShowSuccessModal(false);
  };

  const handleModalOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setPhoneNumber(""); // Reset form when closing
    }
  };

  const handleSuccessOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowSuccessModal(false);
    }
  };

  return (
    <main className="bg-white flex flex-col items-center min-h-screen w-full px-4 md:px-8 overflow-hidden">
      {/* Main heading - responsive sizing */}
      <div className="text-center mb-8 mt-8 md:mt-16 md:mb-8">
        <a 
          href="https://www.forbes.com/sites/davidprosser/2025/04/04/how-two-yale-juniors-just-raised-31-million-for-their-social-network/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity duration-200"
        >
          <h1 className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-bold text-black leading-none tracking-tight">
            Series v3.0
          </h1>
        </a>
      </div>

      {/* Device mockup container - responsive */}
      <div className="relative flex-1 flex items-center justify-center w-full">
        {/* Mobile view - iPhone mockup */}
        <div className="block md:hidden">
          <div className="w-[280px] h-[580px] bg-black rounded-[40px] p-2 shadow-2xl relative">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[15px] z-10"></div>
            
            {/* Inner screen area */}
            <div className="w-full h-full bg-white rounded-[32px] flex flex-col items-center justify-center relative pt-8">
              
              {/* Join us button */}
              <div className="mb-6">
                <Button 
                  onClick={handleApplyClick}
                  className="px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 bg-black text-white hover:bg-black cursor-pointer"
                >
                  apply here
                </Button>
              </div>

              {/* Terms checkbox and text */}
              <div className="flex items-start gap-2 text-xs text-gray-600 px-4 text-center">
                <div className="flex items-start">  
                  <Checkbox
                    id="terms-mobile"
                    checked={isTermsAccepted}
                    onCheckedChange={(checked) => setIsTermsAccepted(checked === true)}
                    className="w-3 h-3 rounded border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black flex-shrink-0"
                    isMobile="true"
                  />
                </div>
                <label htmlFor="terms-mobile" className="cursor-pointer leading-tight">
                  by applying you agree to our updated Terms of{" "}
                  <a href="https://series.so/tou" target="_blank" className="underline hover:no-underline">
                    Use
                  </a>{" "}
                  and{" "}
                  <a href="https://series.so/tos" target="_blank" className="underline hover:no-underline">
                    Service
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop view - Tablet mockup */}
        <div className="hidden md:block">
          <div className="w-[800px] h-[600px] bg-black rounded-t-[40px] p-6 shadow-2xl translate-y-24">
            {/* Inner screen area */}
            <div className="w-full h-full bg-white rounded-t-[28px] flex flex-col items-center justify-center relative">
              
              {/* Apply button */}
              <div className="mb-8 -mt-12">
                <Button 
                  onClick={handleApplyClick}
                  className="px-12 py-4 rounded-full text-xl font-medium transition-all duration-200 bg-black text-white hover:bg-black cursor-pointer"
                >
                  apply here
                </Button>
              </div>

              {/* Terms checkbox and text */}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-start">  
                  <Checkbox
                    id="terms-desktop"
                    checked={isTermsAccepted}
                    onCheckedChange={(checked) => setIsTermsAccepted(checked === true)}
                    className="w-4 h-4 rounded border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                </div>
                <label htmlFor="terms-desktop" className="cursor-pointer">
                  by applying you agree to our updated Terms of{" "}
                  <a href="https://series.so/tou" target="_blank" className="underline hover:no-underline">
                    Use
                  </a>{" "}
                  and{" "}
                  <a href="https://series.so/tos" target="_blank" className="underline hover:no-underline">
                    Service
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Number Modal - responsive */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleModalOverlayClick}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-[400px] shadow-2xl">
            <h2 className="text-lg md:text-xl font-semibold text-center mb-2 text-black">
              Please enter the phone number
            </h2>
            <p className="text-lg md:text-xl font-semibold text-center mb-6 md:mb-8 text-black">
              associated with your Series Account
            </p>
            
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(999) 999-9999"
              className="w-full text-center text-lg text-black placeholder-gray-400 border-b border-gray-300 pb-2 mb-6 md:mb-8 focus:outline-none focus:border-blue-500 bg-transparent"
              maxLength={14}
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="text-blue-500 text-lg font-medium hover:text-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={phoneNumber.replace(/\D/g, '').length !== 10 || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal - responsive */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleSuccessOverlayClick}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-[400px] shadow-2xl text-center">
            <h2 className="text-lg md:text-xl font-semibold mb-6 md:mb-8 text-black">
              Your response has been recorded
            </h2>
            
            <button
              onClick={handleDismiss}
              className="text-blue-500 text-lg font-medium hover:text-blue-600 transition-colors duration-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </main>
  );
};