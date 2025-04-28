import { transporter } from "@/config";
import { User } from "@/models"
import bcrypt from 'bcryptjs';

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

const sendOTP = async (id: string) => {
    try {
        if (!id) return { status: 400, success: false, data: {}, message: 'User ID is required.' }

        const user = await User.findById(id)

        if (!user) return { status: 404, success: false, data: {}, message: 'User not found.' }

        const OTP = generateOTP()

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: `Verify your email`,
            html: `<div>
        <p>Enter <b>${OTP}</b> in the app to verify your email address and complete sign in.</p>
    </div>`,
            priority: "high"
        } as const;


        const hashedOTP = await bcrypt.hash(OTP, 10)
        user.otp = hashedOTP
        await user.save({ validateModifiedOnly: true })

        await transporter.sendMail(mailOptions)
        return { status: 200, message: "OTP is sent on yout mail.", success: true, data: { OTP } }

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while sending OTP verification mail.', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return { status: 500, success: false, data: {}, message: 'Internal server error.' }
    }
}

export default sendOTP