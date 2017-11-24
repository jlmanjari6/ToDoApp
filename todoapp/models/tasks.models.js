var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    "title": {type:String, required:true},
    "fromDate": {type: Date, required: true},
    "toDate": {type: Date, required:true,
                validate: {
                    validator: function(){
                        return this.fromDate<this.toDate;
                    },
                    message: "'to date' should be greater than 'from date'"
                }            
             },
    "notes": {type:String, required:false}
})

var TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
