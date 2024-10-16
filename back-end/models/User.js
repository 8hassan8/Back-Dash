const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    role: {
        type: String,
        enum: ['user', 'admin','pro'], // Only allow 'user' or 'admin'
        default: 'user'
      },
    image:{type:Buffer}
});

// Hash password before saving to database

UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password with hash

UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}           

module.exports = mongoose.model('User', UserSchema);