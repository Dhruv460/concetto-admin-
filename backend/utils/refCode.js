async function checkIfReferralCodeIsUnique(code , existingCodes) {

    // const existingCodes = ["4G9Q2L", "9B8X7V"]; // Example existing codes
    return !existingCodes.includes(code);
}

module.exports = {
     generateUniqueReferralCode : async(array ) =>  {
        let referralCode;
        let isUnique = false;
    
        while (!isUnique) {
            referralCode = generateReferralCode();
            // Hypothetical function to check if the code exists in your database
            isUnique = await checkIfReferralCodeIsUnique(referralCode , array);
        }
    
        return referralCode;
    }
}