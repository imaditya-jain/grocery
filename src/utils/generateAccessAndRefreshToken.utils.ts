import { User } from "@/models"
import { IUser } from "@/models/user.model"

const generateAccessAndRefreshToken = async (id: string): Promise<{ accessToken: string, refreshToken: string }> => {
    if (!id) console.log('User ID is required.')

    const user = await User.findById(id).select('-otp -password') as IUser

    if (!user) console.log('User not found.')

    const refreshToken = user.generateRefreshToken()
    const accessToken = user.generateAccessToken()

    user.refreshToken = refreshToken
    await user.save()

    return { accessToken, refreshToken }
}

export default generateAccessAndRefreshToken