require('dotenv').config();
const userbeachcastleDB = require("../model/userModel");
const nodemailer = require("nodemailer");

// Create a transporter for Nodemailer
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "theglasshouseecr@gmail.com",
            pass: "oshl lblg clai kknr",
        },
    });
};

// Controller to handle POST requests
const postUserDatas = async (req, res) => {
    try {
        const { username, mobile, email, enquiry } = req.body;

        if (!userName || !mobile || !email || !enquiry) {
            return res.status(400).json({ Error: "All fields are required." });
        }

        const userData = new userbeachcastleDB({ username, mobile, email, enquiry });
        await userData.save();

        // Send confirmation and notification emails
        await send(userName, mobile, email, enquiry);
        await sendNotificationEmail(username, mobile, email, enquiry);

        res.status(201).json({ data: userData });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

const getUserDatas = async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({ Error: "Email is required." });
        }

        const userData = await userbeachcastleDB.findOne({ email });
        if (!userData) {
            return res.status(404).json({ Error: "User not found." });
        }

        res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

// Send confirmation email
const send = async (username, mobile, email, enquiry) => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: "theglasshouseecr@gmail.com",
            to: email,
            subject: 'Thank you for your form submission',
            text: `Dear  Dear ${username},

                  Thank you for submitting the form. We have received the following details:
                  We appreciate your interest and will get back to you soon.

                  Best regards,
                  Beach Castle`
        };
        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent successfully");
    } catch (error) {
        console.error("Error sending confirmation email:", error.message);
    }
};

// Send notification email to hotel
const sendNotificationEmail = async (username, mobile, email, enquiry) => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: "theglasshouseecr@gmail.com",
            to: "theglasshouseecr@gmail.com", // Set in .env file
            subject: "New Room Booking Notification",
            text: `New room booking details:
                   Name: ${username}
                   Email: ${email}
                  Phone Number: ${mobile}
                  Enquiry: ${enquiry}
                             `,
        };
        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully");
    } catch (error) {
        console.error("Error sending notification email:", error.message);
    }
};

module.exports = { postUserDatas, getUserDatas };
