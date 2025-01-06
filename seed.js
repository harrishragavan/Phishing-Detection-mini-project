const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://xigi:xigi155@cluster0.9fzof.mongodb.net/phishingDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const phishingSchema = new mongoose.Schema({
    url: { type: String, unique: true }
});

const PhishingLink = mongoose.model('PhishingLink', phishingSchema);

const phishingLinks = [
    "http://fakebank-login.com",
    "http://paypal-account-secure.com",
    "http://secure-update.verification-paypal.com",
    "http://login-facebook-security.com",
    "http://appleid-support.com",
    "http://update-instagram-profile.com",
    "http://verify-amazon-payment.com",
    "http://microsoft-office365-login.com",
    "http://secure-login-apple.com",
    "http://youraccount-verification.com",
    "http://login-google-securityalert.com",
    "http://confirm-your-bank.com",
    "http://amazon-giftcard-redeem.com",
    "http://your-paypal-billing.com",
    "http://secure-verification.bank.com",
    "http://update-your-appleid.com",
    "http://signin-secure.microsoft.com",
    "http://change-password-alert.com",
    "http://recover-facebook-account.com",
    "http://online-banking-login-update.com"
];

// Insert the data into the database
async function seedDatabase() {
    try {
        await PhishingLink.insertMany(phishingLinks.map(url => ({ url })));
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
