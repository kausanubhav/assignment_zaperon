import mongoose from 'mongoose'
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
   
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model("User", userSchema)

