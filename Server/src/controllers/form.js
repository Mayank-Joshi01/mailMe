// import { sendEmail } from "../Services/Mail";

const SubmitForm = (req, res) => {
    console.log('Form data received:', req.body);
    const data = req.body;
    console.log('Headers:', req.headers.origin);

    res.status(200).json({ message: 'Form submitted successfully' });
};

module.exports = { SubmitForm };
