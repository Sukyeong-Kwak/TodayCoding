import { model } from "mongoose";
import { daySchema } from "../schemas/day-schema.js";

const Day = model("days", daySchema);

class DayModel {
  // 각 날짜에 이모지를 추가하거나 날짜가 없으면 날짜 데이터 생성 후 이모지 추가
  async updateEmojiOrCreateDay(userInfo, emoji) {
    const day = await Day.findOne(userInfo);
    if (day === null) {
      const newDay = await Day.create({ ...userInfo, ...emoji });
      const result = await Day.findByIdAndUpdate(newDay._id, emoji, {
        returnOriginal: false,
      });
      return result;
    } else {
      const result = await Day.findByIdAndUpdate(day._id, emoji, {
        returnOriginal: false,
      });
      return result;
    }

    // let day = await Day.findOne(userInfo);
    // if (day === null) {
    //   day = await Day.create({ ...userInfo, ...emogi });
    // }
    // const result = await Day.findByIdAndUpdate(day._id, emogi);
    // return result;
  }

  async findOrCreateDay(info) {
    const { userId, date } = info;
    const result = await Day.findOne(info);
    if (!result) {
      const newDay = await Day.create(info);
      return newDay;
    }
    return result;
  }

  async findAllDay(userId) {
    const result = await Day.find(userId);

    return result;
  }

  async deleteDaysByUserId(userId) {
    const result = await Day.deleteMany(userId);
    return result;
  }
}

const dayModel = new DayModel();

export { dayModel };
