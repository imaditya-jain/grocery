import mongoose, { Document, Schema, Types, Model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

enum Role {
    USER = 'user',
    ADMIN = 'admin'
}

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    role: Role;
    password: string;
    wishlist: mongoose.Types.ObjectId[] | null;
    orders: mongoose.Types.ObjectId[] | null;
    otp: string | null;
    refreshToken: string | null;
    comparePassword(enteredPassword: string): Promise<boolean>;
    compareOTP(enteredOTP: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: (value: string) => /^[A-Za-z]+$/.test(value),
            message: 'First name should only contain alphabets'
        }
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: (value: string) => /^[A-Za-z]+$/.test(value),
            message: 'last name should only contain alphabets'
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "Invalid email address",
        }
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => validator.isMobilePhone(value),
            message: 'Invalid phone number',
        }
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) =>
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/.test(value),
            message:
                'Password must be 8-16 characters long, include at least one letter, one number, and one special character (@$!%*?&#).',
        },
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    otp: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.pre('save', function (next) {
    if (this.role === 'admin') {
        this.wishlist = null;
        this.orders = null;
    }
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.compareOTP = async function (enteredOTP: string): Promise<boolean> {
    return await bcrypt.compare(enteredOTP, this.otp)
}

userSchema.methods.generateAccessToken = function (): string {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined.')
    }
    return jwt.sign({ _id: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

userSchema.methods.generateRefreshToken = function (): string {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined.')
    }
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User