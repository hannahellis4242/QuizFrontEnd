import { z } from "zod";
import { TopicSchema } from "./Topic";

export const TopicListSchema = z.array(TopicSchema);

type TopicList = z.infer<typeof TopicListSchema>;
export default TopicList;
