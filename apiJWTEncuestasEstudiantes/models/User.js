// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  
  role: { 
    type: String, 
    enum: ['student', 'admin'], 
    default: 'student' 
  }
}, { timestamps: true });

// --- CORRECCIÓN AQUÍ ---
// Middleware pre-save para hashear contraseña
UserSchema.pre('save', async function() {
  
  // Si la contraseña no se modificó, simplemente salimos con return
  if (!this.isModified('password')) {
    return;
  }

  // Generamos el hash
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
});

module.exports = mongoose.model('User', UserSchema);