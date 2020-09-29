import JSXSlack, { Input, Modal, Section, Textarea } from "@speee-js/jsx-slack";
import { ThemeEntity } from "../../themes/theme.entity";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const EntryItemFormModal = ({ title }: ThemeEntity): any =>
  JSXSlack(
    <Modal title="Item" close="Cancel" callbackId="entry_item">
      <Section>
        <p>あなたの {title} を教えてください！</p>
      </Section>

      <Textarea label="本文" blockId="body" actionId="body" required />
      <Input type="submit" value="Save" />
    </Modal>
  );
