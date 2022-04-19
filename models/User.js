// Schema and model from noSQL mangoose
const { Schema, model } = require("mongoose");

// Schema for Users
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@[\w-]+\.[a-z]{2,12}(.[a-z]+)?/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

UserSchema.virtual('friendCount').get(function() {
    if (this.friends) {
        return this.friends.length;
    }
})

const User = model("User", UserSchema);

module.exports = User;