import mongoose from "mongoose"
import bcrypt from "bcryptjs"

export interface UserAttrs {
    name: string
    email: string
    password: string
    confirmPassword: string,
    university: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc,
    correctPassword(candidatePassword: string, password: string): Promise<boolean>;
}

export interface UserDoc extends mongoose.Document {
    name: string
    email: string
    password: string | undefined
    confirmPassword: string
    role: string
    university: string
    passwordResetToken: string
}

const userSchema = new mongoose.Schema<UserDoc>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (this: UserDoc, el: any) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
    role: {
        type: String,
        enum: ['student', "tutor", 'admin'],
        default: "student",
    },
    university: {
        type: String,
        required: true
    },
    passwordResetToken: String,
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

userSchema.pre<UserDoc>("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password!, 12);

    next();
});

userSchema.statics.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export { User }