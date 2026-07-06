/**
 * services/smsService.js
 * Handles sending real text messages via Twilio.
 * Fallback to terminal logging if Twilio keys are not configured.
 */
const twilio = require("twilio");

const sendSMS = async (toPhone, messageBody) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  // Verify credentials exist
  if (!accountSid || !authToken || !fromPhone) {
    console.log("=========================================");
    console.log("[SMS SERVICE] Twilio not configured. Logging text:");
    console.log(`To: ${toPhone}`);
    console.log(`Body: ${messageBody}`);
    console.log("=========================================");
    return { success: true, simulated: true };
  }

  try {
    const client = twilio(accountSid, authToken);
    
    // Ensure phone number has international country code (default to +91 for India if not present)
    let formattedPhone = toPhone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+91${formattedPhone}`;
    }

    const message = await client.messages.create({
      body: messageBody,
      from: fromPhone,
      to: formattedPhone,
    });

    console.log(`[SMS SERVICE] Message sent successfully via Twilio. SID: ${message.sid}`);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error("[SMS SERVICE] Error sending message via Twilio:", error.message);
    throw new Error(`Failed to send SMS code. Details: ${error.message}`);
  }
};

module.exports = { sendSMS };
