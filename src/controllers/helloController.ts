import {
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";

export async function hello({
  message,
  say,
}: SlackEventMiddlewareArgs<"message">): Promise<void> {
  await say(`Hey there <@${message.user}>!`);
}

export async function echo({
  command,
  ack,
  say,
}: SlackCommandMiddlewareArgs): Promise<void> {
  ack();

  say(`Hello, ${command.user_name}!`);
}
