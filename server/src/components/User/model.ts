import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import { number, string } from 'joi';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    email: string;
    password: string;
    name: string;
    country: string;
    age: string;
    gender: string;
    is_active: boolean;
    is_admin: boolean;
    about_me: Text;


    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    tokens: AuthToken[];

    profile: {
        name: string,
        gender: string,
        location: string,
        website: string,
        picture: string
    };
    avata: string;
    comparePassword: (password: string) => Promise < boolean > ;
    gravatar: (size: number) => string;
}

export type AuthToken = {
    accessToken: string,
    kind: string
};

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        age:
 *          type: string
 *        country:
 *          type: string
 *        gender:
 *          type: string
 *        about_me:
 *          type: string
 *        is_active:
 *          type: boolean
 *        is_admin:
 *          type: boolean
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: String,

    country: {
        type: String,
        default: "",  
    },
    age: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: null,
    },
    is_active: {
      type: Boolean,
      default: true,  
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    about_me: {
        type: String,
        default: null
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array,
    created_at: {
       type: Date,
       default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    avata: {
        data: Buffer, 
        contentType: String
    }
}, {
    collection: 'user',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this; // tslint:disable-line

    // if(user.avata) {
    //     user.avata = new Buffer(user.avata);
    // } else {
    //     user.avata = null;
    // }

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);
        
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size: number): string {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5: string = crypto.createHash('md5').update(this.email).digest('hex');

    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default connections.db.model < IUserModel > ('UserModel', UserSchema);
