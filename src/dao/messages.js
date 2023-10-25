import messageModel from "../models/messages.model.js"

export default class Message {
  constructor() {}

  //* POST
  sendMessage = async (message) => {
    let result = await messageModel.create(message);
    console.log("\u001b[1;36m Mensaje guardado");
    return result;
  };

  //* GET
  getAllMessage = async () => {
    let result = await messageModel.find().lean();
    return result;
  };
}