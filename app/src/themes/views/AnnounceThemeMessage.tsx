/** @jsx JSXSlack.h */
import {
  JSXSlack,
  Actions,
  Blocks,
  Button,
  Section,
} from "@speee-js/jsx-slack";
import { ThemeEntity } from "../theme.entity";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AnnounceThemeMessage = ({ title }: ThemeEntity): any =>
  JSXSlack(
    <Blocks>
      <Section>
        <p>
          今週のテーマは <b>{title}</b> です。
        </p>
        <p>あなたの {title} を教えてください！</p>
      </Section>
      <Actions>
        <Button actionId="open_item_entry_form" style="primary">
          回答する
        </Button>
      </Actions>
    </Blocks>
  );
