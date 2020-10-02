var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeSchema = new Schema ({
    user: {type: String, required: true, ref: 'User'},
    Homed_at: {type: Date, default: Date.now()},
    job: {type: String, required: true, ref: 'Job'},
});



module.exports = mongoose.model('Home', HomeSchema);