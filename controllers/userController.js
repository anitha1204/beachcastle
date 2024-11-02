// require('dotenv').config();
// const userbeachcastleDB= require("../model/userModel");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");

// const postUserDatas = async (req, res) => {
//     try {
//         console.log("Received Request Body:", req.body); // Debugging line
//         const { userName,  mobile, email, enquiry} = req.body;

//         // Validate input data
//         if (!userName || ! mobile || !email || !enquiry) {
//             return res.status(400).json({ Error: "All fields are required." });
//         }

//         const userData = new userbeachcastleDB({ userName,  mobile, email, enquiry});
//         console.log("User Data:", userData);
//         await userData.save();

//         // Send email
//         await send( userName,  mobile, email, enquiry);
//         await sendNotificationEmail( userName,  mobile, email, enquiry);

//         res.status(201).json({
//             data: userData,
//         });
//     } catch (error) {
//         res.status(500).json({
//             Error: error.message,
//         });
//     }
// };



// const getUserDatas = async (req, res) => {
//     try {
//         const email = req.params.email;

//         if (!email) {
//             return res.status(400).json({ Error: "Email is required." });
//         }

//         const userData = await userbeachcastleDB.findOne({ email });

//         if (!userData) {
//             return res.status(404).json({ Error: "User not found." });
//         }

//         res.status(200).json({
//             userData,
//         });
//     } catch (error) {
//         res.status(500).json({
//             Error: error.message,
//         });
//     }
// };

// // Create a reusable transporter object using SMTP transport
// const createTransporter = () => {
//     return nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "selvam12042003@gmail.com",
//             pass: "jxjj csdq qked wrku",
//         },
//     });
// };

// // Function to send confirmation email
// const send = async ( userName,  mobile, email, enquiry) => {
//     try {
//         console.log("Sending email to:", userName,  mobile, email, enquiry);

//         const transporter = createTransporter();

//         const mailOptions = {
//             from: 'selvam12042003@gmail.com',
//             to: email, // Corrected the variable here
//             subject: 'Thank you for your form submission',
//             text: `
//                   Dear ${userName},

//                   Thank you for submitting the form. We have received the following details:
//                   We appreciate your interest and will get back to you soon.

//                   Best regards,
//                   Beach Castle
//             `
//         };

//         await transporter.sendMail(mailOptions);
//         console.log("Confirmation email sent successfully");
//     } catch (error) {
//         console.error("Error sending confirmation email:", error.message);
//     }
// };

// // Function to send notification email to the hotel
// const sendNotificationEmail = async ( userName,  mobile, email, enquiry) => {
//     try {
//         console.log("Sending notification email");

//         const transporter = createTransporter();

//         const mailOptions = {
//             from: "selvam12042003@gmail.com",
//             to: "selvam12042003@gmail.com",
//             subject: "New Room Booking Notification",
//             text: `
//                   New room booking details:
//                   Name: ${name}
//                   Email: ${email}
//                   Phone Number: ${mobile}
//                   Enquiry: ${enquiry}
                 
//             `,
//         };

//         await transporter.sendMail(mailOptions);
//         console.log("Notification email sent successfully");
//     } catch (error) {
//         console.error("Error sending notification email:", error.message);
//     }
// };

// module.exports = { postUserDatas, getUserDatas };



require('dotenv').config();
const userbeachcastleDB = require("../model/userModel");
const nodemailer = require("nodemailer");

// Create a transporter for Nodemailer
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "selvam12042003@gmail.com",
            pass: "jxjj csdq qked wrku",
        },
    });
};

// Controller to handle POST requests
const postUserDatas = async (req, res) => {
    try {
        const { userName, mobile, email, enquiry } = req.body;

        if (!userName || !mobile || !email || !enquiry) {
            return res.status(400).json({ Error: "All fields are required." });
        }

        const userData = new userbeachcastleDB({ userName, mobile, email, enquiry });
        await userData.save();

        // Send confirmation and notification emails
        await send(userName, mobile, email, enquiry);
        await sendNotificationEmail(userName, mobile, email, enquiry);

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
const send = async (userName, mobile, email, enquiry) => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: "selvam12042003@gmail.com",
            to: email,
            subject: 'Thank you for your form submission',
            text: `Dear  Dear ${userName},

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
const sendNotificationEmail = async (userName, mobile, email, enquiry) => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: "selvam12042003@gmail.com",
            to: "selvam12042003@gmail.com", // Set in .env file
            subject: "New Room Booking Notification",
            text: `New room booking details:
                   Name: ${userName}
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
