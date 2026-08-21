import { useEffect, useRef, useState } from "react";
import "../../styles/auth/OtpVerification.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { toast } from "sonner";
import api from "../../api/auth";
import { useNavigate } from "react-router";
import { startVerification } from "../../features/authSlice";



export default function OtpVerificationPage() {
  const TOTAL_TIME = 180
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {otpDetails} = useSelector((state : RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let otpExpiresAt  = null
  if(otpDetails !== null){
    otpExpiresAt = otpDetails.otpExpiresAt
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!otpExpiresAt) return TOTAL_TIME;
      const secondsPassed = Math.floor((Date.parse(otpExpiresAt) - Date.now()) / 1000);
      const remaining = secondsPassed;
      return remaining > 0 ? remaining : 0;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpExpiresAt]);


  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; 
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };


  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").trim();
    if (data.length === 6 && !isNaN(Number(data))) {
      setOtp(data.split(""));
      inputRefs.current[5]?.focus(); 
    }
  };

  const handleResend = async () => {
     const response = await api.patch("/otp/resend",{_id : otpDetails._id})
    dispatch(startVerification(response.data))
    toast.info("OTP has been resend")
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if(new Date(otpExpiresAt) < new Date()){
      toast.error("OTP has been expired, Please click on resend code")
      e.preventDefault()
      return;
    }

    if(otp.every(val => val === "" || otp.some(val => val === ""))){
      toast.error("Please enter OTP")
      e.preventDefault()
      return;
    }

    const otpJoined = otp.join("")
    if(otpJoined !== otpDetails.otp){
      toast.error("Incorrect OTP")
      e.preventDefault()
      return;
    }

    const data = {
      otpTyped : otpJoined,
      otpDetails
    }

    const response = await api.post("/otp/verify",data)
    console.log(response.data)
    localStorage.setItem("token",response.data.token)
    navigate("/")
    toast("Welcome to Nexora 👋")
  }
  return (
    <>
      <div className="nx-root">
        <div className="nx-page">
          <div className="nx-stars" />

          <div className="nx-brand">
            <div className="nx-brand-mark">
              <span>✦</span>
            </div>
            <div>
              <div className="nx-brand-name">NEXORA</div>
              <div className="nx-brand-sub">AI-Assisted Learning</div>
            </div>
          </div>

          <div className="nx-content-otp">
            <section className="nx-card-otp">
            <div 
                style={{
                  backgroundColor: "rgba(163, 76, 255, 0.08)",
                  border: "1px solid rgba(163, 76, 255, 0.25)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  marginBottom: "24px",
                  textAlign: "center"
                }}
              >
                <p 
                  style={{ 
                    margin: 0, 
                    fontSize: "13px", 
                    fontWeight: "600", 
                    color: "#a34cff", 
                    lineHeight: "1.4" 
                  }}
                >
                 <span >Please do not refresh</span> or go back from this page
                </p>
              </div>

              <p className="nx-intro">
                Enter the 6-digit verification code we've sent to your provided
                email
              </p>

              <div className="nx-otp-row">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    className="nx-otp-input"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                  />
                ))}
              </div>

              <button className="nx-primary" type="button" onClick={(e) => onSubmit(e)}>
                <span style={{ fontWeight: "700" }}>Verify &amp; Continue</span>
              </button>
              
              

              <div className="nx-resend">
                Didn't receive the code?
                <br />
                {timeLeft > 0 ? (
                  <>
                    <button type="button" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                      Resend code
                    </button>{" "}
                    <span>in {timeLeft} seconds</span>
                  </>
                ) : (
                  <button type="button" onClick={handleResend} style={{ fontWeight: "bold" }}>
                    Resend code
                  </button>
                )}
              </div>

              <div className="nx-footer">
                Never share your verification code with anyone.
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
