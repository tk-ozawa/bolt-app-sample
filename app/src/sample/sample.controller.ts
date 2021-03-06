import {
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";

export class SampleController {
  async hello({
    message,
    say,
  }: SlackEventMiddlewareArgs<"message">): Promise<void> {
    console.log(message);

    const a = 1;

    console.log(a);

    await say(`Hey there <@${message.user}>!`);
  }

  async echo({ command, ack, say }: SlackCommandMiddlewareArgs): Promise<void> {
    ack();

    say(`Hello, ${command.user_name}!`);
  }
}
