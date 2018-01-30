const mongoose = require('mongoose')

const member = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  nick: { type: String, required: true, unique: true},
  real_adress: { type: String, default: 'hello'},
  fake_adress: { type: String, default: 'hello'},
  reg_date: { type: Date, default: Date.now }
  //point: { type: Number, default: 0, max: 50, index: true },
  //image: imageSchema,
  // any: [mongoose.Schema.Types.Mixed ],
  // id: mongoose.Schema.Types.ObjectId
});
//member.index({ email: 1, nickname: 1 });

const boarders = new mongoose.Schema({
  nick: { type: String, required: true },
  category: { type: String, required: true},
  title: { type: String, required: true },
  contents : { type: String, required: true},
  reg_date: { type: Date, default: Date.now }
});

var boarder = new mongoose.Schema({
  // title: { type: String, required: true }
  // writer: String,
  // category: {type: String, required: true},
  // password: String,
  // contents: String,
  // comments: [{name: String, memo: String, date: {type: Date, default: Date.now}}],
  // count: {type:Number, default:0},
  // reg_date: {type: Date, default: Date.now}
});

// module.exports = {
//   memberSchema : mongoose.model('member', member),
//   boarderSchema : mongoose.model('boarder', boarder)
// }

module.exports = mongoose.model('boarders', boarders);