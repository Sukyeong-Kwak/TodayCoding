import { dayModel } from "../db/models/day-model.js";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const DayService = {
  async updateEmoji(userInfo, emoji) {
    const result = await dayModel.updateEmojiOrCreateDay(userInfo, emoji);
    return result;
  },

  async getFilteredDayEmoji(dayInfo) {
    const { userId, startDate, endDate } = dayInfo;

    const allImgoies = await dayModel.findAllDay({ userId });

    const processedStartDate = dayjs(startDate);
    const processedEndDate = dayjs(endDate);

    const filteredEmojies = allImgoies.filter(
      (day) =>
        dayjs(day.date).isSameOrAfter(processedStartDate) &&
        dayjs(day.date).isSameOrBefore(processedEndDate)
    );

    return filteredEmojies;
  },

  async deleteAllDataByUserId(userId) {
    const result = await dayModel.deleteDaysByUserId({ userId });
    return result;
  },
};

export { DayService };
