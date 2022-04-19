// Schema, model and Types from noSQL mangoose
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');

// Schema for Reactions
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: [280, 'Thought can only have 280 characters at maximum']
        },
        username: {
            type: String,
            required: 'Username is required',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: { getters: true },
        _id: false
    }
);

// Schema for Thoughts
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: [1, 'At least 1 Symbol'],
            maxlength: [280, 'max 280 Symbols']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Required !!!',
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: { virtuals: true, getters: true },
        id: false
    }
);

// Count of reactions
ThoughtSchema.virtual('Reactions').get(function() { return this.reactions.length; })

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;